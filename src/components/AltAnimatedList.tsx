import { ReactNode, useRef } from "react";
import Reveal from "react-awesome-reveal";
import { bottomUpAnimation } from "../constants";
import { useLocationState } from "../hooks";

interface AltListProps {
  outerContainerClass?: string;
  innerContainerClass?: string;
  rowClass?: string;
  onScrollEnd?: VoidFunction;
  list: {
    fst: JSX.Element;
    snd: JSX.Element;
    key: string;
  }[];
  children?: ReactNode;
}

export const AltAnimatedList = ({ children, ...props }: AltListProps) => {
  const container = useRef<HTMLDivElement>(null);
  const altList = useRef<HTMLDivElement>(null);
  const state = useLocationState();

  const onScroll = (_: any) => {
    if (container.current != null && altList.current != null) {
      const bottomContainer = container.current.getBoundingClientRect().bottom;
      const bottomAltList = altList.current.getBoundingClientRect().bottom;
      if (bottomAltList - bottomContainer <= 1) {
        props.onScrollEnd && props.onScrollEnd();
      }
    }
  };

  return (
    <div
      className={props.outerContainerClass ?? "main-container"}
      onScroll={props.onScrollEnd ? onScroll : undefined}
      ref={container}
    >
      <div className={props.innerContainerClass ?? "container"} ref={altList}>
        <Reveal
          triggerOnce
          keyframes={bottomUpAnimation}
          duration={2000}
          delay={state.delayed ? 1000 : 0}
        >
          {props.list.map((e, i) => (
            <div className={`row ${props.rowClass}`} key={e.key}>
              <div
                className={`col-md order-md-1 d-flex justify-content-center flex-column ${
                  i % 2 === 0 ? "order-lg-1" : "order-lg-2"
                }`}
              >
                {e.fst}
              </div>
              <div
                className={`col-md order-md-1 d-flex justify-content-center flex-column ${
                  i % 2 === 0 ? "order-lg-2" : "order-lg-1"
                }`}
              >
                {e.snd}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
};
