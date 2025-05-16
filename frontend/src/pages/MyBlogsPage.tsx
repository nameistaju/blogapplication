
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Blog } from "@/utils/mockData";
import { fetchBlogs, deleteBlog } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
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
import { Edit, Trash2, Plus } from "lucide-react";

const MyBlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadBlogs = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const allBlogs = await fetchBlogs();
        // Filter blogs by the current user
        const userBlogs = allBlogs.filter(blog => blog.authorId === user.id);
        setBlogs(userBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your blogs. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, [user, toast]);

  const handleDeleteClick = (blogId: string) => {
    setBlogToDelete(blogId);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteBlog(blogToDelete);
      
      // Update local state
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete));
      
      toast({
        title: "Blog deleted",
        description: "Your blog has been successfully deleted.",
      });
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete blog. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 pt-24 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-bold">My Blogs</h1>
        <Button asChild>
          <Link to="/create-blog">
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-lg">Loading your blogs...</div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-medium mb-4">You haven't written any blogs yet</h2>
          <p className="text-gray-600 mb-6">
            Share your thoughts and ideas with the world by creating your first blog post.
          </p>
          <Button asChild>
            <Link to="/create-blog">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Blog
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {blog.image && (
                  <div className="md:col-span-1 h-48 md:h-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`p-6 md:col-span-${blog.image ? '3' : '4'}`}>
                  <CardHeader className="p-0 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mt-2">
                      <Link to={`/blogs/${blog.id}`} className="hover:text-primary">
                        {blog.title}
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent className="p-0 py-2">
                    <p className="text-gray-600 line-clamp-2">
                      {blog.content.replace(/#|##|\*/g, "").slice(0, 150)}...
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 pt-2 flex justify-end space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-blog/${blog.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteClick(blog.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyBlogsPage;
