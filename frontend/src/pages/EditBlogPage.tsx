
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Blog } from "@/utils/mockData";
import { fetchBlogById, updateBlog } from "@/utils/api";
import { BlogForm, BlogFormData } from "@/components/BlogForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const EditBlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlog = async () => {
      if (!id || !user) return;
      
      setLoading(true);
      try {
        const fetchedBlog = await fetchBlogById(id);
        
        if (!fetchedBlog) {
          toast({
            variant: "destructive",
            title: "Blog not found",
            description: "The blog you're trying to edit doesn't exist.",
          });
          navigate("/my-blogs");
          return;
        }
        
        // Check if the user is the author
        if (fetchedBlog.authorId !== user.id) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: "You don't have permission to edit this blog.",
          });
          navigate(`/blogs/${id}`);
          return;
        }
        
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load blog. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, user, toast, navigate]);

  const handleSubmit = async (data: BlogFormData) => {
    if (!id || !blog) return;
    
    setIsSubmitting(true);
    try {
      const updatedBlog = await updateBlog(id, data);
      
      toast({
        title: "Blog updated",
        description: "Your blog has been successfully updated.",
      });
      
      navigate(`/blogs/${updatedBlog.id}`);
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update blog. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <p className="mb-6">The blog you're trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-6 pt-24 pb-12">
      <h1 className="font-serif text-3xl font-bold mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default EditBlogPage;
