import { useQuery } from "@apollo/client";
import { CategoryIntroQuery } from "../api/query";
import {
  GetCategoryIntro,
  GetCategoryIntroVariables,
} from "../generated/GetCategoryIntro";
import { Markdown } from "./Markdown";

export function CategoryIntro({ id }: { id: string }) {
  const { data } = useQuery<GetCategoryIntro, GetCategoryIntroVariables>(
    CategoryIntroQuery,
    { variables: { id } }
  );

  if (data && data.category && data.category.intro)
    return (
      <Markdown
        content={data.category.intro}
        className="text-center text-white"
        style={{ fontSize: "1vw" }}
      />
    );
  else return <></>;
}
