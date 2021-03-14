/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategoryIntro
// ====================================================

export interface GetCategoryIntro_category {
  __typename: "Category";
  intro: string | null;
}

export interface GetCategoryIntro {
  category: GetCategoryIntro_category | null;
}

export interface GetCategoryIntroVariables {
  id: string;
}
