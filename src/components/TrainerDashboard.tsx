
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, TrendingUp, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import WorkoutPlanForm from '@/components/WorkoutPlanForm';
import NutritionPlanForm from '@/components/NutritionPlanForm';

const TrainerDashboard = () => {
  const { user, logout } = useAuth();
  const [clients] = useState([
    { 
      id: '1', 
      name: 'Alice Brown', 
      email: 'alice@email.com', 
      bodyType: 'Ectomorph',
      weight: 55,
      goal: 'Weight Gain',
      lastWorkout: '2024-01-15'
    },
    { 
      id: '2', 
      name: 'Bob Davis', 
      email: 'bob@email.com', 
      bodyType: 'Mesomorph',
      weight: 75,
      goal: 'Muscle Building',
      lastWorkout: '2024-01-14'
    },
    { 
      id: '3', 
      name: 'Carol White', 
      email: 'carol@email.com', 
      bodyType: 'Endomorph',
      weight: 68,
      goal: 'Weight Loss',
      lastWorkout: '2024-01-13'
    },
  ]);

  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trainer Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">Active clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Sessions planned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Average client adherence</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clients">My Clients</TabsTrigger>
            <TabsTrigger value="plans">Create Plans</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Client Management</CardTitle>
                    <CardDescription>Manage your assigned clients and their progress</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <Card key={client.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{client.name}</CardTitle>
                            <p className="text-sm text-gray-600">{client.email}</p>
                          </div>
                          <Badge variant="outline">{client.bodyType}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight:</span>
                            <span>{client.weight}kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Goal:</span>
                            <span>{client.goal}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Workout:</span>
                            <span>{client.lastWorkout}</span>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => setSelectedClient(client.id)}
                          >
                            Create Plan
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plans">
            <div className="grid lg:grid-cols-2 gap-6">
              <WorkoutPlanForm />
              <NutritionPlanForm />
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Client Progress Tracking</CardTitle>
                <CardDescription>Monitor your clients' progress and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{client.name}</h4>
                        <Badge>Active</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Workout Compliance</p>
                          <p className="font-semibold">85%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Nutrition Compliance</p>
                          <p className="font-semibold">78%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Progress Score</p>
                          <p className="font-semibold">82%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TrainerDashboard;
