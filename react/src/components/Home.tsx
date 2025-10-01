import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import thriller from "../assets/videos/thriller.mp4";
export const Home = () => {
  return (
    // <div className="m-4 border borrder-solid  w-full h-[250px]">
    <VideoPlayer className="m-12  overflow-hidden rounded-xl border">
      <VideoPlayerContent
        crossOrigin=""
        muted
        preload="auto"
        autoPlay
        playsInline
        slot="media"
        src={thriller}
      />
    </VideoPlayer>
    // </div>
  );
};

export default Home;
