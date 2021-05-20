import { useEffect, useState } from "react";
import { GetPost_post_slideshow } from "../generated/GetPost";
import { ResponsiveImage } from "./ResponsiveImage";

const delay = 3000;

export function Slideshow({ slides }: { slides: GetPost_post_slideshow[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (slides.length > 1) {
      interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
      }, delay);
    }

    return () => interval && clearInterval(interval);
  }, [index, slides.length]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {slides.map(({ img, caption }, index) => (
          <div className="slide" key={index}>
            <ResponsiveImage img={img} />
            <p className="caption text-shadow">{caption}</p>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="slideshowDots">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
