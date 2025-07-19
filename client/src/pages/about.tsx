import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GraduationCap, Globe, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About UniSearch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students worldwide to discover their perfect educational journey through comprehensive university research and comparison.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                UniSearch was created to democratize access to higher education information. We believe every student deserves to find the university that best matches their aspirations, regardless of their background or location.
              </p>
              <p className="text-lg text-gray-600">
                Our platform provides comprehensive, accurate, and up-to-date information about universities worldwide, helping students make informed decisions about their educational future.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600 text-sm">Universities from every continent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">For Everyone</h3>
                  <p className="text-gray-600 text-sm">Accessible to all students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Data</h3>
                  <p className="text-gray-600 text-sm">Verified and updated regularly</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <GraduationCap className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Student-First</h3>
                  <p className="text-gray-600 text-sm">Designed with students in mind</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Founder</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold">SA</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Sultanov Amirbek</h3>
                  <p className="text-blue-100 text-lg mb-6">CEO & Founder</p>
                  <p className="text-center text-blue-50 max-w-2xl leading-relaxed">
                    Passionate about democratizing education and making university information accessible to students worldwide. 
                    Sultanov founded UniSearch with the vision of helping every student discover their ideal educational path through technology and comprehensive data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose UniSearch?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Database</h3>
              <p className="text-gray-600">Access detailed information about universities from around the world, including rankings, tuition, and programs.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Friendly Interface</h3>
              <p className="text-gray-600">Intuitive search and filtering tools make it easy to find universities that match your specific criteria.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Free</h3>
              <p className="text-gray-600">Our platform is completely free to use, ensuring that financial barriers never prevent access to education information.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}