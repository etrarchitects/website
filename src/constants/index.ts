import { PublicationState } from "../generated/globalTypes";

export const apiUrl = process.env.REACT_APP_STRAPI_API;
export const publicationState = String(process.env.REACT_APP_IS_PREVIEW).toLocaleLowerCase() === "true" ? PublicationState.PREVIEW : PublicationState.LIVE