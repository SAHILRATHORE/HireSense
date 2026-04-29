import { createBrowerRouter } from "react-router"
import login from "./features/auth/pages/login"
import register from "./features/auth/pages/register"




export const router = createBrowerRouter([
    {
        path: "/login",
        element: <login/>
    },
    {
        path: "/register",
        element: <register/>
    }
])