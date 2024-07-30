import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb";
import EmailQueue from "../../../model/EmailQueue";

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const emailJob = new EmailQueue(body);
    await emailJob.save();

    return NextResponse.json({ message: "success", data: emailJob });
  } catch (error) {
    return NextResponse.error(error);
  }
}
