import { Content } from "./Content";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { store } from "../reducers";
import { Provider } from "react-redux";
import { EtraLogo } from "../components/EtraLogo";
import { HeaderFooter } from "../components/HeaderFooter";
import { BackgroundSlideshow } from "../components/BackgroundSlideshow";
import { useState } from "react";
import { apiUrl } from "../constants";

export const apolloClient = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <BackgroundSlideshow
            onLoad={async () => {
              setLoaded(true);
            }}
          />
          {loaded && (
            <>
              <EtraLogo />
              <HeaderFooter />
              <Content />
            </>
          )}
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}
