import { createBrowserRouter } from "react-router";
import RootLayout from './../RootLayout';
import Home from './../pages/Home';
import Allbook from "@/pages/Allbook";
import Addbook from "@/pages/Addbook";
import Borrow_Summary from "@/pages/Borrow_Summary";
const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "/all-books", Component: Allbook },
            { path: "/add-books", Component: Addbook },
            { path: "/borrow-summary", Component: Borrow_Summary },
        ]
    },
]);

export default router;
