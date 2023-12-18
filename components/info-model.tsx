"use client";
import { useState, useEffect, useCallback } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import PlayButton from "./play-button";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { Rating } from "@mui/material";
import { format } from "date-fns";
import { RiNetflixFill } from "react-icons/ri";
import useMoviesImages from "@/hooks/useMoviesImages";
import useMoviesById from "@/hooks/useMoviesById";
import Image from "next/image";
import { ThemeProvider, createTheme } from "@mui/material";
import usePerson from "@/hooks/usePerson";
import useMovieVideo from "@/hooks/useMovieVideo";
import { cn } from "@/lib/utils";
import SecoundFavoriteButton from "./second-favorite-button";
import { MoviesData } from "@/types";
import GenreLogo from "./genre-logo";

interface InfoModelProps {
  visible?: boolean;
  onClose: () => void;
  onMount?: ()=> void;
  movieId?: number
}
interface PersonProps {
  id: number;
  name: string;
  character: string;
}
const InfoModel: React.FC<InfoModelProps> = ({ visible, onClose, movieId}) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { data: ImageData } = useMoviesImages(movieId as number);
  const { data } = useMoviesById(movieId as number);
  const { data: PersonData } = usePerson(movieId as number);
  const { data: MovieVideo } = useMovieVideo(movieId as number);
  const FullMoviesData: MoviesData = data
  const theme = createTheme();
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <div
        className={cn(
          `w-full bg-black mt-4 flex relative opacity-0 -translate-y-10 transition-all duration-300 overflow-hidden`,
          isVisible ? "opacity-100 translate-y-0 max-h-full" : "opacity-0 translate-y-20 max-h-0"
        )}
      >
        <CloseIcon
          onClick={handleClose}
          boxSize={5}
          className="absolute right-5 top-5 z-50 text-white cursor-pointer"
        />
        <div className="absolute inset-0 z-20 bg-black/70"/>
        <div className="absolute inset-0">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${MovieVideo?.results[1]?.key}?controls=0&autoplay=1&mute=1&loop=1`}
            allowFullScreen
            frameBorder={"0"}
          ></iframe>
        </div>
        <div className="flex flex-col text-white py-12 pl-16 basis-[50%] max-w-screen-md gap-6 relative z-50">
         <GenreLogo data={FullMoviesData}/>
          <div className={`relative h-40`}>
            <Image
              alt="Logo"
              src={`https://image.tmdb.org/t/p/original${ImageData?.logos[0]?.file_path}`}
              fill
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <div className="flex items-center ml-1 gap-4">
            <span className="text-white text-lg">
              {format(new Date(FullMoviesData?.release_date || 0), "yyyy")}
            </span>
            <Rating
              name="read-only"
              readOnly
              value={FullMoviesData?.vote_average / 2}
              className="text-red-600"
              precision={0.5}
              size="small"
              emptyIcon={null}
            />
            <div className="border border-zinc-300 text-sm text-center px-2">
              {FullMoviesData?.adult ? "TV-MA" : "TV"}
            </div>
          </div>
          <p className="text-neutral-400 text-base 2xl:text-lg">
            {FullMoviesData?.overview}
          </p>
          <div className="flex gap-3">
            <PlayButton movieId={movieId as number} label="PLAY"/>
           <SecoundFavoriteButton/>
            <button className="rounded-full h-fit p-2 border border-neutral-400 hover:opacity-60 transition">
              <AiOutlineLike size={25} />
            </button>
            <button className="rounded-full h-fit p-2 border border-neutral-400 hover:opacity-60 transition">
              <AiOutlineDislike size={25} />
            </button>
          </div>
          <p className="text-neutral-400 text-base">
            <strong className="">Starring: </strong>
            {PersonData?.cast
              .slice(0, 3)
              .map((person: PersonProps) => person.name)
              .join(", ")}
          </p>
          <p className="text-neutral-400 text-base">
            <strong className="">Genres: </strong>
            {FullMoviesData?.genres
              .map((genre: { id: number; name: string }) => genre.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default InfoModel;
