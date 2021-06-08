import { PublicationState } from "../generated/globalTypes";
import { keyframes } from "@emotion/react";

export const apiUrl = process.env.REACT_APP_STRAPI_API;
export const publicationState = String(process.env.REACT_APP_IS_PREVIEW).toLocaleLowerCase() === "true" ? PublicationState.PREVIEW : PublicationState.LIVE

export const bottomUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;