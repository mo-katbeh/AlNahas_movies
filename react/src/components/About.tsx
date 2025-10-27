import { VideoPlayer, VideoPlayerContent } from "./ui/shadcn-io/video-player";
import aboutVideo from "../assets/videos/about.mp4";
import deadPool from "../assets/deadpool.png";

export const About = () => {
  return (
    <>
      <div className="relative w-full h-[30vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh] overflow-hidden">
        <VideoPlayer className="w-full h-full">
          <VideoPlayerContent
            loop
            preload="auto"
            playsInline
            autoPlay
            src={aboutVideo}
            className="w-full h-full  object-cover"
          />
        </VideoPlayer>
        <div className="absolute inset-0 h-full flex flex-col justify-center text-center">
          <h2 className=" font-stretch-extra-condensed shrikhand-font">
            Hi there,
          </h2>
        </div>
        <div className="absolute top-[50%] left-[45%] -translate-x-[45%]  ">
          <img src={deadPool} alt="dead pool" className="bg-center" />
        </div>
      </div>
      <div className=" bg-gradient-to-t from-gray-900 via-black/50 to-red-950 flex flex-col items-center justify-center w-full pb-10">
        <h1 className="text-5xl font-bold m-10 text-center">
          Let's talk about Watchly
        </h1>

        <p className="mx-15 md:mx-20  text-lg text-center max-w-6xl">
          The Movie Database (TMDB) is a community built movie and TV database.
          Every piece of data has been added by our amazing community dating
          back to 2008. TMDB's strong international focus and breadth of data is
          largely unmatched and something we're incredibly proud of. Put simply,
          we live and breathe community and that's precisely what makes us
          different.
        </p>

        <h2 className="my-10 text-3xl font-bold">The Watchly advantage</h2>
        <div className="mx-15 md-mx-20 flex flex-col max-w-6xl">
          <div className="flex my-5 ">
            <div className="text-[#d40242] mr-5 text-6xl font-bold w-[8vw]  ">
              1
            </div>
            <p className="text-lg">
              Every year since 2008, the number of contributions to our database
              has increased (check out our last years wrap!) With over 1,500,000
              developers and companies using our platform, TMDB has become a
              premiere source for metadata.
            </p>
          </div>
          <div className="flex my-5">
            <div className="text-[#d40242] mr-5 text-6xl font-bold w-[8vw] ">
              2
            </div>
            <p className="text-lg">
              Along with extensive metadata for movies, TV shows and people, we
              also offer one of the best selections of high resolution posters
              and backdrops. On average, over 1,000 images are added every
              single day.
            </p>
          </div>
          <div className="flex my-5">
            <div className="text-[#d40242] mr-5 text-6xl font-bold w-[8vw] ">
              3
            </div>
            <p className="text-lg">
              We're international. While we officially support 39 languages we
              also have extensive regional data. Every single day TMDB is used
              in over 180 countries.TMDB has become a premiere source for
              metadata.
            </p>
          </div>
          <div className="flex my-5">
            <div className="text-[#d40242] mr-5 text-6xl font-bold w-[8vw] ">
              4
            </div>
            <p className="text-lg">
              Our community is second to none. Between our staff and community
              moderators, we're always here to help. We're passionate about
              making sure your experience on TMDB is nothing short of amazing.
            </p>
          </div>
          <div className="flex my-5">
            <div className="text-[#d40242] mr-5 text-6xl font-bold w-[8vw] ">
              5
            </div>
            <p className="text-lg">
              Trusted platform. Every single day our service is used by millions
              of people while we process over 10 billion requests. We've proven
              for years that this is a service that can be trusted and relied
              on.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
