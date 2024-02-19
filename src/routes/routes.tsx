import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import App from "../App";
import AddProducts from "../components/pages/AddProducts";
import AllProducts from "../components/pages/AllProducts";
import ProtectedRoute from "../layout/ProtectedRoute";
import SalesProducts from "../components/pages/SalesProducts";
import SalesHistory from "../components/pages/SalesHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute>
            <AddProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "sales-product",
        element: (
          <ProtectedRoute>
            <SalesProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "sales-history",
        element: (
          <ProtectedRoute>
            <SalesHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
