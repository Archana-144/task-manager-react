import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";

import Login from "../pages/Login";

import Home from "../pages/Home";

import AddTask from "../pages/AddTask";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* HOME */}

        <Route
          path="/home"
          element={<Home />}
        />

        {/* ADD TASK */}

        <Route
          path="/add-task"
          element={<AddTask />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;