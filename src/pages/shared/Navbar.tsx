import { BookOpen, Plus, ClipboardList, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md px-6 py-4 ">
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <h1 className="text-2xl font-bold text-primary">📘 Library</h1>

                    {/* Hamburger for mobile */}
                    {
                        isMenuOpen ? <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button> : <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                    }


                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link to="/all-books">
                            <Button variant="ghost" className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>All Books</span>
                            </Button>
                        </Link>

                        <Link to="/add-book">
                            <Button variant="ghost" className="flex items-center space-x-1">
                                <Plus className="w-4 h-4" />
                                <span>Add Book</span>
                            </Button>
                        </Link>

                        <Link to="/borrow-summary">
                            <Button variant="ghost" className="flex items-center space-x-1">
                                <ClipboardList className="w-4 h-4" />
                                <span>Borrow Summary</span>
                            </Button>
                        </Link>
                    </nav>
                </div>



            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <nav className="md:hidden absolute  left-0  w-full bg-white shadow-lg z-50 p-4 space-y-2">
                    <Link to="/all-books" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                            <BookOpen className="w-4 h-4 mr-2" />
                            All Books
                        </Button>
                    </Link>

                    <Link to="/add-book" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Book
                        </Button>
                    </Link>

                    <Link to="/borrow-summary" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                            <ClipboardList className="w-4 h-4 mr-2" />
                            Borrow Summary
                        </Button>
                    </Link>
                </nav>
            )}
        </header>
    );
}

export default Navbar;
