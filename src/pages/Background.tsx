import { useQuery } from "@apollo/client";
import { BackgroundImageData, BACKGROUND_IMG_QUERY } from "../api";
import { BackgroundSlideshow } from "../components/BackgroundSlideshow";
import { EtraLogo } from "../components/EtraLogo";
import { HeaderFooter } from "../components/HeaderFooter";

export function Background() {
  const { data } = useQuery<BackgroundImageData>(BACKGROUND_IMG_QUERY);
  if (data) {
    return (
      <>
        <EtraLogo />
        <HeaderFooter />
        <BackgroundSlideshow data={data} />
      </>
    );
  } else {
    return (
      <div className="home-slideshow">
        <div className="photos-container bg-primary"></div>
      </div>
    );
  }
}
