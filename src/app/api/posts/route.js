import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { getAuthSession } from "../../../utils/auth";

export const GET = async (req) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};

export const POST = async (req) => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }

    const body = await req.json();

    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    return new NextResponse(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
