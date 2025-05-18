import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PublicRoute from "./components/public-route/PublicRoute";

export const RouteList = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
