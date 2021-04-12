/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetCategories
// ====================================================

export interface GetCategories_categories {
  __typename: "Category";
  id: string;
  type: string;
}

export interface GetCategories {
  categories: (GetCategories_categories | null)[] | null;
}

export interface GetCategoriesVariables {
  publicationState?: PublicationState | null;
}
