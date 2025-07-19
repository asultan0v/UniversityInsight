import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Bookmark } from "lucide-react";
import { University } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UniversityCardProps {
  university: University;
  onClick: () => void;
}

export function UniversityCard({ university, onClick }: UniversityCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(university.isBookmarked === 1);
  const { toast } = useToast();

  const getAcceptanceRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate <= 10) return "text-error";
    if (numRate <= 30) return "text-warning";
    return "text-success";
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await apiRequest("POST", `/api/universities/${university.id}/bookmark`);
      setIsBookmarked(!isBookmarked);
      queryClient.invalidateQueries({ queryKey: ["/api/universities"] });
      toast({
        title: isBookmarked ? "Bookmark removed" : "Bookmark added",
        description: isBookmarked 
          ? `${university.name} removed from bookmarks`
          : `${university.name} added to bookmarks`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden cursor-pointer">
      <div onClick={onClick}>
        <img 
          src={university.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
          alt={`${university.name} campus`} 
          className="w-full h-48 object-cover"
        />
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{university.name}</h3>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{university.location}</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`${isBookmarked ? "text-warning" : "text-gray-400 hover:text-warning"} transition-colors duration-200`}
              onClick={handleBookmarkClick}
            >
              <Bookmark className="h-5 w-5" fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-primary">#{university.worldRanking}</div>
              <div className="text-sm text-gray-600">World Ranking</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${getAcceptanceRateColor(university.acceptanceRate || "0")}`}>
                {university.acceptanceRate}%
              </div>
              <div className="text-sm text-gray-600">Acceptance Rate</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Annual Tuition:</span>
              <span className="font-semibold">{university.tuitionFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Student Population:</span>
              <span className="font-semibold">{university.studentPopulation?.toLocaleString()}</span>
            </div>
          </div>
          
          <Button className="w-full bg-primary text-white hover:bg-blue-700 transition-colors duration-200 font-medium">
            View Details
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}
