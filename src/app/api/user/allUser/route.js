import { NextResponse } from "next/server";
import prisma from "../../../../utils/connect";

export const GET = async (req) => {
  try {
    const user = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
