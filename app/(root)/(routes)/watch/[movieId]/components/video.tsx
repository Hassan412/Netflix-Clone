"use client";

import useMovies from "@/hooks/useMovies";
import { MoviesData } from "@/types";
interface VideoProps {
  MovieId: string;
}

const Video: React.FC<VideoProps> = ({ MovieId }) => {
  const { data } = useMovies(MovieId as string);
  const Movie: MoviesData = data;
  return (
    <video
      src={Movie?.videoUrl}
      autoPlay
      controls
      className="h-full w-full"
    ></video>
  );
};

export default Video;
