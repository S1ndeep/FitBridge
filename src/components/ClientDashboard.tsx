import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, LogOut, CheckCircle, Target, AlertCircle, Clock, User, MessageCircle, Star, Crown, Zap, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import WorkoutPlan from '@/components/WorkoutPlan';
import NutritionPlan from '@/components/NutritionPlan';
import ProgressChart from '@/components/ProgressChart';
import FoodLog from '@/components/FoodLog';
import { Badge } from "@/components/ui/badge";
import SubscriptionFlow from '@/components/SubscriptionFlow';
import ChatInterface from '@/components/ChatInterface';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    isSubscribed: false,
    isVerified: false,
    plan: null as any,
    trainer: null as any,
    paymentDate: null as string | null,
    verificationStatus: 'pending' // 'pending', 'approved', 'rejected'
  });
  const [showSubscriptionFlow, setShowSubscriptionFlow] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [weeklyProgress] = useState({
    workoutsCompleted: 2,
    workoutsPlanned: 5,
    caloriesTarget: 2200,
    caloriesConsumed: 2050,
    waterIntake: 2.1,
    waterTarget: 2.5
  });

  // Mock subscription data - in real app, this would come from backend
  useEffect(() => {
    // Simulate checking subscription status
    const mockSubscription = localStorage.getItem(`subscription_${user?.id}`);
    if (mockSubscription) {
      const subscription = JSON.parse(mockSubscription);
      setSubscriptionStatus(subscription);
    }
  }, [user?.id]);

  // Basic workout content for non-subscribers
  const basicWorkouts = [
    { name: "Push-ups", sets: 3, reps: "10-15", description: "Basic upper body exercise" },
    { name: "Squats", sets: 3, reps: "15-20", description: "Lower body strength" },
    { name: "Plank", sets: 3, reps: "30-60 seconds", description: "Core strengthening" },
    { name: "Jumping Jacks", sets: 3, reps: "20", description: "Cardio warm-up" },
  ];

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      duration: 'month',
      icon: Star,
      gradient: 'from-blue-400 to-blue-600',
      features: [
        'Access to personal trainer',
        'Basic workout plans',
        'Nutrition guidelines',
        'Email support',
        'Monthly progress review'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 49,
      duration: 'month',
      popular: true,
      icon: Crown,
      gradient: 'from-purple-400 to-purple-600',
      features: [
        'Everything in Basic',
        'Custom workout & diet plans',
        'Weekly progress reviews',
        'Live chat support',
        'Video consultations',
        'Meal planning assistance'
      ]
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 79,
      duration: 'month',
      icon: Zap,
      gradient: 'from-orange-400 to-red-600',
      features: [
        'Everything in Premium',
        'Daily check-ins',
        '24/7 priority support',
        'Advanced analytics',
        'Supplement recommendations',
        'Group training sessions'
      ]
    }
  ];

  const handleSubscribe = (plan: any) => {
    setShowSubscriptionFlow(true);
  };

  const handleSubscriptionComplete = () => {
    setShowSubscriptionFlow(false);
    // Refresh subscription status
    const mockSubscription = localStorage.getItem(`subscription_${user?.id}`);
    if (mockSubscription) {
      const subscription = JSON.parse(mockSubscription);
      setSubscriptionStatus(subscription);
    }
  };

  const handleChatWithTrainer = () => {
    setShowChat(true);
  };

  const handleBackFromChat = () => {
    setShowChat(false);
  };

  if (showSubscriptionFlow) {
    return <SubscriptionFlow onComplete={handleSubscriptionComplete} />;
  }

  if (showChat && subscriptionStatus.verificationStatus === 'approved' && subscriptionStatus.trainer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl h-[calc(100vh-2rem)]">
          <ChatInterface 
            trainer={{
              ...subscriptionStatus.trainer,
              image: "/placeholder.svg"
            }}
            onBack={handleBackFromChat}
          />
        </div>
      </div>
    );
  }

  const renderSubscriptionStatus = () => {
    if (!subscriptionStatus.isSubscribed) {
      return null; // Plans are now shown in main content
    }

    if (subscriptionStatus.verificationStatus === 'pending') {
      return (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Waiting for admin verification.</strong> Your payment has been received and is being processed. You'll be notified once approved.
          </AlertDescription>
        </Alert>
      );
    }

    if (subscriptionStatus.verificationStatus === 'approved') {
      return (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Welcome to FitBridge Premium!</strong> Your subscription is active and you now have full access to your personalized fitness journey.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  const renderTrainerSection = () => {
    if (subscriptionStatus.verificationStatus === 'approved' && subscriptionStatus.trainer) {
      return (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Personal Trainer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img 
                src="/placeholder.svg" 
                alt={subscriptionStatus.trainer.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{subscriptionStatus.trainer.name}</h3>
                <p className="text-gray-600">{subscriptionStatus.trainer.specialization?.join(', ')}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {subscriptionStatus.trainer.experience} years experience
                  </Badge>
                  <Badge variant="outline">
                    ⭐ {subscriptionStatus.trainer.rating}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <Button 
                  onClick={handleChatWithTrainer}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Trainer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  const renderSubscriptionPlans = () => {
    if (subscriptionStatus.isSubscribed) return null;

    return (
      <div className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Fitness Plan</h2>
          <p className="text-lg text-gray-600">
            Subscribe to unlock personalized workouts, nutrition plans, and trainer support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.duration}</span>
                  </div>
                  <CardDescription>Perfect for your fitness journey</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full h-12 text-white font-semibold bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition-opacity`}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Fitness Journey</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
            {subscriptionStatus.isSubscribed && subscriptionStatus.plan && (
              <Badge className="mt-2 bg-green-100 text-green-800">
                {subscriptionStatus.plan.name} Plan Active
              </Badge>
            )}
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Subscription Status */}
        {renderSubscriptionStatus()}

        {/* Trainer Section */}
        {renderTrainerSection()}

        {/* Subscription Plans */}
        {renderSubscriptionPlans()}

        {/* Progress Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workouts This Week</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress.workoutsCompleted}/{weeklyProgress.workoutsPlanned}</div>
              <Progress value={(weeklyProgress.workoutsCompleted / weeklyProgress.workoutsPlanned) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Today</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress.caloriesConsumed}</div>
              <p className="text-xs text-muted-foreground">Target: {weeklyProgress.caloriesTarget}</p>
              <Progress value={(weeklyProgress.caloriesConsumed / weeklyProgress.caloriesTarget) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weeklyProgress.waterIntake}L</div>
              <p className="text-xs text-muted-foreground">Target: {weeklyProgress.waterTarget}L</p>
              <Progress value={(weeklyProgress.waterIntake / weeklyProgress.waterTarget) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {subscriptionStatus.verificationStatus === 'approved' ? '85%' : '40%'}
              </div>
              <p className="text-xs text-muted-foreground">
                {subscriptionStatus.verificationStatus === 'approved' ? 'Premium plan progress' : 'Basic plan progress'}
              </p>
              <Progress value={subscriptionStatus.verificationStatus === 'approved' ? 85 : 40} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="basic-workout" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic-workout">
              {subscriptionStatus.verificationStatus === 'approved' ? 'My Workouts' : 'Basic Workouts'}
            </TabsTrigger>
            <TabsTrigger value="nutrition">
              {subscriptionStatus.verificationStatus === 'approved' ? 'My Nutrition' : 'Basic Nutrition'}
            </TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="food-log">Food Log</TabsTrigger>
            {subscriptionStatus.verificationStatus === 'approved' && (
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="basic-workout">
            {subscriptionStatus.verificationStatus === 'approved' ? (
              <WorkoutPlan />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Workout Plan</CardTitle>
                  <CardDescription>General exercises to get you started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {basicWorkouts.map((exercise, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-white">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{exercise.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-600">Sets:</span>
                            <span className="font-semibold">{exercise.sets}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="text-gray-600">Reps:</span>
                            <span className="font-semibold">{exercise.reps}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!subscriptionStatus.isSubscribed && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Want personalized workouts?</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        Subscribe to get customized workout plans based on your body type, fitness level, and goals.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="nutrition">
            {subscriptionStatus.verificationStatus === 'approved' ? (
              <NutritionPlan />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Nutrition Guidelines</CardTitle>
                  <CardDescription>General healthy eating tips</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Daily Water Intake</h4>
                      <p className="text-gray-600">Aim for 8-10 glasses of water per day</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Balanced Meals</h4>
                      <p className="text-gray-600">Include proteins, carbohydrates, and healthy fats in each meal</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-white">
                      <h4 className="font-semibold mb-2">Portion Control</h4>
                      <p className="text-gray-600">Use smaller plates and listen to your hunger cues</p>
                    </div>
                  </div>
                  {!subscriptionStatus.isSubscribed && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Want a personalized nutrition plan?</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        Subscribe to get customized meal plans based on your body type, dietary preferences, and fitness goals.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid lg:grid-cols-2 gap-6">
              <ProgressChart />
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    {subscriptionStatus.verificationStatus === 'approved' 
                      ? 'Your premium fitness journey' 
                      : 'Your basic fitness journey'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold">2 Workouts Completed</p>
                        <p className="text-sm text-gray-600">This week</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">Food Tracking Started</p>
                        <p className="text-sm text-gray-600">Keep it up!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-semibold">Consistency Building</p>
                        <p className="text-sm text-gray-600">3 days active</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="food-log">
            <FoodLog />
          </TabsContent>

          {subscriptionStatus.verificationStatus === 'approved' && (
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                  <CardDescription>Manage your FitBridge subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-green-800">Active Subscription</h3>
                        <p className="text-sm text-green-600">
                          {subscriptionStatus.plan?.name} Plan - ${subscriptionStatus.plan?.price + (subscriptionStatus.trainer?.priceModifier || 0)}/month
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Plan Details</h4>
                        <p className="text-sm text-gray-600">Plan: {subscriptionStatus.plan?.name}</p>
                        <p className="text-sm text-gray-600">Trainer: {subscriptionStatus.trainer?.name}</p>
                        <p className="text-sm text-gray-600">Started: {subscriptionStatus.paymentDate}</p>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-semibold mb-2">Billing</h4>
                        <p className="text-sm text-gray-600">Next billing: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Amount: ${subscriptionStatus.plan?.price + (subscriptionStatus.trainer?.priceModifier || 0)}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="outline">Update Payment</Button>
                      <Button variant="destructive">Cancel Subscription</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;
