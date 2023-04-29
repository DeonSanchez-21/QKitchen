import { AuthLayout } from "./pages/Layouts/AuthLayout";
import { RootLayout } from "./pages/Layouts/RootLayout";
import { Login } from "./pages/login";
import { Signup } from "./pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { RecipeDetails } from "./pages/RecipeDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {index: true, element: <Login/>},
            {path: "signup", element: <Signup/>},
        ],
    },
    {
        element: <RootLayout/>,
        children: [
            {path: "home", element: <Home/>},
            {path: "/recipeDetails/:id", element: <RecipeDetails/>}
        ],
        
    },
])