import { ReactElement, useEffect, useState } from "react";
import { GetBackgroundImages_backgroundImg_images } from "../generated/GetBackgroundImages";
import { apiUrl } from "../pages/Main";

const mod = (x: number, n: number): number => ((x % n) + n) % n;

export function BackgroundSlideshow({
  images,
}: {
  images: (GetBackgroundImages_backgroundImg_images | null)[] | null;
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
          className={`${getClass(i)} bg-primary`}
          src={src}
          alt={format.alternativeText}
        />
      );
    } else {
      return <></>;
    }
  };

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
