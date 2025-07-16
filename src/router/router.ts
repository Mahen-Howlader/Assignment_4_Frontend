import { createBrowserRouter } from "react-router";
import RootLayout from './../RootLayout';
import Home from './../pages/Home';
import Allbook from "@/pages/Allbook";
import Addbook from "@/pages/Addbook";
const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "/all-books", Component: Allbook },
            { path: "/add-books", Component: Addbook },
        ]
    },
]);

export default router;
