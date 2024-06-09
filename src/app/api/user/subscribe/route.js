import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";

export const POST = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  const body = await req.json();

  const subscription = await prisma.subscription.create({
    data: { ...body, userEmail: session.user.email },
  });

  return new NextResponse(JSON.stringify(subscription), { status: 201 });
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
      data: { subscribed: true, subNotificationNumber: { increment: 1 } },
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
