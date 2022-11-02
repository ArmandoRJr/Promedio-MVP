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
import Welcome from "./routes/Welcome";
import AllSemesters from "./routes/AllSemesters";
import AllCourses from "./routes/AllCourses";
import Semester from "./routes/Semester";
import "./styles/globals.css";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Globals from './styles/globals.css';
import theme from './styles/theme.js';
import User from "./routes/User";
import CourseDetails from "./routes/Course";

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
              <Route path="/courses" element={<AllCourses />} />
              <Route path="/semesters" element={<AllSemesters />} />
              <Route path="/semesters/:id" element={<Semester />} />
              <Route path="/semesters/:id/courses/:courseId" element={<CourseDetails />} />
              <Route path="/user" element={<User />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);