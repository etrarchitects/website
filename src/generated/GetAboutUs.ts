/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetAboutUs
// ====================================================

export interface GetAboutUs_aboutUs {
  __typename: "AboutUs";
  description: string;
}

export interface GetAboutUs {
  aboutUs: GetAboutUs_aboutUs | null;
}

export interface GetAboutUsVariables {
  publicationState?: PublicationState | null;
}
