import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { CATEGORY_QUERY } from "../api/query";
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

const footer = ["about", "contacts"];

export function HeaderFooter() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useQuery<GetCategories>(CATEGORY_QUERY, {
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
      <div className="header">
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
          className="text-center text-white my-auto"
          style={{ fontSize: "7vw" }}
        >
          {data &&
            data.categories &&
            data.categories.map((e) => {
              if (e !== null) {
                return (
                  <p
                    key={e.id}
                    onClick={() => {
                      history.push(`/${e.type}`, { delayed: false });
                      dispatch({
                        type: SWITCH_CATEGORY,
                        payload: e.id,
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
          isHome ? "footer" : "footer d-none d-lg-flex d-xl-flex d-xxl-flex"
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

function HamburgerMenu({
  className,
  onClick,
}: {
  className: string;
  onClick: () => {};
}) {
  return (
    <button
      className={`${className} menu`}
      onClick={onClick}
      aria-label="Main Menu"
    >
      <svg viewBox="0 0 100 100">
        <path
          className="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path className="line line2" d="M 20,50 H 80" />
        <path
          className="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
  );
}
