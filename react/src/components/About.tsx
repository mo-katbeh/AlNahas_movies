import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import aboutVideo from "../assets/videos/about.mp4";
import deadPool from "../assets/deadpool.png";

export const About = () => {
  return (
    <>
      <div className="relative w-full h-[50vh] overflow-hidden">
        <VideoPlayer className="w-full h-full">
          <VideoPlayerContent
            loop
            preload="auto"
            playsInline
            autoPlay
            src={aboutVideo}
            className="w-full h-full rounded-2xl object-cover"
          />
        </VideoPlayer>
        <div className="absolute inset-0 h-full flex flex-col justify-center text-center">
          <h2 className="text-6xl  font-stretch-extra-condensed shrikhand-font">
            Hi there,
          </h2>
        </div>
        <div className="absolute top-[20%] left-[50%] -translate-x-[50%] mt-35 mx-30 ">
          <img src={deadPool} alt="dead pool" className="bg-center" />
        </div>
      </div>
      <div className="bg-black flex flex-col items-center justify-center w-full mb-10">
        <h1 className="text-5xl font-bold m-10 text-center">
          Let's talk about Watchly
        </h1>

        <p className="mx-15 md:mx-20  text-lg text-center">
          The Movie Database (TMDB) is a community built movie and TV database.
          Every piece of data has been added by our amazing community dating
          back to 2008. TMDB's strong international focus and breadth of data is
          largely unmatched and something we're incredibly proud of. Put simply,
          we live and breathe community and that's precisely what makes us
          different.
        </p>

        <h2 className="my-10 text-2xl font-bold">The Watchly advantage</h2>
        <div className="mx-25 flex flex-col align-bottom ">
          <div className="flex mb-5 ">
            <div className="text-[#d40242] mr-7 text-6xl font-bold w-[8vw] ">
              1
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
          <div className="flex mb-5">
            <div className="text-[#d40242] mr-7 text-6xl font-bold w-[8vw] ">
              2
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
          <div className="flex mb-5">
            <div className="text-[#d40242] mr-7 text-6xl font-bold w-[8vw] ">
              3
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
          <div className="flex mb-5">
            <div className="text-[#d40242] mr-7 text-6xl font-bold w-[8vw] ">
              4
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
          <div className="flex mb-5">
            <div className="text-[#d40242] mr-7 text-6xl font-bold w-[8vw] ">
              5
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
