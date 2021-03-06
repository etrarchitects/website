import { useQuery } from "@apollo/client";
import { ABOUTUS_QUERY, TEAMS_QUERY } from "../api/query";
import {
  GetTeams,
  GetTeams_teams,
  GetTeams_teams_profile,
} from "../generated/GetTeams";
import { useLocationState } from "../hooks";
import { notUndefined } from "../utils";
import { AltAnimatedList } from "./AltAnimatedList";
import Moment from "react-moment";
import { GetAboutUs } from "../generated/GetAboutUs";
import { Remark } from "react-remark";
import { apiUrl, publicationState } from "../constants";

function toLeftRight(e: GetTeams_teams[]) {
  return e.map((e, i) => ({
    fst: e.profile ? <AboutImg img={e.profile} /> : <></>,
    snd: <AboutMetadata teamComponent={e} />,
    key: i.toString(),
  }));
}

interface GroupedTeam {
  [key: string]: GetTeams_teams[];
}

export function About() {
  const { data } = useQuery<GetTeams>(TEAMS_QUERY, {
    variables: {
      publicationState,
    },
  });
  const state = useLocationState();
  const animation = `fade-bottom-up ${state.delayed ? "animation-delay" : ""}`;

  const getGroupedTeam = (e: GetTeams) => {
    const dict: GroupedTeam = {};
    e.teams?.filter(notUndefined).forEach((e) => {
      if (e.member_category && !(e.member_category.name in dict)) {
        dict[e.member_category.name] = [e];
      } else if (e.member_category && e.member_category.name) {
        dict[e.member_category.name].push(e);
      }
    });
    return dict;
  };

  return (
    <div className="main-container text-white">
      <div className="container mb-4">
        <AboutDescription animation={animation} />
        {data && data.teams && (
          <AboutList groupedTeam={getGroupedTeam(data)} animation={animation} />
        )}
      </div>
    </div>
  );
}

function AboutDescription({ animation }: { animation: string }) {
  const { data } = useQuery<GetAboutUs>(ABOUTUS_QUERY, {
    variables: {
      publicationState,
    },
  });
  return data && data.aboutUs && data.aboutUs.description ? (
    <div className={`description ${animation}`}>
      <Remark children={data.aboutUs.description} />
    </div>
  ) : (
    <></>
  );
}

function AboutList({
  groupedTeam,
  animation,
}: {
  groupedTeam: GroupedTeam;
  animation: string;
}) {
  return (
    <>
      {Object.entries(groupedTeam).map((e, i) => (
        <div key={i}>
          <h1 className={`etra-title text-center text-uppercase ${animation}`}>
            {e[0]}
          </h1>
          <AltAnimatedList
            list={toLeftRight(e[1])}
            outerContainerClass=""
            rowClass="teamComponent"
          />
        </div>
      ))}
    </>
  );
}

function AboutImg({ img }: { img: GetTeams_teams_profile }) {
  return (
    <img
      className="rounded-lg shadow-lg"
      src={`${apiUrl}${img.formats["medium"].url}`}
      alt={img.alternativeText ?? ""}
      style={{ maxHeight: "600px", maxWidth: "100%" }}
    />
  );
}

function AboutMetadata(props: { teamComponent: GetTeams_teams }) {
  return (
    <div>
      <h3>{`${props.teamComponent.name} ${props.teamComponent.surname}`}</h3>
      {props.teamComponent.member_role && (
        <h5>
          <span>
            <Moment diff={new Date(props.teamComponent.birthdate)} unit="years">
              {Date.now()}
            </Moment>
          </span>
          {` anni, ${props.teamComponent.member_role.role}`}
        </h5>
      )}
      {props.teamComponent.description && (
        <p>{props.teamComponent.description}</p>
      )}
    </div>
  );
}
