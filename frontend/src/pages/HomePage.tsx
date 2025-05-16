
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBlogs, Blog } from "@/utils/mockData";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allBlogs = await fetchBlogs();
        
        // Get 3 featured blogs (we'll just use the first 3 for this demo)
        setFeaturedBlogs(allBlogs.slice(0, 1));
        
        // Get 6 most recent blogs for the grid section
        const sorted = [...allBlogs].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentBlogs(sorted.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/5 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
              Share Your Stories with the World
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
              BloggerSpace is a platform for writers, thinkers, and storytellers to share their perspectives with a global audience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate("/blogs")} size="lg">
                Explore Blogs
              </Button>
              {isAuthenticated ? (
                <Button onClick={() => navigate("/create-blog")} variant="outline" size="lg">
                  <Edit className="mr-2 h-4 w-4" />
                  Start Writing
                </Button>
              ) : (
                <Button onClick={() => navigate("/signup")} variant="outline" size="lg">
                  Join Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-primary text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Writing?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of writers and share your unique perspective with readers around the world.
            </p>
            {isAuthenticated ? (
              <Button
                onClick={() => navigate("/create-blog")}
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Create Your First Blog
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/signup")}
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Sign Up Now
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
