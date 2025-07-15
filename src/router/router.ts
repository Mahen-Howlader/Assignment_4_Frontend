import { createBrowserRouter } from "react-router";
import RootLayout from './../RootLayout';
import Home from './../pages/Home';
const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children : [
            {index : true, Component : Home}
        ]
    },
]);

export default router;
