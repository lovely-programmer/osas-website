import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../../utils/auth";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(204);
  } catch (error) {
    console.log(error);
  }
};
