import { NextResponse } from "next/server";
import { getAuthSession } from "../../../../../utils/auth";

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
      // await prisma.post.delete({
      //   where: {
      //     id: id,
      //   },
      // });

      return new NextResponse(JSON.stringify({ message: id }), { status: 200 });
    } catch (error) {
      console.log(error);
    }
  }
}
