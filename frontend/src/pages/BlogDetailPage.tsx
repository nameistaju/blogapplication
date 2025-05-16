import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Blog } from "@/utils/mockData";
import { fetchBlogById, deleteBlog } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlog = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const fetchedBlog = await fetchBlogById(id);
        if (fetchedBlog) {
          setBlog(fetchedBlog);
        } else {
          toast({
            variant: "destructive",
            title: "Blog not found",
            description: "The blog you're looking for doesn't exist.",
          });
          navigate("/blogs");
        }
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
  }, [id, toast, navigate]);

  const isAuthor = user && blog && user.id === blog.authorId;

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      await deleteBlog(id);
      toast({
        title: "Blog deleted",
        description: "Your blog has been successfully deleted.",
      });
      navigate("/my-blogs");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading blog...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <p className="mb-6">The blog you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/blogs")}>Back to Blogs</Button>
      </div>
    );
  }

  // Convert markdown headings to HTML
  const processContent = (content: string): string => {
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 pt-24 pb-12">
      {/* Category badge */}
      <div className="mb-4">
        <Link 
          to={`/blogs?category=${blog.category}`}
          className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
        >
          {blog.category}
        </Link>
      </div>
      
      {/* Blog title */}
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
      
      {/* Author & date info */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-gray-600">
          By{" "}
          <Link to={`/blogs?author=${blog.author}`} className="text-primary hover:underline">
            {blog.author}
          </Link>
        </div>
        <div className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      
      {/* Author actions */}
      {isAuthor && (
        <div className="flex justify-end space-x-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      )}
      
      {/* Featured image */}
      {blog.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}
      
      {/* Blog content */}
      <div 
        className="prose-custom" 
        dangerouslySetInnerHTML={{ __html: processContent(blog.content) }} 
      />
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogDetailPage;
