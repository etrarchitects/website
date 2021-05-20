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
import { Markdown } from "../components/Markdown";
import {
  UnderConstruction,
  UnderConstructionVariables,
} from "../generated/UnderConstruction";

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
          <EtraLogo />
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

  return process.env.NODE_ENV === "production" &&
    data &&
    data.underConstruction &&
    data.underConstruction.enabled ? (
    <h3 className="container-fluid mt-2">
      <div className="row justify-content-center">
        <Markdown
          className="text-white text-center col-lg-8"
          content={data.underConstruction.content}
        />
      </div>
    </h3>
  ) : (
    <>
      <HeaderFooter />
      <Content />
    </>
  );
}
