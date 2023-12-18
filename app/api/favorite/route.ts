import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";
import serverAuth from "@/lib/serverAuth";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();

    const { movieId } = body;



    const UpdatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(UpdatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Favorite POST", { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { movieId } = body;


    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new NextResponse("Favorite DELETE", { status: 401 });
  }
}
