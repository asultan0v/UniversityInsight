import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

interface SearchFiltersProps {
  filters: {
    country: string;
    ranking: string;
    tuitionRange: string;
    sortBy: string;
  };
  onFilterChange: (key: string, value: string) => void;
  totalResults: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function SearchFilters({
  filters,
  onFilterChange,
  totalResults,
  viewMode,
  onViewModeChange,
}: SearchFiltersProps) {
  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-gray-900">Filter by:</h3>
            <div className="flex flex-wrap gap-3">
              <Select value={filters.country} onValueChange={(value) => onFilterChange("country", value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Countries">All Countries</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.ranking} onValueChange={(value) => onFilterChange("ranking", value)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Rankings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Rankings">All Rankings</SelectItem>
                  <SelectItem value="Top 10">Top 10</SelectItem>
                  <SelectItem value="Top 50">Top 50</SelectItem>
                  <SelectItem value="Top 100">Top 100</SelectItem>
                  <SelectItem value="Top 500">Top 500</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.tuitionRange} onValueChange={(value) => onFilterChange("tuitionRange", value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Tuition Ranges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Tuition Ranges">All Tuition Ranges</SelectItem>
                  <SelectItem value="Under $10,000">Under $10,000</SelectItem>
                  <SelectItem value="$10,000 - $30,000">$10,000 - $30,000</SelectItem>
                  <SelectItem value="$30,000 - $50,000">$30,000 - $50,000</SelectItem>
                  <SelectItem value="Over $50,000">Over $50,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Sort by:</span>
            <Select value={filters.sortBy} onValueChange={(value) => onFilterChange("sortBy", value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Ranking (Best First)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ranking (Best First)">Ranking (Best First)</SelectItem>
                <SelectItem value="Tuition (Low to High)">Tuition (Low to High)</SelectItem>
                <SelectItem value="Acceptance Rate">Acceptance Rate</SelectItem>
                <SelectItem value="Alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "grid" ? "bg-white shadow-sm text-primary" : ""}
                onClick={() => onViewModeChange("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={viewMode === "list" ? "bg-white shadow-sm text-primary" : ""}
                onClick={() => onViewModeChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <span className="text-gray-600">Showing {totalResults.toLocaleString()} universities</span>
        </div>
      </div>
    </section>
  );
}
