/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImgFormatType } from "../api";

import { PublicationState } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetTeams
// ====================================================

export interface GetTeams_teams_member_category {
  __typename: "TeamCategory";
  name: string;
}

export interface GetTeams_teams_member_role {
  __typename: "TeamRole";
  role: string | null;
}

export interface GetTeams_teams_profile {
  __typename: "UploadFile";
  formats: ImgFormatType;
  alternativeText: string | null;
}

export interface GetTeams_teams {
  __typename: "Team";
  name: string;
  surname: string;
  birthdate: any | null;
  description: string | null;
  member_category: GetTeams_teams_member_category | null;
  member_role: GetTeams_teams_member_role | null;
  profile: GetTeams_teams_profile | null;
}

export interface GetTeams {
  teams: (GetTeams_teams | null)[] | null;
}

export interface GetTeamsVariables {
  publicationState?: PublicationState | null;
}
