
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogForm, BlogFormData } from "@/components/BlogForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { createBlog } from "@/utils/api";

const CreateBlogPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (data: BlogFormData) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const newBlog = await createBlog({
        ...data,
        author: user.name,
        authorId: user.id,
      });
      
      toast({
        title: "Blog created",
        description: "Your blog has been successfully created.",
      });
      
      navigate(`/blogs/${newBlog.id}`);
    } catch (error) {
      console.error("Failed to create blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create blog. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-6 pt-24 pb-12">
      <h1 className="font-serif text-3xl font-bold mb-6">Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default CreateBlogPage;
