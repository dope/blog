"use client";

import Link from "next/link";
import useSWR from "swr";

export const SpotifyCarousel = () => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/recently-played", fetcher);

  console.log(data);

  return (
    <div>
      <h2 className="mb-2 mx-4 text-sm font-light opacity-50">Music</h2>
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl">
        {data?.slice(0, 3).map((track: any) => (
          <Link
            key={track.id}
            className={`relative bg-white/5 border border-transparent hover:border-white/10 transition-colors p-4 rounded-xl flex flex-col items-center`}
            href={track.songUrl}
            target="_blank"
          >
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="rounded-xl w-full aspect-square object-cover"
            />

            <div className="mt-4 text-center w-full">
              <p className="text-xs font-semibold truncate max-w-full">
                {track.title}
              </p>
              <p className="text-xs opacity-50 truncate max-w-full">
                {track.artist}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpotifyCarousel;
