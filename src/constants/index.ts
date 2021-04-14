import { PublicationState } from "../generated/globalTypes";

export const apiUrl = process.env.REACT_APP_STRAPI_API;
export const publicationState = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test" ? PublicationState.LIVE : PublicationState.PREVIEW
export const isInBuilding = process.env.REACT_APP_IN_BUILDING && process.env.REACT_APP_IN_BUILDING.toLowerCase() === "true"