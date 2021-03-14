import { gql } from "@apollo/client";

export interface Category {
   id: string
   type: string
}

export interface CategoryData {
   categories: Category[];
}

export interface Thumbnail {
   url: string,
   width: number,
   height: number,
}

export type FormatKey = "thumbnail" | "extra-small" | "large" | "medium" | "small" | "extra-large"
export type ImgFormatType = {
   [_ in FormatKey]: Thumbnail;
};

 
export const CATEGORY_QUERY = gql`
{
   categories(sort: "order") {
      id
      type
   }
}`;

export interface PostsQueryVars {
   category: string
}
export interface ImgType {
   name: string,
   alternativeText: string,
   formats: ImgFormatType
}

export interface PostMetadata {
   title: string
   content: string
}

export interface Post {
   id: string
   title: string
   subtitle: string
   content: string
   post_metadata: PostMetadata[]
   thumbnail: ImgType
}

export interface PostData {
   posts: Post[]
}

export const POSTS_QUERY = gql`
query GetPosts($category: String){
  posts(where: { category: $category }, publicationState:LIVE, sort:"sorting_date:desc") {
    id
    title
    subtitle
    thumbnail {
      formats
    }
  }
}`;

export interface BackgroundImage {
   id: number
   img: ImgType
}

export interface BackgroundImageData {
   backgroundImages: BackgroundImage[]
}

export const BACKGROUND_IMG_QUERY = gql`
query GetBackgroundImages {
  backgroundImages(publicationState:LIVE) {
     id
    img {
      name
      alternativeText
      formats 
    }
  }
}
`;

export interface SinglePostData {
   post: Post
}

export interface PostQueryVars {
   id: string
}

export const POST_QUERY = gql`
query GetPost($id: ID!) {
  post(id: $id, publicationState: LIVE){
    id
    title
    content
    post_metadata{
      title
      content
    }
  }
}
`;