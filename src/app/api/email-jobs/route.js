import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";
import EmailQueue from "../../../model/EmailQueue";
import sendSingleEmail from "../../../utils/mail";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the request body data
    const body = await req.json();
    // Log the order data for debugging
    console.log("Order Data:", body);

    // Validate if 'value' field exists in the request body
    if (!body.value) {
      return NextResponse.json(
        { message: "'value' field is required" },
        { status: 400 }
      );
    }

    // Save the email job to the database
    const emailJob = new EmailQueue(body);
    await emailJob.save();

    // Send the email using the sendSingleEmail function
    const emailSent = await sendSingleEmail(body);

    // Return a success response
    if (emailSent) {
      return NextResponse.json({
        message: "Email job created and email sent successfully",
        data: emailJob,
      });
    } else {
      return NextResponse.json({
        message: "Email job created but failed to send email",
        data: emailJob,
      });
    }
  } catch (error) {
    // Return an error response if anything fails
    console.error("Error occurred:", error);
    return NextResponse.json(
      {
        message: "Error occurred while processing the request",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
