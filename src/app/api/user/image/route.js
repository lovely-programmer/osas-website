import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";

export const PUT = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "image updated successfully" }),
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
