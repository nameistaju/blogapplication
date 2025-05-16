
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Edit, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-primary">
          BloggerSpace
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link to="/blogs" className="text-gray-700 hover:text-primary">
            Blogs
          </Link>

          {isAuthenticated ? (
            <>
              <Button variant="outline" onClick={() => navigate("/create-blog")}>
                Write a Blog
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="font-medium">
                    {user?.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/my-blogs")}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>My Blogs</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 px-6 bg-white animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 hover:text-primary"
              onClick={toggleMobileMenu}
            >
              Blogs
            </Link>

            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/create-blog");
                    toggleMobileMenu();
                  }}
                >
                  Write a Blog
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start px-0"
                  onClick={() => {
                    navigate("/my-blogs");
                    toggleMobileMenu();
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  My Blogs
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start px-0"
                  onClick={() => {
                    logout();
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="justify-start px-0"
                  onClick={() => {
                    navigate("/login");
                    toggleMobileMenu();
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    navigate("/signup");
                    toggleMobileMenu();
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
