import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const body = await req.body();

  await prisma.skillPost.delete({
    where: {
      id: body,
    },
  });
  return new NextResponse(
    JSON.stringify({ message: "Post deleted successfully" }),
    { status: 200 }
  );
};
