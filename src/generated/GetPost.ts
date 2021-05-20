/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImgFormatType } from "../api";

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_metadata {
  __typename: "ComponentPostPostMetadata";
  title: string;
  content: string;
}

export interface GetPost_post_slideshow_img {
  __typename: "UploadFile";
  formats: ImgFormatType;
  alternativeText: string | null;
}

export interface GetPost_post_slideshow {
  __typename: "ComponentPostSlider";
  caption: string;
  img: GetPost_post_slideshow_img;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  title: string;
  content: string;
  metadata: (GetPost_post_metadata | null)[] | null;
  slideshow: (GetPost_post_slideshow | null)[] | null;
}

export interface GetPost {
  post: GetPost_post | null;
}

export interface GetPostVariables {
  id: string;
  publicationState?: PublicationState | null;
}
