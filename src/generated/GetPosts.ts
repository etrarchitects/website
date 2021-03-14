/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_posts_thumbnail {
  __typename: "UploadFile";
  formats: any | null;
}

export interface GetPosts_posts {
  __typename: "Post";
  id: string;
  title: string;
  subtitle: string;
  thumbnail: GetPosts_posts_thumbnail;
}

export interface GetPosts {
  posts: (GetPosts_posts | null)[] | null;
}

export interface GetPostsVariables {
  category?: string | null;
}
