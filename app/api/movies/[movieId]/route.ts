import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    await serverAuth();

    if (typeof params.movieId !== "string") {
      return new NextResponse("Invalid Id", { status: 401 });
    }

    if (!params.movieId) {
      return new NextResponse("Invalid Id", { status: 402 });
    }

    const movies = await prismadb.movie.findUnique({
      where: {
        id: params.movieId,
      },
    });

    if (!movies) {
      return new NextResponse("Movie does not exist", { status: 403 });
    }

    return NextResponse.json(movies);
  } catch (error) {
    console.log(error);
    return new NextResponse("[MovieId]", { status: 400 });
  }
}
