import { AuthLayout } from "./pages/Layouts/AuthLayout";
import { RootLayout } from "./pages/Layouts/RootLayout";
import { Login } from "./pages/login";
import { Signup } from "./pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { RecipeDetails } from "./pages/RecipeDetails";

export const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {path: "login", element: <Login/>},
            {path: "signup", element: <Signup/>},
        ],
    },
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "/recipeDetails/:id", element: <RecipeDetails/>}
        ],
        
    },
])