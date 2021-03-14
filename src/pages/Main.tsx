import { Content } from "./Content";
import { Background } from "./Background";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { store } from "../reducers";
import { Provider } from "react-redux";

export const apiUrl = process.env.REACT_APP_STRAPI_API;

export const apolloClient = new ApolloClient({
  uri: `${apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Background />
          <Content />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}
