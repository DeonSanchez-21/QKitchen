import { AuthLayout } from "./pages/Layouts/AuthLayout";
import { RootLayout } from "./pages/Layouts/RootLayout";
import { Login } from "./pages/login";
import { Signup } from "./pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import { RecipeDetails } from "./pages/RecipeDetails";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {path: "/login", element: <Login/>},
            {path: "/signup", element: <Signup/>},
        ],
    },
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {index: true, element: <Landing/>},
            {path: "home", element: <Home/>},
            {path: "recipeDetails/:id", element: <RecipeDetails/>}
        ],
        
    },
])