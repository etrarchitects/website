// import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Post, PostQueryVars, POST_QUERY, SinglePostData } from "../api";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Markdown } from "./Markdown";

export function PostViewer() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery<SinglePostData, PostQueryVars>(POST_QUERY, {
    variables: { id: params.id },
  });

  return (
    <div className="main-container">
      <div className="container bg-white shadow-lg animate_zoomin">
        {data !== undefined ? <Content post={data.post} /> : <></>}
      </div>
    </div>
  );
}

// interface SlideShowProps {
//   images: Images;
// }

// export function SlideShow({ images }: SlideShowProps) {
//   return (
//     <Fade easing="ease" indicators={true} pauseOnHover={true} duration={3000}>
//       {images.map((e, i) => (
//         <div key={i} className="each-fade">
//           <img src={e.img} alt={""} style={{ width: "100%" }} />
//         </div>
//       ))}
//     </Fade>
//   );
// }

function Content({ post }: { post: Post }) {
  if (post === null) return <></>;
  return (
    <>
      <h1 className="py-4 text-primary text-center">{post.title}</h1>

      {/* <SlideShow images={postContent.images} /> */}

      {/* <h3 className="text-center pt-4">{postContent.place}</h3> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <Markdown content={post.content} />
          </div>
          <div className="col-lg-3">
            {post.post_metadata.map((e, i) => (
              <div key={i}>
                <h3 className="title text-primary text-uppercase">{e.title}</h3>
                <p className="content">{e.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
