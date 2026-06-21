import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./routes/auth/signUp";
import { LogIn } from "./routes/auth/logIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
