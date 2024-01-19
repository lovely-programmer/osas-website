import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  await prisma.usedItemPost.delete({
    where: {
      id: id,
    },
  });
  return new NextResponse(
    JSON.stringify({ message: "Post deleted successfully" }),
    { status: 200 }
  );
};
