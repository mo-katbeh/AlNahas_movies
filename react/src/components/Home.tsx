import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import thriller from "../assets/videos/thriller.mp4";
import { useEffect, useRef } from "react";

export const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };
    playVideo();
  }, []);

  return (
    // <div className="m-4 border borrder-solid  w-full h-[250px]">
    <VideoPlayer className="m-12  overflow-hidden rounded-xl border">
      <VideoPlayerContent
        ref={videoRef}
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
