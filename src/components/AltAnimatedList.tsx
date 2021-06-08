import { ReactNode, useRef } from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Keyframes } from "@emotion/serialize";

const customAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

interface AltListProps {
  outerContainerClass?: string;
  innerContainerClass?: string;
  rowClass?: string;
  onScrollEnd?: VoidFunction;
  animation?: Keyframes;
  animationDuration?: number;
  animationDelay?: number;
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
          keyframes={props.animation ?? customAnimation}
          duration={props.animationDuration ?? 0}
          delay={props.animationDelay}
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
