import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dumbbell, Target, Users, TrendingUp, Star, Heart, Award, CheckCircle, Play, Quote } from 'lucide-react';
import { HoverRevealButton } from "@/components/ui/hover-reveal-button";

interface LandingPageProps {
  onShowAuth: () => void;
  onShowSubscription?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowAuth, onShowSubscription }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8 animate-fade-in-scale">
              <Dumbbell className="h-16 w-16 mr-4 animate-pulse" />
              <h1 className="text-6xl md:text-7xl font-bold">FitBridge</h1>
            </div>
            
            <p className="text-2xl md:text-3xl mb-8 opacity-90 animate-slide-in-down">
              Transform Your Fitness Journey with Personalized Training
            </p>
            
            <p className="text-lg md:text-xl mb-12 opacity-80 max-w-2xl mx-auto animate-fade-in">
              Connect with certified trainers, get custom workout plans, track your nutrition, 
              and achieve your fitness goals with our affordable personal training platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-right">
              <HoverRevealButton
                icon={Play}
                text="Start Your Journey"
                onClick={onShowSubscription || (() => {})}
                variant="cta"
                size="lg"
                className="px-8 py-4 text-lg"
                direction="right"
              />
              
              <HoverRevealButton
                icon={Users}
                text="Login / Register"
                onClick={onShowAuth}
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg"
                direction="right"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              FitBridge combines cutting-edge technology with human expertise to deliver 
              personalized fitness solutions that actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Weekly Workout Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Get personalized workout routines designed specifically for your body type, 
                  fitness level, and goals. Updated weekly to keep you challenged and engaged.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Nutrition Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Track your meals with our integrated nutrition API. Get personalized 
                  meal plans and dietary recommendations based on your fitness goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Personal Coaching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-lg">
                  Connect directly with certified personal trainers through our platform. 
                  Get real-time support, motivation, and expert guidance on your journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-lg px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600">
              Our Mission
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Making Fitness Accessible to Everyone
            </h2>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              At FitBridge, we believe that everyone deserves access to quality personal training 
              and nutrition guidance, regardless of their budget or location. Our platform connects 
              you with certified trainers who understand your unique needs and create personalized 
              plans that fit your lifestyle.
            </p>
            
            <p className="text-lg text-gray-600 mb-12">
              We're revolutionizing the fitness industry by combining the expertise of professional 
              trainers with the convenience and affordability of modern technology.
            </p>
            
            <HoverRevealButton
              icon={Award}
              text="Join Our Community"
              onClick={onShowSubscription || (() => {})}
              variant="cta"
              size="lg"
              className="px-8 py-4 text-lg"
              direction="right"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose FitBridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another fitness app. We're your complete fitness ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Personalized Approach",
                description: "Every plan is tailored to your specific body type, goals, and preferences."
              },
              {
                icon: Users,
                title: "Expert Trainers",
                description: "Work with certified professionals who care about your success."
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "Our members see real, measurable progress in their fitness journey."
              },
              {
                icon: Heart,
                title: "Affordable Pricing",
                description: "Get premium personal training at a fraction of traditional costs."
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <CardContent className="pt-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:animate-pulse">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who transformed their lives with FitBridge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Busy Professional",
                rating: 5,
                content: "FitBridge changed my life! Having a personal trainer who understands my busy schedule made all the difference. I've lost 25 pounds and feel stronger than ever!"
              },
              {
                name: "Mike Chen",
                role: "College Student",
                rating: 5,
                content: "As a student on a budget, FitBridge was perfect. The personalized workouts and nutrition guidance helped me build muscle and confidence. The trainers are amazing!"
              },
              {
                name: "Lisa Rodriguez",
                role: "Working Mom",
                rating: 5,
                content: "Finally, a fitness solution that works around my schedule! The trainers are so supportive, and the meal planning has been a game-changer for our whole family."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-blue-500 mb-4" />
                    <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join thousands of people who have already started their journey with FitBridge. 
            Your transformation starts today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <HoverRevealButton
              icon={CheckCircle}
              text="Choose Your Plan"
              onClick={onShowSubscription || (() => {})}
              variant="secondary"
              size="lg"
              className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100"
              direction="right"
            />
            
            <HoverRevealButton
              icon={Users}
              text="Sign Up Free"
              onClick={onShowAuth}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white/10"
              direction="right"
            />
          </div>
          
          <p className="text-sm opacity-70 mt-8">
            ✓ 7-day money-back guarantee  ✓ Cancel anytime  ✓ No setup fees
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
