import * as React from "react";
// import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export interface Artwork {
  artist: string;
  art: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

{
  /* <div class="flex flex-col items-center p-7 rounded-2xl">
  <div>
    <img class="size-48 shadow-xl" alt="" src="/img/cover.png" />
  </div>
  <div class="flex">
    <span>Class Warfare</span>
    <span>The Anti-Patterns</span>
    <span class="flex">
      <span>No. 4</span>
      <span>·</span>
      <span>2025</span>
    </span>
  </div>
</div> */
}

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea
      className="w-64 bg-transparent"
      style={{ backgroundColor: "transparent" }}
    >
      {" "}
      {/* transparent background */}
      <div className="flex w-max p-0 gap-4 bg-amber-700">
        {" "}
        {/* transparent here too */}
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0 bg-transparent">
            <div className="overflow-hidden bg-black">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] object-cover w-auto h-full"
                width={300}
                height={400}
                loading="lazy"
              />
            </div>
            <figcaption className="text-muted-foreground pt-1 text-xs text-center bg-blue-700">
              Photo by{" "}
              <span className="text-foreground font-semibold">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default ScrollAreaHorizontalDemo;
