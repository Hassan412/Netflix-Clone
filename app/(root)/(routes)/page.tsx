import Navbar from "@/components/navbar";
import Billboard from "@/components/billboard";
import MovieListProvider from "@/providers/movie-list-provider";

export default function Home() {
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="main-swiper pb-40 overflow-x-hidden">
        <MovieListProvider/>
      </div>
    </>
  );
}
