
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Blog, categories } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface BlogFormProps {
  initialData?: Blog;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting: boolean;
}

export interface BlogFormData {
  title: string;
  category: string;
  content: string;
  image?: string;
}

export function BlogForm({ initialData, onSubmit, isSubmitting }: BlogFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image || "");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || categories[0],
      content: initialData?.content || "",
      image: initialData?.image || "",
    },
  });

  const selectedCategory = watch("category");

  const handleFormSubmit = async (data: BlogFormData) => {
    try {
      await onSubmit({
        ...data,
        image: imageUrl || undefined,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save blog. Please try again.",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown supported)</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              className="min-h-[300px]"
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL (optional)</Label>
            <Input
              id="image"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-44 object-cover rounded-md"
                  onError={() => {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to load image. Please check the URL.",
                    });
                    setImageUrl("");
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : initialData ? "Update Blog" : "Create Blog"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
