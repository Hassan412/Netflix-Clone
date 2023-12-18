import { MoviesData } from "@/types";
import React from "react";
import { RiNetflixFill } from "react-icons/ri";

interface GenreLogoProps {
  data: MoviesData | string;
}
const GenreLogo: React.FC<GenreLogoProps> = ({ data }) => {
  return (
    <div className="flex w-fit items-center justify-start">
      <RiNetflixFill className={"text-red-600"} size={40} />
      <span className="text-white text-2xl font-mono uppercase">
        {typeof data === "object" ? data?.genres[0]?.name : data}
      </span>
    </div>
  );
};

export default GenreLogo;
