import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
