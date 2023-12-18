"use client";

import useMovies from "@/hooks/useMovies";
import { MoviesData } from "@/types";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

interface NavbarProps {
  MovieId: string;
}
const Navbar: React.FC<NavbarProps> = ({ MovieId }) => {
  const { data } = useMovies(MovieId as string);
  const Movie: MoviesData = data;
  const router = useRouter()
  return (
    <div className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black/70">
      <ArrowBackIcon className="text-white cursor-pointer" boxSize={10} onClick={()=> router.push("/")}/>
      <p className="text-white text-1xl md:text-3xl font-bold">
        <span className="font-light">Watching: </span>
        {Movie?.title}
      </p>
    </div>
  );
};

export default Navbar;
