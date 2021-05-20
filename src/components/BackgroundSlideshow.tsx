import { useQuery } from "@apollo/client";
import { ReactElement, useEffect, useState } from "react";
import { BACKGROUND_IMG_QUERY } from "../api/query";
import { apiUrl, publicationState } from "../constants";
import {
  GetBackgroundImages,
  GetBackgroundImages_backgroundImg_images,
} from "../generated/GetBackgroundImages";

const mod = (x: number, n: number): number => ((x % n) + n) % n;

export function BackgroundSlideshow({ onLoad }: { onLoad?: () => {} }) {
  const { data } = useQuery<GetBackgroundImages>(BACKGROUND_IMG_QUERY, {
    variables: {
      publicationState,
    },
  });

  return (
    <InternalBackgroundSlideshow
      images={data?.backgroundImg?.images ?? []}
      onLoad={onLoad}
    />
  );
}

function InternalBackgroundSlideshow({
  images,
  onLoad,
}: {
  images: (GetBackgroundImages_backgroundImg_images | null)[] | null;
  onLoad?: () => {};
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (images !== null) {
      interval = setInterval(() => {
        let next = mod(index + 1, images.length);
        setIndex(next);
      }, 4000);
    }
    return () => interval && clearInterval(interval);
  }, [index, setIndex, images]);

  const getClass = (i: number) => {
    if (images === null) return "";
    else if (i === index) return "enter";
    else if (i === mod(index - 1, images.length)) return "leave";
    else return "";
  };

  const getImg = (
    e: GetBackgroundImages_backgroundImg_images | null,
    i: number
  ): ReactElement => {
    if (e !== null && e.img !== null && e.img.formats !== null) {
      const format = e.img.formats["extra-large"];
      const src = `${apiUrl}${format.url}`;
      return (
        <img
          key={i}
          className={getClass(i)}
          src={src}
          alt=""
          onLoad={
            i === 0 && onLoad
              ? (e) => {
                  while (!(e.target as any).complete) {}
                  onLoad();
                }
              : undefined
          }
        />
      );
    } else {
      return <></>;
    }
  };

  images?.length === 0 && onLoad && onLoad();

  return (
    <div className="home-slideshow">
      <div
        className={`photos-container ${
          images === null || images.length > 0 ? "" : "bg-primary"
        }`}
      >
        {images !== null && images.map(getImg)}
      </div>
    </div>
  );
}
