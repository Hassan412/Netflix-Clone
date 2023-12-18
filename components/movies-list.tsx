import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperPrev from "./swiper-prev";
import SwiperNext from "./swiper-next";
import MovieCard from "./movie-card";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import type { MoviesData } from "@/types";

import { isEmpty } from "lodash";
import _ from "lodash";

interface MovieListProps {
  data?: MoviesData[];
  title?: string;
  onOpen: (movie: number) => void;
  movieId?: number;
}

const MoviesList: React.FC<MovieListProps> = ({
  data,
  title,
  onOpen,
  movieId,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperIndex, setSwiperIndex] = useState(0);


if (isEmpty(data)) {
  return null
}

  return (
    <>
      {title && <h2 className="text-white text-3xl font-semibold">{title}</h2>}
      <Swiper
        onSlideChange={(e) => {
          setSwiperIndex(e.realIndex);
        }}
        passiveListeners
        slidesPerView={"auto"}
        className="w-full"
        initialSlide={0}
        rewind
        spaceBetween={5}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          960: {
            slidesPerView: 3.5,
          },
          1920: {
            slidesPerView: 7.5,
          },
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        modules={[Navigation]}
      >
        {data?.map((movie) => (
          <SwiperSlide
            key={movie?.id}
            className={cn(
              "group relative",
              movie?.id === movieId ? "" : "hover:!mx-20"
            )}
            hidden={ _.isNull(movie?.backdrop_path) ? true : false}
          >
            <MovieCard
              key={movie?.id}
              data={movie}
              movieId={movieId}
              onClick={onOpen}
            />
            <svg
              width="40px"
              height="40px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className={cn(
                "absolute -bottom-6 left-[50%] -translate-x-[50%] z-50 rotate-180",
                movie?.id === movieId ? "block" : "hidden"
              )}
              fill="#fff"
            >
              <rect width="16" height="16" id="icon-bound" fill="none" />
              <polygon points="8,5 13,10 3,10" />
            </svg>
          </SwiperSlide>
        ))}
        <SwiperPrev
          Ref={prevRef}
          className={swiperIndex === 0 ? "hidden" : "block"}
        />
        <SwiperNext Ref={nextRef} />
      </Swiper>
    </>
  );
};

export default MoviesList;
