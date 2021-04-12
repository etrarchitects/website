/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImgFormatType } from "../api";

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetBackgroundImages
// ====================================================

export interface GetBackgroundImages_backgroundImg_images_img {
  __typename: "UploadFile";
  formats: ImgFormatType;
}

export interface GetBackgroundImages_backgroundImg_images {
  __typename: "ComponentPostSlider";
  img: GetBackgroundImages_backgroundImg_images_img | null;
}

export interface GetBackgroundImages_backgroundImg {
  __typename: "BackgroundImg";
  images: (GetBackgroundImages_backgroundImg_images | null)[] | null;
}

export interface GetBackgroundImages {
  backgroundImg: GetBackgroundImages_backgroundImg | null;
}

export interface GetBackgroundImagesVariables {
  publicationState?: PublicationState | null;
}
