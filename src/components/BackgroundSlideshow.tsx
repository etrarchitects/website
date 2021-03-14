import { ReactElement, useEffect, useState } from "react";
import { BackgroundImage, BackgroundImageData } from "../api";
import { apiUrl } from "../pages/Main";

const mod = (x: number, n: number): number => ((x % n) + n) % n;

export function BackgroundSlideshow({ data }: { data: BackgroundImageData }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let next = mod(index + 1, data.backgroundImages.length);
      setIndex(next);
    }, 4000);
    return () => clearInterval(interval);
  }, [index, setIndex, data]);

  const getClass = (i: number) => {
    if (i === index) return "enter";
    else if (i === mod(index - 1, data.backgroundImages.length)) return "leave";
    else return "";
  };

  const getImg = (e: BackgroundImage, i: number): ReactElement => {
    const src = `${apiUrl}${e.img.formats["extra-large"].url}`;
    return (
      <img
        key={e.id}
        className={`${getClass(i)} bg-primary`}
        src={src}
        alt={e.img.alternativeText}
      />
    );
  };

  return (
    <div className="home-slideshow">
      <div
        className={`photos-container ${
          data.backgroundImages.length > 0 ? "" : "bg-primary"
        }`}
      >
        {data.backgroundImages.map(getImg)}
      </div>
    </div>
  );
}
