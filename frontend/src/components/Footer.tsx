
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 px-6 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">BloggerSpace</h3>
            <p className="text-gray-600">
              A platform for sharing your thoughts, ideas, and stories with the world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-primary">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-primary">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/blogs?category=Career"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Career
              </Link>
              <Link
                to="/blogs?category=Finance"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Finance
              </Link>
              <Link
                to="/blogs?category=Travel"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Travel
              </Link>
              <Link
                to="/blogs?category=Technology"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Technology
              </Link>
              <Link
                to="/blogs?category=Health"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Health
              </Link>
              <Link
                to="/blogs?category=Lifestyle"
                className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors"
              >
                Lifestyle
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
