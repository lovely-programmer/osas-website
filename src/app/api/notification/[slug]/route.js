import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  const { slug } = params;

  try {
    if (slug == "need") {
      const data = await prisma.user.update({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { postNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }

    if (slug == "skills") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { skillNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
    if (slug == "usedItem") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { usedItemNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
    if (slug == "market") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { marketNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
    if (slug == "rentItem") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { rentNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
    if (slug == "giveaway") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { giveNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
    if (slug == "news") {
      const data = await prisma.user.updateMany({
        where: {
          email: {
            not: session.user.email,
          },
        },
        data: { newsNotification: { increment: 1 } },
      });
      return new NextResponse(JSON.stringify(data), {
        status: 201,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
