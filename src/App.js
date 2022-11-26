import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contex/GlobalContext";
import AppRouter from "./router/AppRouter";
import "./App.css"

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
