import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CATEGORY_QUERY } from "../api/query";
import { publicationState } from "../constants";
import { GetCategories } from "../generated/GetCategories";
import { HistoryState } from "../hooks";
import {
  ADD_CATEGORY,
  AppDispatch,
  CLOSE_OPENED,
  RESET_CATEGORY,
  SWITCH_CATEGORY,
  TOGGLE_OPENED,
  useTypedSelector,
} from "../reducers";
import { HamburgerMenu } from "./HamburgerMenu";

const footer = ["about", "contacts"];

export function HeaderFooter() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useQuery<GetCategories>(CATEGORY_QUERY, {
    variables: {
      publicationState,
    },
    onCompleted: (e) => {
      if (e.categories) {
        const currentLocation = location.pathname.split("/")[1];
        dispatch({
          type: ADD_CATEGORY,
          payload: e.categories.map((e) => ({
            category: e,
            active: e?.type && e.type === currentLocation,
          })),
        });
      }
    },
  });
  const history = useHistory<HistoryState>();
  const opened = useTypedSelector((state) => state.opened);
  const isHome = location.pathname === "/";

  return (
    <div className="header-footer">
      <div className="header fade-in">
        <div
          className={`dummy ${isHome ? "" : "moveRight"}`}
          onClick={() => {
            history.push("/", { moveDown: true });
            dispatch({
              type: RESET_CATEGORY,
            });
            dispatch({
              type: CLOSE_OPENED,
            });
          }}
        ></div>
        <HamburgerMenu
          className={`${isHome ? "d-none" : "d-flex d-lg-none text-white"} ${
            opened ? "opened" : ""
          }`}
          onClick={async () => dispatch({ type: TOGGLE_OPENED })}
        />
        <ul
          className={
            isHome
              ? "justify-content-center"
              : "d-none d-lg-flex d-xl-flex d-xxl-flex"
          }
        >
          {data &&
            data.categories &&
            data.categories.map((e) => {
              if (e !== null) {
                return (
                  <li
                    key={e.id}
                    onClick={() => {
                      history.push(`/${e.type}`, { delayed: isHome });
                      dispatch({
                        type: SWITCH_CATEGORY,
                        payload: e,
                      });
                    }}
                  >
                    {e.type}
                  </li>
                );
              } else {
                return <></>;
              }
            })}
        </ul>
      </div>

      {opened && data ? (
        <div
          className="text-center text-white my-auto text-shadows"
          style={{ fontSize: "7vw" }}
        >
          {data &&
            data.categories &&
            data.categories.map((e) => {
              if (e !== null) {
                return (
                  <p
                    style={{ cursor: "pointer" }}
                    key={e.id}
                    onClick={() => {
                      history.push(`/${e.type}`, { delayed: isHome });
                      dispatch({
                        type: SWITCH_CATEGORY,
                        payload: e,
                      });
                      dispatch({
                        type: TOGGLE_OPENED,
                      });
                    }}
                  >
                    {e.type}
                  </p>
                );
              } else {
                return <></>;
              }
            })}
          {footer.map((e, i) => (
            <p
              style={{ cursor: "pointer" }}
              key={i}
              onClick={() => {
                history.push(`/${e}`, { delayed: false });
                dispatch({
                  type: RESET_CATEGORY,
                });
                dispatch({
                  type: TOGGLE_OPENED,
                });
              }}
            >
              {e}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div
        className={
          isHome
            ? "footer fade-in"
            : "footer d-none d-lg-flex d-xl-flex d-xxl-flex"
        }
      >
        <ul>
          {footer.map((e, i) => (
            <li
              key={i}
              onClick={() => {
                history.push(`/${e}`, { delayed: isHome });
                dispatch({
                  type: RESET_CATEGORY,
                });
              }}
            >
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
