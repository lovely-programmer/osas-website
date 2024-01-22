import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await prisma.studentMarketPost.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
