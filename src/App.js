import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from './Features/MainPage/mainPage';
import { TaskDetails } from "./Features/TaskDetails/taskDetails";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainPage/>} />
    <Route path="/MainPage" element={<MainPage/>} />
    <Route path="/taskDetails/:taskId" element={<TaskDetails/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
