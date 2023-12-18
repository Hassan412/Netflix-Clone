import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const requests = currentUser.favoriteIds.map((id) =>
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`)
  );
    const responses = await Promise.all(requests);
   const favoriteMovies = responses.map((res)=> {
      return res.data
    })


    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return new NextResponse("Some thing went wrong", { status: 400 });
  }
}
