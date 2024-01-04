import { NextResponse } from "next/server";
import { getAuthSession } from "../../../utils/auth";
import prisma from "../../../utils/connect";

export const GET = async (req) => {
  const session = await getAuthSession();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

export const PUT = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { createdSuccessfully: true },
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
