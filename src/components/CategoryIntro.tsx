import { useQuery } from "@apollo/client";
import { CategoryIntroQuery } from "../api/query";
import { publicationState } from "../constants";
import {
  GetCategoryIntro,
  GetCategoryIntroVariables,
} from "../generated/GetCategoryIntro";
import { Remark } from "react-remark";

export function CategoryIntro({ id }: { id: string }) {
  const { data } = useQuery<GetCategoryIntro, GetCategoryIntroVariables>(
    CategoryIntroQuery,
    { variables: { id, publicationState } }
  );

  if (data && data.category && data.category.intro)
    return (
      <div className="text-center text-white" style={{ fontSize: "1vw" }}>
        <Remark children={data.category.intro} />
      </div>
    );
  else return <></>;
}
