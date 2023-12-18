"use client";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { BsChevronCompactDown } from "react-icons/bs";
import type { MoviesData } from "@/types";
import FavoriteButton from "./favorite-button";
import { format } from "date-fns";
import { ThemeProvider, createTheme } from "@mui/material";
import { cn } from "@/lib/utils";
interface MovieCardProps {
  data: MoviesData;
  onClick: (movie: number) => void;
  movieId?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, onClick, movieId }) => {
  const theme = createTheme();


  return (
    <ThemeProvider theme={theme}>
      <div
        className={cn(
          "group bg-zinc-900 h-48 col-span transition overflow-hidden",
          movieId === data?.id
            ? "relative border-2 border-white group-hover:scale-[100%]"
            : " group-hover:scale-[145%] delay-300"
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            className="cursor-pointer object-cover transition shadow-xl delay-300"
            fill
            sizes="(max-width: 1400px) 100vw, 1400px"
            alt="Thumbnail"
          />
        </div>
        <div className="absolute flex flex-col gap-1 justify-end inset-0 p-5 z-[60] text-1xl">
          <h2 className="text-white">{data?.title}</h2>
          <div className="flex gap-3 items-center">
            <Rating
              name="read-only"
              readOnly
              value={data?.vote_average / 2}
              className="text-red-600"
              precision={0.5}
              size="small"
              emptyIcon={null}
            />
            <span className="text-white text-sm">
              {format(new Date(data?.release_date || 0), "yyyy")}
            </span>
          </div>
          <div
            className={cn(
              `justify-between items-center mb-3 flex max-h-0 opacity-0 group-hover:opacity-100`,
              movieId === data?.id
                ? ""
                : "transition-all delay-300 duration-200 group-hover:max-h-[500px]"
            )}
          >
            <p className="text-white text-[0.6rem] max-h-16 hide-long-text">
              {data?.overview}
            </p>
            <div className="lg:h-10 h-6 w-1 mx-2 bg-white" />
            <FavoriteButton movieId={data.id} />
          </div>
          <div
            onClick={() => {
              onClick(data?.id);
            }}
            className={
              "self-center z-50 text-white opacity-0 group-hover:opacity-100 absolute left-[50%] -bottom-8 translate-x-[-50%] transition-all duration-200 group-hover:-bottom-2 hover:text-red-600 cursor-pointer"
            }
          >
            <BsChevronCompactDown size={40} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MovieCard;
