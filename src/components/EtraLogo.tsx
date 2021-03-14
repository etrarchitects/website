import { useLocationState } from "../hooks";

export function EtraLogo() {
  const locationState = useLocationState();
  let y_sx = "29.5%";
  let y_dx = "28.7%";
  let x_dx = 100;
  let x_sx = 200;
  let strokeWidth = "3.2";
  let len = 1000;

  const f = () => {
    if (locationState.isHome && locationState.moveDown) return "moveDown";
    else if (locationState.isHome) return "center";
    else if (locationState.delayed) return "top moveUp";
    else return "top";
  };

  return (
    <div id="etra-logo" className={`etra-logo-container ${f()}`}>
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
          x1={x_dx}
          y1={y_dx}
          x2={x_dx - len}
          y2={y_dx}
          strokeWidth={strokeWidth}
          stroke="white"
        />
        <line
          x1={x_sx}
          y1={y_sx}
          x2={x_sx + len}
          y2={y_sx}
          strokeWidth={strokeWidth}
          stroke="white"
        />
      </svg>
    </div>
  );
}
