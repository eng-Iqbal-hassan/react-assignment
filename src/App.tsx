import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./routes/auth/signUp";
import { LogIn } from "./routes/auth/logIn";
import { AuthLayout } from "./routes/auth/layout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
    ],
  },
  
]);

export default function App() {
  return <RouterProvider router={router} />;
}
