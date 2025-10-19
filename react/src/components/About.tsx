import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import aboutVideo from "../assets/videos/about.mp4";
import deadPool from "../assets/deadpool.png";

export const About = () => {
  return (
    <div className="relative w-full h-[40vh] overflow-hidden">
      <VideoPlayer className="w-full h-full">
        <VideoPlayerContent
          loop
          preload="auto"
          playsInline
          autoPlay
          src={aboutVideo}
        />
      </VideoPlayer>
      <div className="absolute inset-0 h-full flex flex-col justify-center text-center">
        <h2 className="text-6xl font-stretch-extra-condensed">Hello there,</h2>
      </div>
      <div className="absolute top-0 left-0 mt-35 mx-30 ">
        <img src={deadPool} alt="dead pool" />
      </div>
    </div>
  );
};

export default About;
