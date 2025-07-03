
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, TrendingUp, LogOut, CreditCard, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [trainers, setTrainers] = useState<any[]>([]);
  const [subscriptionRequests, setSubscriptionRequests] = useState<any[]>([]);
  const [clients] = useState([
    { id: '1', name: 'Alice Brown', trainer: 'John Smith', status: 'active' },
    { id: '2', name: 'Bob Davis', trainer: 'Mike Wilson', status: 'active' },
    { id: '3', name: 'Carol White', trainer: 'John Smith', status: 'inactive' },
  ]);

  // Load trainers from localStorage and demo data
  useEffect(() => {
    const demoTrainers = [
      { id: '2', name: 'John Trainer', email: 'trainer@fitbridge.com', status: 'approved', clients: 5, approved: true },
    ];

    const registeredUsers = localStorage.getItem('fitbridge_registered_users');
    const registered = registeredUsers ? JSON.parse(registeredUsers) : [];
    const registeredTrainers = registered
      .filter((u: any) => u.role === 'trainer')
      .map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        status: u.approved ? 'approved' : 'pending',
        clients: 0,
        approved: u.approved
      }));

    setTrainers([...demoTrainers, ...registeredTrainers]);

    // Load subscription requests
    const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    const subscriptions = notifications.filter((n: any) => n.type === 'new_subscription');
    setSubscriptionRequests(subscriptions);
  }, []);

  const approveTrainer = (trainerId: string) => {
    // Update local state
    setTrainers(prev => prev.map(trainer => 
      trainer.id === trainerId 
        ? { ...trainer, status: 'approved', approved: true }
        : trainer
    ));

    const registeredUsers = localStorage.getItem('fitbridge_registered_users');
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers);
      const updatedUsers = users.map((u: any) => 
        u.id === trainerId ? { ...u, approved: true } : u
      );
      localStorage.setItem('fitbridge_registered_users', JSON.stringify(updatedUsers));
    }

    toast({
      title: "Trainer Approved",
      description: "The trainer has been approved and can now log in.",
    });
  };

  const approveSubscription = (requestId: string) => {
    // Find the subscription request
    const request = subscriptionRequests.find(r => r.id === requestId);
    if (!request) return;

    // Update user's subscription status
    const existingSubscription = localStorage.getItem(`subscription_${request.userId}`);
    if (existingSubscription) {
      const subscription = JSON.parse(existingSubscription);
      subscription.verificationStatus = 'approved';
      subscription.isVerified = true;
      localStorage.setItem(`subscription_${request.userId}`, JSON.stringify(subscription));
    }

    // Update the request status
    setSubscriptionRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' }
        : req
    ));

    // Update admin notifications
    const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    const updatedNotifications = notifications.map((n: any) => 
      n.id === requestId ? { ...n, status: 'approved' } : n
    );
    localStorage.setItem('admin_notifications', JSON.stringify(updatedNotifications));

    toast({
      title: "Subscription Approved",
      description: "The client's subscription has been approved and activated.",
    });
  };

  const rejectSubscription = (requestId: string) => {
    // Find the subscription request
    const request = subscriptionRequests.find(r => r.id === requestId);
    if (!request) return;

    // Update user's subscription status
    const existingSubscription = localStorage.getItem(`subscription_${request.userId}`);
    if (existingSubscription) {
      const subscription = JSON.parse(existingSubscription);
      subscription.verificationStatus = 'rejected';
      subscription.isVerified = false;
      localStorage.setItem(`subscription_${request.userId}`, JSON.stringify(subscription));
    }

    // Update the request status
    setSubscriptionRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' }
        : req
    ));

    // Update admin notifications
    const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    const updatedNotifications = notifications.map((n: any) => 
      n.id === requestId ? { ...n, status: 'rejected' } : n
    );
    localStorage.setItem('admin_notifications', JSON.stringify(updatedNotifications));

    toast({
      title: "Subscription Rejected",
      description: "The client's subscription has been rejected.",
      variant: "destructive"
    });
  };

  const pendingTrainerCount = trainers.filter(t => t.status === 'pending').length;
  const pendingSubscriptionCount = subscriptionRequests.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trainers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trainers.length}</div>
              <p className="text-xs text-muted-foreground">Registered trainers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">Registered clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTrainerCount}</div>
              <p className="text-xs text-muted-foreground">Trainer approvals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Requests</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSubscriptionCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Trainer Management */}
          <Card>
            <CardHeader>
              <CardTitle>Trainer Management</CardTitle>
              <CardDescription>Approve or manage gym trainers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainers.map((trainer) => (
                  <div key={trainer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{trainer.name}</h4>
                      <p className="text-sm text-gray-600">{trainer.email}</p>
                      <p className="text-xs text-gray-500">{trainer.clients} clients</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={trainer.status === 'approved' ? 'default' : 'secondary'}>
                        {trainer.status}
                      </Badge>
                      {trainer.status === 'pending' && (
                        <Button size="sm" onClick={() => approveTrainer(trainer.id)}>
                          Approve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clients Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Client Overview</CardTitle>
              <CardDescription>Monitor all registered clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{client.name}</h4>
                      <p className="text-sm text-gray-600">Trainer: {client.trainer}</p>
                    </div>
                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                      {client.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Verification
            </CardTitle>
            <CardDescription>Review and approve client subscription payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No subscription requests pending</p>
              ) : (
                subscriptionRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{request.userName}</h4>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{request.userEmail}</p>
                      <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                        <div>
                          <span className="text-gray-500">Plan:</span> {request.plan}
                        </div>
                        <div>
                          <span className="text-gray-500">Trainer:</span> {request.trainer}
                        </div>
                        <div>
                          <span className="text-gray-500">Amount:</span> ${request.amount}/month
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span> {new Date(request.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          size="sm" 
                          onClick={() => approveSubscription(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => rejectSubscription(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    
                    {request.status === 'approved' && (
                      <div className="ml-4">
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                    )}
                    
                    {request.status === 'rejected' && (
                      <div className="ml-4">
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
