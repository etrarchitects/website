import { useQuery } from "@apollo/client";
import { BACKGROUND_IMG_QUERY } from "../api/query";
import { BackgroundSlideshow } from "../components/BackgroundSlideshow";
import { EtraLogo } from "../components/EtraLogo";
import { HeaderFooter } from "../components/HeaderFooter";
import { GetBackgroundImages } from "../generated/GetBackgroundImages";

export function Background() {
  const { data } = useQuery<GetBackgroundImages>(BACKGROUND_IMG_QUERY);
  if (data && data.backgroundImg !== null) {
    return (
      <>
        <EtraLogo />
        <HeaderFooter />
        <BackgroundSlideshow images={data.backgroundImg.images} />
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
