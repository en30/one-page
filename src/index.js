import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

store.initialize();
registerServiceWorker();

const routes = {
  "/": "PostIndex",
  "/posts/new": ["requireAuthentication", "NewPost"],
  "/posts/:id": "Post",
  "/users/:id": "User"
};

ReactDOM.render(<Router routes={routes} />, document.getElementById("root"));
