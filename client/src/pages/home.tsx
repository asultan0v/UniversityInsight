import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchFilters } from "@/components/search-filters";
import { UniversityCard } from "@/components/university-card";
import { University } from "@shared/schema";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    country: "All Countries",
    ranking: "All Rankings",
    tuitionRange: "All Tuition Ranges",
    sortBy: "Ranking (Best First)",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [suggestions, setSuggestions] = useState<University[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const limit = 9;

  // Build query params
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
    limit: limit.toString(),
  });

  if (searchQuery) queryParams.append("search", searchQuery);
  if (filters.country !== "All Countries") queryParams.append("country", filters.country);
  if (filters.ranking !== "All Rankings") queryParams.append("ranking", filters.ranking);
  if (filters.tuitionRange !== "All Tuition Ranges") queryParams.append("tuitionRange", filters.tuitionRange);
  if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);

  const { data, isLoading } = useQuery({
    queryKey: ["/api/universities", queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/universities?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch universities");
      return response.json();
    },
  });

  // Search suggestions
  useEffect(() => {
    if (searchQuery.length > 2) {
      fetch(`/api/universities/search/${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch(() => setSuggestions([]));
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setShowSuggestions(false);
  };

  const handleUniversityClick = (university: University) => {
    setLocation(`/university/${university.id}`);
  };

  const handleSuggestionClick = (suggestion: University) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect University</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Search through thousands of universities worldwide. Compare rankings, tuition fees, acceptance rates, and more.
          </p>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white rounded-xl shadow-lg p-2 flex items-center">
              <div className="flex-1 flex items-center relative">
                <Search className="text-gray-400 ml-4 mr-3 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search universities, programs, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 p-3 text-gray-900 border-0 focus-visible:ring-0 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                
                {/* Search suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-2">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="p-3 hover:bg-gray-50 rounded cursor-pointer flex items-center"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Search className="text-gray-400 mr-3 h-4 w-4" />
                          <span className="text-gray-900">{suggestion.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-primary text-white px-8 py-3 hover:bg-blue-700 font-semibold"
              >
                Search
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">🏆 Top Rankings</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">💰 Tuition Info</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">📊 Acceptance Rates</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🌍 Global Coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <SearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        totalResults={data?.total || 0}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : data && data.universities.length > 0 ? (
          <>
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" 
              : "space-y-6 mb-8"
            }>
              {data.universities.map((university: University) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  onClick={() => handleUniversityClick(university)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  if (totalPages <= 5) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        className={currentPage === pageNum ? "bg-primary text-white" : ""}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  return null;
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-400">...</span>
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
