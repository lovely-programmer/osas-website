import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const id = req.nextUrl.searchParams.get("id");

  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};
