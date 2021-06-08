import { Switch, Route } from "react-router-dom";
import { About } from "../components/About";
import { Contacts } from "../components/Contacts";
import { PostViewer } from "../components/PostViewer";
import { useTypedSelector } from "../reducers";
import { PostList } from "./PostList";

export function Content() {
  const opened = useTypedSelector((state) => state.opened);
  return (
    <main style={{ display: opened ? "none" : "" }}>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/post/:id">
          <PostViewer />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contacts">
          <Contacts />
        </Route>
        <Route exact path="/:category">
          <PostList />
        </Route>
      </Switch>
    </main>
  );
}
