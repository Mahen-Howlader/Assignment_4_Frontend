import { Outlet } from "react-router";
import Navbar from "./pages/shared/Navbar";
import Footer from "./pages/shared/Footer";

function RootLayout() {
    return (
        <div className="">
            <Navbar />
            <main className="min-h-[calc(100vh-180px)]">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
}

export default RootLayout;