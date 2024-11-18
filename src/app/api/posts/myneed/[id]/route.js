import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../../utils/auth";
import prisma from "../../../../../utils/connect";

export async function DELETE(req, { params }) {
  const { id } = params;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  if (req.method === "DELETE") {
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
  }
}
