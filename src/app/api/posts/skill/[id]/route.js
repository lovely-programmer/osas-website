export const DELETE = async (req, { params }) => {
  const { id } = params;
  await prisma.skillPost.delete({
    where: {
      id: id,
    },
  });
  return new NextResponse(
    JSON.stringify({ message: "Post deleted successfully" }),
    { status: 202 }
  );
};
