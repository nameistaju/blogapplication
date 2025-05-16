
import { Blog } from "./mockData";

// API base URL
const API_URL = import.meta.env.VITE_API_BASE_URL;



// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  };
};

// Blog API functions
export const fetchBlogs = async (filters?: { category?: string; author?: string }) => {
  try {
    let url = `${API_URL}/blogs`;
    
    // Add query parameters if filters are provided
    if (filters) {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.author) params.append("author", filters.author);
      if (params.toString()) url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Convert MongoDB data structure to our frontend structure
    return data.map((blog: any) => ({
      id: blog._id,
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: blog.image,
      authorId: blog.userId,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: "GET",
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch blog: ${response.statusText}`);
    }
    
    const blog = await response.json();
    
    // Convert MongoDB data structure to our frontend structure
    return {
      id: blog._id,
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: blog.image,
      authorId: blog.userId,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

export const createBlog = async (blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
  try {
    const response = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: getAuthHeader(),
      body: JSON.stringify({
        title: blogData.title,
        category: blogData.category,
        content: blogData.content,
        image: blogData.image,
        // Server will get author from the user data
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create blog: ${response.statusText}`);
    }
    
    const blog = await response.json();
    
    // Convert MongoDB data structure to our frontend structure
    return {
      id: blog._id,
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: blog.image,
      authorId: blog.userId,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const updateBlog = async (id: string, blogData: Partial<Blog>) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: JSON.stringify({
        title: blogData.title,
        category: blogData.category,
        content: blogData.content,
        image: blogData.image,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update blog: ${response.statusText}`);
    }
    
    const blog = await response.json();
    
    // Convert MongoDB data structure to our frontend structure
    return {
      id: blog._id,
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      image: blog.image,
      authorId: blog.userId,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete blog: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw error;
  }
};
