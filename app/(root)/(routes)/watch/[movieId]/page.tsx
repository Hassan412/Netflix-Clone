import Navbar from "./components/navbar";
import Video from "./components/video";
const Watch = ({ params }: { params: { movieId: string } }) => {
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar MovieId={params.movieId} />
      <Video MovieId={params.movieId} />
    </div>
  );
};

export default Watch;
