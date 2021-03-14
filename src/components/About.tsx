import { getTeams, TeamComponent } from "../api/api";
import { useLocationState } from "../hooks";
import { AltAnimatedList } from "./AltAnimatedList";

function toLeftRight(e: TeamComponent[]) {
  return e.map((e, i) => ({
    fst: <AboutImg img={e.img} />,
    snd: <AboutMetadata teamComponent={e} />,
    key: i.toString(),
  }));
}

export function About() {
  const team = getTeams();
  const state = useLocationState();
  const animation = state.delayed ? "animate_zoomin_delayed" : "animate_zoomin";

  return (
    <div className="main-container text-white">
      <div className="container mb-4">
        <div className={`description ${animation}`}>{team.desc}</div>
        {team.team.map((e, i) => (
          <div key={i}>
            <h1 className={`etra-title text-center ${animation}`}>
              {e.header}
            </h1>
            <AltAnimatedList
              list={toLeftRight(e.components)}
              outerContainerClass=""
              rowClass="teamComponent"
              animation={animation}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutImg(props: { img: string }) {
  return (
    <img
      className="rounded-lg shadow-lg"
      src={props.img}
      alt=""
      style={{ maxHeight: "600px", maxWidth: "100%" }}
    />
  );
}

function AboutMetadata(props: { teamComponent: TeamComponent }) {
  return (
    <div>
      <h3>{props.teamComponent.name}</h3>
      <h5>{props.teamComponent.role}</h5>
      <p>{props.teamComponent.desc}</p>
    </div>
  );
}
