"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";
import { MoviesData } from "@/types";
import Image from "next/image";
import format from "date-fns/format";
import { Rating } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import GetGenreNameById from "@/actions/getGenreNameById";
import GenreLogo from "./genre-logo";
import PlayButton from "./play-button";
import SecoundFavoriteButton from "./second-favorite-button";
interface SubBillBoardProps {
  data: MoviesData[];
}

const SubBillBoard: React.FC<SubBillBoardProps> = ({ data }) => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="h-[60vh]">
        <Swiper
          pagination={{
            clickable: true,
            enabled: true
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true
          }}
          speed={500}
          modules={[Pagination, Autoplay]}
          className="w-full h-full"
        >
          {data?.map((movie) => (
            <SwiperSlide
              key={movie?.id}
              className={`flex flex-col relative overflow-hidden`}
            >
              <div className="absolute -top-5 -bottom-5 -left-5 -right-5 opacity-40 md:right-[60%] bg-black z-10 filter blur-[10px] mix-blend-darken md:opacity-95" />
              <Image
                alt="bg-Image"
                className="object-right object-cover"
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                fill
              />
              <div className="flex flex-col h-full relative justify-center z-50 pl-12 gap-5">
                <GenreLogo data={GetGenreNameById(movie?.genre_ids[0])}/>
                <h1 className="text-6xl text-white">{movie?.title}</h1>
                <div className="flex items-center ml-1 gap-4">
                  <span className="text-white text-lg">
                    {format(new Date(movie?.release_date || 0), "yyyy")}
                  </span>
                  <Rating
                    name="read-only"
                    readOnly
                    value={movie?.vote_average / 2}
                    className="text-red-600"
                    precision={0.5}
                    size="small"
                    emptyIcon={null}
                  />
                  <div className="border border-zinc-300 text-sm text-center px-2 text-white">
                    {movie?.adult ? "TV-MA" : "TV"}
                  </div>
                </div>
                <p className="text-neutral-300 text-base 2xl:text-lg max-w-xl">
                  {movie?.overview}
                </p>
                <div className="flex gap-2">
                <PlayButton label="PLAY" movieId={0} className="w-fit"/>
                <SecoundFavoriteButton/>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </ThemeProvider>
  );
};

export default SubBillBoard;
