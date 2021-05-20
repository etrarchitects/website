import { gql } from "@apollo/client";

export const POSTS_QUERY = gql`
query GetPosts($category: String, $publicationState: PublicationState){
  posts(where: { category: $category }, publicationState:$publicationState, sort:"sorting_date:desc") {
    id
    title
    subtitle
    thumbnail {
      formats
      alternativeText
    }
  }
}`;


export const POST_QUERY = gql`
query GetPost($id: ID!, $publicationState: PublicationState) {
  post(id: $id, publicationState: $publicationState){
    id
    title
    content
    metadata{
      title
      content
    }
    slideshow {
      caption
      img {
        formats
        alternativeText
      }
    }
  }
}
`;

export const CATEGORY_QUERY = gql`
query GetCategories($publicationState: PublicationState){
   categories(sort: "order", publicationState: $publicationState) {
      id
      type
   }
}`;

export const BACKGROUND_IMG_QUERY = gql`
query GetBackgroundImages($publicationState: PublicationState) {
  backgroundImg(publicationState: $publicationState){
    images {
      img{
        formats
        alternativeText
      }
    }
  }
}
`;

export const CategoryIntroQuery = gql`
  query GetCategoryIntro($id: ID!, $publicationState: PublicationState) {
    category(id: $id, publicationState: $publicationState) {
      intro
    }
  }
`;

export const TEAMS_QUERY = gql`
query GetTeams($publicationState: PublicationState){
  teams(publicationState: $publicationState) {
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
      alternativeText
    }
  }
}`

export const ABOUTUS_QUERY = gql`
query GetAboutUs($publicationState: PublicationState) {
  aboutUs(publicationState: $publicationState) {
    description
  }
}`;

export const CONTACTS_QUERY = gql`
query GetContacts($publicationState: PublicationState) {
  contact(publicationState: $publicationState) {
    contact {
      address {
        street
        postal_code
        city
      }
      email
      telephone
    }
  }
}`;

export const UNDER_CONSTRUCTION_QUERY = gql`
query UnderConstruction($publicationState: PublicationState) {
  underConstruction(publicationState:$publicationState) {
    content
    enabled
  }
}
`;