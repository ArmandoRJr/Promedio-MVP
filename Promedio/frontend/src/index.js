import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import App from "./routes/App";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Welcome from "./routes/Welcome";
import "./styles/globals.css";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Globals from './styles/globals.css';
import theme from './styles/theme.js';
import User from "./routes/User";
import Courses from "./routes/Courses";

const GlobalStyle = createGlobalStyle`${Globals}`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* Router rested in here */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="*" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<Courses />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);