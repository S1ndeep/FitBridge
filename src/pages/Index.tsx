import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Dumbbell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AdminDashboard from '@/components/AdminDashboard';
import TrainerDashboard from '@/components/TrainerDashboard';
import ClientDashboard from '@/components/ClientDashboard';
import LandingPage from '@/components/LandingPage';
import SubscriptionFlow from '@/components/SubscriptionFlow';

const Index = () => {
  const { user, login, register } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'client' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'client'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password, loginData.role as 'admin' | 'trainer' | 'client');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(registerData.email, registerData.password, registerData.name, registerData.role as 'admin' | 'trainer' | 'client');
  };

  const handleShowSubscription = () => {
    if (!user) {
      // If user is not logged in, show auth first
      setShowAuth(true);
      return;
    }
    setShowSubscription(true);
  };

  const handleSubscriptionComplete = () => {
    setShowSubscription(false);
    // Refresh the page or redirect to dashboard
    window.location.reload();
  };

  if (user) {
    if (showSubscription) {
      return <SubscriptionFlow onComplete={handleSubscriptionComplete} />;
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {user.role === 'admin' && <AdminDashboard />}
        {user.role === 'trainer' && <TrainerDashboard />}
        {user.role === 'client' && <ClientDashboard />}
      </div>
    );
  }

  if (!showAuth) {
    return <LandingPage onShowAuth={() => setShowAuth(true)} onShowSubscription={handleShowSubscription} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-8">
        {/* Back to Landing Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowAuth(false)}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 text-white">
          <div className="flex items-center justify-center mb-4">
            <Dumbbell className="h-12 w-12 mr-3" />
            <h1 className="text-5xl font-bold">FitBridge</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of users transforming their fitness journey
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="bg-white/95 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-center">Welcome to FitBridge</CardTitle>
              <CardDescription className="text-center">Login or create your account to subscribe</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="login-role">Role</Label>
                      <Select value={loginData.role} onValueChange={(value) => setLoginData({ ...loginData, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="trainer">Trainer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Login
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="register-role">Role</Label>
                      <Select value={registerData.role} onValueChange={(value) => setRegisterData({ ...registerData, role: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client</SelectItem>
                          <SelectItem value="trainer">Trainer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Register
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 max-w-md mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-sm">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>Admin:</strong> admin@fitbridge.com / admin123</p>
              <p><strong>Trainer:</strong> trainer@fitbridge.com / trainer123</p>
              <p><strong>Client:</strong> client@fitbridge.com / client123</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
