import { NextResponse } from "next/server";
import prisma from "../../../utils/connect";
import { getAuthSession } from "../../../utils/auth";

export const GET = async (req) => {
  try {
    const posts = await prisma.post.findMany({ include: { user: true } });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
