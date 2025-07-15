import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 border-t">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} Library System. All rights reserved.</p>

        <div className="flex space-x-4">
          <Link to="/all-books" className="text-sm hover:underline">All Books</Link>
          <Link to="/add-book" className="text-sm hover:underline">Add Book</Link>
          <Link to="/borrow-summary" className="text-sm hover:underline">Borrow Summary</Link>
        </div>
      </div>
    </footer>
  );
}
