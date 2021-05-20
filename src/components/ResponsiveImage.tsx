import { FormatKey } from "../api";
import { apiUrl } from "../constants";
import { GetPost_post_slideshow_img } from "../generated/GetPost";

const formats: Array<FormatKey> = ["large", "medium", "small"];
const mediaConditions = [
  "(min-width: 720px)",
  "(max-width: 719px)",
  "(max-width: 479px)",
];

export function ResponsiveImage({ img }: { img: GetPost_post_slideshow_img }) {
  const srcSet = formats
    .map((e) => img.formats[e])
    .map((e) => `${apiUrl}${e.url} ${e.width}w`)
    .join(",\n");
  const sizes = formats
    .map((e) => img.formats[e])
    .map((e, i) => `${mediaConditions[i]} ${e.width}px`)
    .join(",\n");
  return (
    <img
      srcSet={srcSet}
      sizes={sizes}
      src={`${apiUrl}${img.formats["small"].url}`}
      alt={img.alternativeText ?? ""}
    />
  );
}
