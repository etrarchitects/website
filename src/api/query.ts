import { gql } from "@apollo/client";

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


export const POST_QUERY = gql`
query GetPost($id: ID!) {
  post(id: $id, publicationState: LIVE){
    id
    title
    content
    metadata{
      title
      content
    }
  }
}
`;

export const CATEGORY_QUERY = gql`
query GetCategories{
   categories(sort: "order", publicationState: LIVE) {
      id
      type
   }
}`;

export const BACKGROUND_IMG_QUERY = gql`
query GetBackgroundImages {
  backgroundImg(publicationState: LIVE){
    images {
      img{
        formats
      }
    }
  }
}
`;

export const CategoryIntroQuery = gql`
  query GetCategoryIntro($id: ID!) {
    category(id: $id, publicationState: LIVE) {
      intro
    }
  }
`;

export const TEAMS_QUERY = gql`
query GetTeams{
  teams {
    name
    surname
    birthdate 
    description
    member_category{
      name
    }
    member_role{
      role
    }
    profile {
      formats
    }
  }
}`

export const ABOUTUS_QUERY = gql`
query GetAboutUs {
  aboutUs(publicationState: LIVE) {
    description
  }
}`;