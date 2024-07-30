import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'team.robust.dev@gmail.com',
    pass: 'dmvf dwrv jhfc sfpd',
  },
});

// Function to send a single email
const sendSingleEmail = async (emailJob) => {
  try {
    const { email, value } = emailJob;
    const { packages, combinedPrice, totalSavings, monthlySalesSavings, totalMonthlySavings, annualSavings } = JSON.parse(value);

    // Format the email content
    let packageDetails = '';
    let total = 0;

    packages.forEach((pkg) => {
      packageDetails += `<tr>
        <td>${pkg.package}</td>
        <td>$${pkg.price.toFixed(2)}</td>
      </tr>`;
      total += pkg.price;
    });

    const combinedPriceDetails = combinedPrice
      ? `<tr class="total-row">
           <td>Combined Price</td>
           <td>$${combinedPrice.toFixed(2)}</td>
         </tr>`
      : '';

    const savingsDetails = totalSavings
      ? `<tr class="total-row">
           <td>Total Savings</td>
           <td>$${totalSavings.toFixed(2)}</td>
         </tr>`
      : '';

    const monthlySavingsDetails = monthlySalesSavings && monthlySalesSavings.length > 0
      ? monthlySalesSavings
          .filter((item) => ["1", "2", "3"].includes(item.id))
          .map((item) => `
            <tr>
              <td>Monthly Savings (${item.package})</td>
              <td>$${item.savings.toFixed(2)}</td>
            </tr>`)
          .join('')
      : '';

    const totalSavingsDetails = totalMonthlySavings || annualSavings
      ? `<tr class="total-row">
           <td>Total Monthly Savings</td>
           <td>$${totalMonthlySavings.toFixed(2)}</td>
         </tr>
         <tr class="total-row">
           <td>Annual Savings</td>
           <td>$${annualSavings.toFixed(2)}</td>
         </tr>`
      : '';

    const emailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Horeca.ai Sales Package</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          .container {
            width: 80%;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .header {
            text-align: center;
            background-color: #1976D2;
            color: #ffffff;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
          }

          .content {
            margin: 20px 0;
          }

          .package-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .package-table th,
          .package-table td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
          }

          .package-table th {
            background-color: #1976D2;
            color: #ffffff;
          }

          .total-row {
            font-weight: bold;
          }

          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #666666;
          }

          .contact {
            color: #1976D2;
            text-decoration: none;
          }

          .savings-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .savings-table th,
          .savings-table td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
          }

          .savings-table th {
            background-color: #1976D2;
            color: #ffffff;
          }

        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Horeca.ai Sales Package</h1>
          </div>
          <div class="content">
            <p>Dear Customer,</p>
            <p>Thank you for your interest in our sales packages. Below are the details of your selected package:</p>
            <table class="package-table">
              <tr>
                <th>Package</th>
                <th>Price</th>
              </tr>
              ${packageDetails}
              <tr class="total-row">
                <td>Total Price</td>
                <td>$${total.toFixed(2)}</td>
              </tr>
              ${combinedPriceDetails}
              ${savingsDetails}
            </table>

            ${monthlySavingsDetails || totalSavingsDetails ? `
              <h2>Additional Savings</h2>
              <table class="savings-table">
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                ${monthlySavingsDetails}
                ${totalSavingsDetails}
              </table>` : '<div></div>'}
          </div>
          <div class="footer">
            <p>For further assistance or more information, please contact us at <a class="contact"
                href="mailto:support@horeca.ai">support@horeca.ai</a>.</p>
            <p>Best Regards,<br>Horeca.ai Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const mailOptions = {
      from: 'team.robust.dev@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Your Horeca.ai Sales Package', // Subject line
      html: emailContent, // html body
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
      return false;
    }
  } catch (error) {
    console.error('Error processing email job:', error);
    return false;
  }
}

export default sendSingleEmail;
