import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../utils/auth";
import nodemailer from "nodemailer";

export const POST = async (req) => {
  const session = await getAuthSession();
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: data.emails,
  };

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      text: "",
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Reminder</title>
        
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;">
      <div margin-right:auto; margin-left:auto; width:50%;">

      <div>
      <p style="margin-bottom:20px;">
        ${data.message}
      </p>
    </div>
      
    </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
    });

    return new NextResponse(
      JSON.stringify({ message: "mail sent successfully" }),
      { status: 201 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
