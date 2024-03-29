import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  const { slug } = params;

  try {
    if (slug == "need") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { postNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }

    if (slug == "skills") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { skillNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
    if (slug == "usedItem") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { usedItemNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
    if (slug == "market") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { marketNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
    if (slug == "rentItem") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { rentNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
    if (slug == "giveaway") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { giveNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
    if (slug == "news") {
      await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { newsNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify({ message: "users notified" }), {
        status: 201,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
