import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../../utils/auth";
import prisma from "../../../../../utils/connect";

export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  const { slug } = params;

  try {
    if (slug == "need") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { postNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "skills") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { skillNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "usedItem") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { usedItemNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "market") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { marketNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "rentItem") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { rentNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "giveaway") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { giveNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
    if (slug == "news") {
      await prisma.user.update({
        where: { email: session.user.email },
        data: { newsNotification: 0 },
      });
      return new NextResponse(JSON.stringify({ message: "updated" }), {
        status: 201,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
