import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "./core/styles/globals.css";
import { UserProvider } from "./administrador/context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
      <UserProvider>
        <App />
      </UserProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
