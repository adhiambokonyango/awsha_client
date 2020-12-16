import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { render } from "react-dom";
import "./index.css";
import "bulma/css/bulma.css";
import App from "./App";
import Tender from "./Tender";
import createStore from "./store/createStore";
import * as serviceWorker from "./serviceWorker";

const store = createStore();
const history = createHistory();
const rootElement = document.getElementById("root");

const tenderElement = document.getElementById("tender");

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

const tender = (
    <Provider store={store}>
        <Router history={history}>
            <Tender />
        </Router>
    </Provider>
);

if (rootElement) {
    render(app, rootElement);
}
if (tenderElement){
    render(tender, tenderElement);
}

// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   rootElement
// );
serviceWorker.unregister();
