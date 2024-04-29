import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { getAuthSession } from "../../../../utils/auth";

export const GET = async (req, { params }) => {
  const { email } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

export const PUT = async (req, { params }) => {
  const { email } = params;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      institution,
      department,
      skills,
      dob,
      phoneNumber,
      whatsappNumber,
      age,
      country,
      state,
    } = body;

    await prisma.user.update({
      where: { email },
      data: {
        name,
        institution,
        department,
        skills,
        dob,
        phoneNumber,
        whatsappNumber,
        age,
        country,
        state,
      },
    });
    return new NextResponse(JSON.stringify({ message: "account updated" }), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
