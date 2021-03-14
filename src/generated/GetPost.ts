/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_metadata {
  __typename: "ComponentPostPostMetadata";
  title: string;
  content: string;
}

export interface GetPost_post {
  __typename: "Post";
  id: string;
  title: string;
  content: string;
  metadata: (GetPost_post_metadata | null)[] | null;
}

export interface GetPost {
  post: GetPost_post | null;
}

export interface GetPostVariables {
  id: string;
}
