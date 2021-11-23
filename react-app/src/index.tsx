import React from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";

import { Server } from "miragejs";
import { Item } from "./redux/types/itemTypes";

// fake api server
export default new Server({
  routes() {
    this.namespace = "api";
    this.get("/items/", (): { items: Item[] } => {
      const data: Item[] = require("./stackline_frontend_assessment_data_2021.json");
      return { items: data };
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
