import { useEffect, useState } from "react";
import { categories } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

export function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      // If clicking the already selected category, clear the filter
      setSelectedCategory(null);
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      // Otherwise set the new category filter
      setSelectedCategory(category);
      searchParams.set("category", category);
      setSearchParams(searchParams);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    // Update state when search params change (e.g., from browser navigation)
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm text-gray-700 mb-2">Filter by Category:</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-gray-600"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
