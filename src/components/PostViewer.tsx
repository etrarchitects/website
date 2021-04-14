import "react-slideshow-image/dist/styles.css";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Markdown } from "./Markdown";
import { POST_QUERY } from "../api/query";
import { GetPost, GetPostVariables, GetPost_post } from "../generated/GetPost";
import { Slideshow } from "./Slideshow";
import { notUndefined } from "../utils";
import { publicationState } from "../constants";

export function PostViewer() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery<GetPost, GetPostVariables>(POST_QUERY, {
    variables: { id: params.id, publicationState },
  });

  return (
    <div className="main-container">
      <div className="container bg-white shadow-lg fade-bottom-up">
        {data !== undefined && data.post !== null ? (
          <Content post={data.post} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function Content({ post }: { post: GetPost_post }) {
  if (post === null) return <></>;
  return (
    <>
      <h1 className="pt-4 text-primary text-center">{post.title}</h1>
      {post.slideshow && (
        <Slideshow slides={post.slideshow.filter(notUndefined)} />
      )}

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <section className="post">
              <Markdown content={post.content} />
            </section>
          </div>
          <div className="col-lg-3">
            {post.metadata &&
              post.metadata.map((e, i) => {
                if (e !== null) {
                  return (
                    <div key={i}>
                      <h3 className="title text-primary text-uppercase">
                        {e.title}
                      </h3>
                      <Markdown className="post-metadata" content={e.content} />
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
}
