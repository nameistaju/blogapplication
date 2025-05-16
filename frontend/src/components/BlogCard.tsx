
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Blog } from "@/utils/mockData";
import { formatDistanceToNow } from "date-fns";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link to={`/blogs/${blog.id}`} className="block">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow blog-card">
        {blog.image && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {blog.category}
            </span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold mt-2 line-clamp-2">
            {blog.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-gray-600 text-sm line-clamp-3">
            {blog.content.replace(/#|##|\*/g, "").slice(0, 150)}...
          </p>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-gray-700">By {blog.author}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
