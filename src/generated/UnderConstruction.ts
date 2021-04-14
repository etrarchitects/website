/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: UnderConstruction
// ====================================================

export interface UnderConstruction_underConstruction {
  __typename: "UnderConstruction";
  content: string;
  enabled: boolean;
}

export interface UnderConstruction {
  underConstruction: UnderConstruction_underConstruction | null;
}

export interface UnderConstructionVariables {
  publicationState?: PublicationState | null;
}
