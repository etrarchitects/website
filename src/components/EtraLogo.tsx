import { useLocationState } from "../hooks";

export function EtraLogo() {
  const locationState = useLocationState();
  let sx = {
    x: 100,
    y: "28.8%",
  };
  let dx = {
    x: 200,
    y: "29.5",
  };
  let strokeWidth = "3";
  let len = 1000;

  const f = () => {
    if (locationState.isHome && locationState.moveDown) return "moveDown";
    else if (locationState.isHome) return "center";
    else if (locationState.delayed) return "top moveUp";
    else return "top";
  };

  return (
    <div
      id="etra-logo"
      className={`etra-logo-container ${f()}`}
      // style={locationState.moveDown ? { animationDelay: "0.2s" } : {}}
    >
      <svg viewBox="0 0 300 100">
        <text
          className="title"
          x="50%"
          y="30%"
          dominantBaseline="middle"
          fill="white"
          textAnchor="middle"
          fontSize="50px"
        >
          etra
        </text>
        <text
          className="subtitle"
          x="50%"
          y="75%"
          dominantBaseline="end"
          fill="white"
          textAnchor="middle"
          fontSize="19px"
        >
          architects
        </text>
        <line
          x1={sx.x}
          y1={sx.y}
          x2={sx.x - len}
          y2={sx.y}
          strokeWidth={strokeWidth}
          stroke="white"
        />
        <line
          x1={dx.x}
          y1={dx.y}
          x2={dx.x + len}
          y2={dx.y}
          strokeWidth={strokeWidth}
          stroke="white"
        />
      </svg>
    </div>
  );
}
