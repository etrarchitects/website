import { gql, useQuery } from "@apollo/client";
import { Markdown } from "./Markdown";

const CategoryIntroQuery = gql`
  query GetCategoryIntro($id: ID!) {
    category(id: $id, publicationState: LIVE) {
      intro
    }
  }
`;

export function CategoryIntro({ id }: { id: string }) {
  const { data } = useQuery<{ category: { intro: string } }, { id: string }>(
    CategoryIntroQuery,
    { variables: { id } }
  );

  console.log(data, id);
  if (data)
    return (
      <Markdown
        content={data.category.intro}
        className="text-center text-white"
        style={{ fontSize: "1vw" }}
      />
    );
  else return <></>;
}
