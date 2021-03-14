import { useHistory, useLocation } from "react-router-dom";

export interface HistoryState {
   delayed?: boolean
   moveDown?: boolean
}

export interface LocationState extends HistoryState {
   isHome: boolean
}

export function useLocationState(): LocationState{
   const history = useHistory<HistoryState>();
   const location = useLocation();
   return {...history.location.state, isHome: location.pathname === "/"};
}