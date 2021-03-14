import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import {
  ImgFormatType,
  Post,
  PostData,
  PostsQueryVars,
  POSTS_QUERY,
} from "../api";
import { About } from "../components/About";
import { AltAnimatedList } from "../components/AltAnimatedList";
import { CategoryIntro } from "../components/CategoryIntro";
import { Contacts } from "../components/Contacts";
import { PostViewer } from "../components/PostViewer";
import { useLocationState } from "../hooks";
import { AppDispatch, INCREMENT_CATEGORY, useTypedSelector } from "../reducers";
import { apiUrl } from "./Main";

export function Content() {
  const opened = useTypedSelector((state) => state.opened);

  return (
    <Switch>
      <Route exact path="/"></Route>
      <main className={opened ? "d-none" : ""}>
        <Route exact path="/post/:id">
          <PostViewer />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/:category">
          <PostList />
        </Route>
      </main>
    </Switch>
  );
}

function PostList() {
  const category = useTypedSelector((state) =>
    state.category.find((e) => e.active)
  );
  const dispatch = useDispatch<AppDispatch>();
  const state = useLocationState();
  const history = useHistory();
  const animation = state.delayed ? "animate_zoomin_delayed" : "animate_zoomin";
  const { data } = useQuery<PostData, PostsQueryVars>(POSTS_QUERY, {
    variables: {
      category: category?.category.id ?? "",
    },
    pollInterval: 10 * 1000,
  });

  const f = (e: Post) => {
    const next = async () => history.push(`/post/${e.id}`);
    return {
      fst: <PostMetadata post={e} onClick={next} />,
      snd: <PostImg formats={e.thumbnail.formats} onClick={next} />,
      key: e.id,
    };
  };

  return data && category ? (
    <AltAnimatedList
      list={data.posts.slice(0, category.limit).map(f)}
      rowClass="my-4"
      animation={animation}
      onScrollEnd={() =>
        data.posts.length >= category.limit &&
        dispatch({ type: INCREMENT_CATEGORY })
      }
    >
      <CategoryIntro id={category.category.id} />
    </AltAnimatedList>
  ) : (
    <></>
  );
}

function PostMetadata(props: { post: Post; onClick: () => {} }) {
  return (
    <div className="text-center text-white text-shadow">
      <h1>{props.post.title}</h1>
      <p>{props.post.subtitle}</p>
      <button
        className="text-uppercase text-white p-2 mb-3 details"
        onClick={props.onClick}
      >
        DETTAGLI
      </button>
    </div>
  );
}

function PostImg(props: { formats: ImgFormatType; onClick: () => {} }) {
  return (
    <img
      className="rounded-lg shadow-lg"
      src={`${apiUrl}${props.formats.small.url}`}
      alt=""
      onClick={props.onClick}
      style={{ maxHeight: "600px", maxWidth: "100%", cursor: "pointer" }}
    />
  );
}
