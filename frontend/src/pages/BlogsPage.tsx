
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Blog } from "@/utils/mockData";
import { fetchBlogs } from "@/utils/api";
import { BlogCard } from "@/components/BlogCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useToast } from "@/components/ui/use-toast";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const category = searchParams.get("category");
        const author = searchParams.get("author");
        
        const filters: { category?: string; author?: string } = {};
        if (category) filters.category = category;
        if (author) filters.author = author;
        
        const fetchedBlogs = await fetchBlogs(filters);
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load blogs. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [searchParams, toast]);

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-24 pb-12">
      <h1 className="font-serif text-4xl font-bold mb-6">Blogs</h1>
      
      {/* Filters */}
      <CategoryFilter />
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-lg">Loading blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-2">No blogs found</h2>
          <p className="text-gray-600">
            Try changing your search filters or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
