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
//     const data = await prisma.post.delete({
//       where: {
//         id: id,
//       },
//     });
//     return new NextResponse(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     console.log(error);
//   }
// };

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
      const deletedPost = await prisma.post.deleteOne({
        where: {
          id: id,
        },
      });
      return new NextResponse(JSON.stringify({ message: deletedPost }), {
        status: 200,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
