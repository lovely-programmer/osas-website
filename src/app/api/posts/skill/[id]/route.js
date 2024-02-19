import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../../utils/auth";
import prisma from "../../../../../utils/connect";

// export const DELETE = async (req, { params }) => {
//   const { id } = params;

//   const session = await getAuthSession();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     await prisma.skillPost.delete({
//       where: {
//         id: id,
//       },
//     });
//     return new NextResponse(200);
//   } catch (error) {
//     console.log(error);
//   }
// };

export default async function handler(req, res) {
  const { id } = req.query;

  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  if (req.method === "DELETE") {
    try {
      await prisma.skillPost.delete({
        where: {
          id: id,
        },
      });
      return new NextResponse.stringify(
        { message: "Post deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
