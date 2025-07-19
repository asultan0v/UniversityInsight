import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { MapPin, Phone, Globe, Bookmark, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { University } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function UniversityDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/university/:id");
  const { toast } = useToast();
  
  const universityId = params?.id ? parseInt(params.id) : null;
  
  const { data: university, isLoading } = useQuery({
    queryKey: ["/api/universities", universityId],
    queryFn: async () => {
      if (!universityId) throw new Error("Invalid university ID");
      const response = await fetch(`/api/universities/${universityId}`);
      if (!response.ok) throw new Error("University not found");
      return response.json();
    },
    enabled: !!universityId,
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!universityId) throw new Error("Invalid university ID");
      return apiRequest("POST", `/api/universities/${universityId}/bookmark`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/universities", universityId] });
      queryClient.invalidateQueries({ queryKey: ["/api/universities"] });
      toast({
        title: university?.isBookmarked ? "Bookmark removed" : "Bookmark added",
        description: university?.isBookmarked 
          ? `${university.name} removed from bookmarks`
          : `${university.name} added to bookmarks`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      });
    },
  });

  if (!match || !universityId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">University not found</h1>
          <Button onClick={() => setLocation("/")}>Return to Search</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">University not found</h1>
          <Button onClick={() => setLocation("/")}>Return to Search</Button>
        </div>
      </div>
    );
  }

  const getAcceptanceRateColor = (rate: string) => {
    const numRate = parseFloat(rate);
    if (numRate <= 10) return "text-error";
    if (numRate <= 30) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* University Image */}
            <img 
              src={university.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400"} 
              alt={`${university.name} campus`} 
              className="w-full h-64 object-cover rounded-t-lg" 
            />
            
            <div className="p-6">
              {/* University Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{university.name}</h1>
                  <p className="text-gray-600 flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    {university.location}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${university.isBookmarked ? "text-warning" : "text-gray-400 hover:text-warning"} transition-colors duration-200`}
                  onClick={() => bookmarkMutation.mutate()}
                  disabled={bookmarkMutation.isPending}
                >
                  <Bookmark className="h-6 w-6" fill={university.isBookmarked ? "currentColor" : "none"} />
                </Button>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">#{university.worldRanking}</div>
                  <div className="text-gray-600">World Ranking</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className={`text-3xl font-bold mb-2 ${getAcceptanceRateColor(university.acceptanceRate || "0")}`}>
                    {university.acceptanceRate}%
                  </div>
                  <div className="text-gray-600">Acceptance Rate</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-success mb-2">{university.tuitionFee}</div>
                  <div className="text-gray-600">Annual Tuition</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-secondary mb-2">{university.studentPopulation?.toLocaleString()}</div>
                  <div className="text-gray-600">Students</div>
                </div>
              </div>
              
              {/* Detailed Information Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="admissions">Admissions</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                  <TabsTrigger value="campus">Campus Life</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {university.description}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Facts</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Founded:</span>
                          <span className="font-medium">{university.founded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{university.type}</span>
                        </div>
                        {university.endowment && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Endowment:</span>
                            <span className="font-medium">{university.endowment}</span>
                          </div>
                        )}
                        {university.studentFacultyRatio && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Student-Faculty Ratio:</span>
                            <span className="font-medium">{university.studentFacultyRatio}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                      <div className="space-y-3">
                        {university.address && (
                          <div className="flex items-start">
                            <MapPin className="text-gray-400 mt-1 mr-3 h-4 w-4" />
                            <span className="text-gray-600">{university.address}</span>
                          </div>
                        )}
                        {university.phone && (
                          <div className="flex items-center">
                            <Phone className="text-gray-400 mr-3 h-4 w-4" />
                            <span className="text-gray-600">{university.phone}</span>
                          </div>
                        )}
                        {university.website && (
                          <div className="flex items-center">
                            <Globe className="text-gray-400 mr-3 h-4 w-4" />
                            <a href={`https://${university.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {university.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="admissions" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Admission Requirements</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Acceptance Rate:</span>
                          <span className={`font-medium ${getAcceptanceRateColor(university.acceptanceRate || "0")}`}>
                            {university.acceptanceRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application Deadline:</span>
                          <span className="font-medium">January 1st</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Required Tests:</span>
                          <span className="font-medium">SAT/ACT</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application Fee:</span>
                          <span className="font-medium">$75</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Early Decision:</span>
                          <span className="font-medium">Available</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">International Students:</span>
                          <span className="font-medium">Welcome</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="programs" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Programs</h3>
                    {university.programs && university.programs.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {university.programs.map((program, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <span className="font-medium">{program}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Program information will be available soon.</p>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="campus" className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Campus Life</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Experience a vibrant campus community with numerous opportunities for academic, social, and personal growth.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Student Life</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Student Organizations: 400+</li>
                          <li>• Campus Housing Available</li>
                          <li>• Dining Plans Offered</li>
                          <li>• Recreation Center</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Support Services</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Academic Advising</li>
                          <li>• Career Services</li>
                          <li>• Health & Wellness</li>
                          <li>• International Student Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="bg-gray-50 mt-6 p-4 rounded-lg flex justify-between items-center">
          <Button
            variant="outline"
            className="flex items-center text-warning border-warning hover:bg-warning/10"
            onClick={() => bookmarkMutation.mutate()}
            disabled={bookmarkMutation.isPending}
          >
            <Bookmark className="h-4 w-4 mr-2" fill={university.isBookmarked ? "currentColor" : "none"} />
            {university.isBookmarked ? "Bookmarked" : "Bookmark University"}
          </Button>
          <div className="space-x-3">
            <Button variant="outline">
              Compare
            </Button>
            <Button className="bg-primary text-white hover:bg-blue-700">
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
