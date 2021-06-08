import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImgFormatType } from "../api";
import { POSTS_QUERY } from "../api/query";
import { AltAnimatedList } from "../components/AltAnimatedList";
import { CategoryIntro } from "../components/CategoryIntro";
import { apiUrl, publicationState } from "../constants";
import {
  GetPosts,
  GetPostsVariables,
  GetPosts_posts,
} from "../generated/GetPosts";
// import { useLocationState } from "../hooks";
import { AppDispatch, INCREMENT_CATEGORY, useTypedSelector } from "../reducers";
import { notUndefined } from "../utils";
import { keyframes } from "@emotion/react";
import { useLocationState } from "../hooks";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(200px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export function PostList() {
  const category = useTypedSelector((state) =>
    state.category.find((e) => e.active)
  );
  const dispatch = useDispatch<AppDispatch>();
  const state = useLocationState();
  const history = useHistory();
  //   const animation = `fade-bottom-up ${state.delayed ? "animation-delay" : ""}`;
  const { data } = useQuery<GetPosts, GetPostsVariables>(POSTS_QUERY, {
    variables: {
      category: category?.category.id ?? "",
      publicationState,
    },
    pollInterval: 10 * 1000,
  });

  const f = (e: GetPosts_posts) => {
    const next = async () => history.push(`/post/${e.id}`);
    return {
      fst: <PostMetadata post={e} onClick={next} />,
      snd: <PostImg formats={e.thumbnail.formats} onClick={next} />,
      key: e.id,
    };
  };

  return data && category && data.posts !== null ? (
    <AltAnimatedList
      list={data.posts
        .slice(0, category.limit)
        .filter(notUndefined)
        .filter((e) => e.thumbnail != null && e.thumbnail.formats != null)
        .map(f)}
      rowClass="my-4"
      onScrollEnd={() =>
        data.posts !== null &&
        data.posts.length >= category.limit &&
        dispatch({ type: INCREMENT_CATEGORY })
      }
      animation={customAnimation}
      animationDuration={3000}
      animationDelay={state.delayed ? 1000 : 0}
    >
      <CategoryIntro id={category.category.id} />
    </AltAnimatedList>
  ) : (
    <></>
  );
}

function PostMetadata(props: { post: GetPosts_posts; onClick: () => {} }) {
  return (
    <div
      className="text-center text-white text-shadow"
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    >
      <h1>{props.post.title}</h1>
      <p>{props.post.subtitle}</p>
    </div>
  );
}

function PostImg(props: { formats: ImgFormatType; onClick: () => {} }) {
  return (
    <img
      className="shadow-lg"
      src={`${apiUrl}${props.formats.small.url}`}
      alt=""
      onClick={props.onClick}
      style={{ maxHeight: "600px", maxWidth: "100%", cursor: "pointer" }}
    />
  );
}
