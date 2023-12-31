import { getAuthSession } from "../../../../utils/auth";
import prisma from "../../../../utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { slug } = params;
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const body = await req.json();

    if (slug == "need") {
      const post = await prisma.post.create({
        data: { ...body, userEmail: session.user.email },
      });
      return new NextResponse(JSON.stringify(post), { status: 201 });
    }

    if (slug == "skills") {
      const post = await prisma.skillPost.create({
        data: { ...body, userEmail: session.user.email },
      });
      return new NextResponse(JSON.stringify(post), { status: 201 });
    }

    if (slug == "usedItem") {
      const post = await prisma.usedItemPost.create({
        data: { ...body, userEmail: session.user.email },
      });
      return new NextResponse(JSON.stringify(post), { status: 201 });
    }

    if (slug == "market") {
      const post = await prisma.studentMarketPost.create({
        data: { ...body, userEmail: session.user.email },
      });
      return new NextResponse(JSON.stringify(post), { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

export const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    if (slug == "usedItem") {
      const posts = await prisma.usedItemPost.findMany({
        include: { user: true },
      });
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    }

    if (slug == "skills") {
      const posts = await prisma.skillPost.findMany({
        include: { user: true },
      });
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    }

    if (slug == "market") {
      const posts = await prisma.studentMarketPost.findMany({
        include: { user: true },
      });
      return new NextResponse(JSON.stringify(posts), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
