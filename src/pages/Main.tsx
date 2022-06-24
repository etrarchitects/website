import { Content } from "./Content";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { store } from "../reducers";
import { Provider } from "react-redux";
import { EtraLogo } from "../components/EtraLogo";
import { HeaderFooter } from "../components/HeaderFooter";
import { BackgroundSlideshow } from "../components/BackgroundSlideshow";
import { apiUrl, publicationState } from "../constants";
import { UNDER_CONSTRUCTION_QUERY } from "../api/query";
import {
  UnderConstruction,
  UnderConstructionVariables,
} from "../generated/UnderConstruction";
import { PublicationState } from "../generated/globalTypes";
import { Remark } from "react-remark";

export const apolloClient = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <BackgroundSlideshow />
          <AllContent />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

function AllContent() {
  const { data } = useQuery<UnderConstruction, UnderConstructionVariables>(
    UNDER_CONSTRUCTION_QUERY,
    {
      variables: {
        publicationState,
      },
    }
  );

  return publicationState === PublicationState.LIVE &&
    data &&
    data.underConstruction &&
    data.underConstruction.enabled ? (
    <>
      <EtraLogo className="top" />
      <h3 className="container-fluid mt-2">
        <div className="row justify-content-center">
          <div className="text-white text-center col-lg-8">
            <Remark children={data.underConstruction.content} />
          </div>
        </div>
      </h3>
    </>
  ) : (
    <>
      <EtraLogo />
      <HeaderFooter />
      <Content />
    </>
  );
}
