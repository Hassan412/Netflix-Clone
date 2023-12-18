import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import axios from "axios";

export async function GET(req: Request) {
    try {
        await serverAuth()
        
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=89e5f07ad10ca98f6d724077914257aa");
        const Data = response.data


        const movieCount = Data?.results.length
        const randomIndex = Math.floor(Math.random() * movieCount)

        return NextResponse.json(Data.results[randomIndex])
    } catch (error) {
        console.log(error)
        return new NextResponse("Some thing went wrong", { status: 400})
    }
}