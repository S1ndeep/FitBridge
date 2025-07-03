
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'trainer' | 'client';
  approved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'admin' | 'trainer' | 'client') => void;
  register: (email: string, password: string, name: string, role: 'admin' | 'trainer' | 'client') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Demo users for testing - now includes approval status
  const demoUsers = [
    { id: '1', email: 'admin@fitbridge.com', password: 'admin123', name: 'Admin User', role: 'admin' as const, approved: true },
    { id: '2', email: 'trainer@fitbridge.com', password: 'trainer123', name: 'John Trainer', role: 'trainer' as const, approved: true },
    { id: '3', email: 'client@fitbridge.com', password: 'client123', name: 'Jane Client', role: 'client' as const, approved: true },
    { id: '4', email: 'pending@fitbridge.com', password: 'pending123', name: 'Pending Trainer', role: 'trainer' as const, approved: false },
  ];

  // Load registered users from localStorage
  const getRegisteredUsers = () => {
    const stored = localStorage.getItem('fitbridge_registered_users');
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUsers = (users: any[]) => {
    localStorage.setItem('fitbridge_registered_users', JSON.stringify(users));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('fitbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string, role: 'admin' | 'trainer' | 'client') => {
    // Check demo users first
    const foundDemoUser = demoUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );

    // Check registered users
    const registeredUsers = getRegisteredUsers();
    const foundRegisteredUser = registeredUsers.find(
      (u: any) => u.email === email && u.password === password && u.role === role
    );

    const foundUser = foundDemoUser || foundRegisteredUser;

    if (foundUser) {
      // Check if trainer needs approval
      if (foundUser.role === 'trainer' && !foundUser.approved) {
        toast({
          title: "Account Under Verification",
          description: "Your account is under verification. Please wait for Admin approval.",
          variant: "destructive",
        });
        return;
      }

      const user = { 
        id: foundUser.id, 
        email: foundUser.email, 
        name: foundUser.name, 
        role: foundUser.role,
        approved: foundUser.approved 
      };
      setUser(user);
      localStorage.setItem('fitbridge_user', JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please check your email, password, and role.",
        variant: "destructive",
      });
    }
  };

  const register = (email: string, password: string, name: string, role: 'admin' | 'trainer' | 'client') => {
    const registeredUsers = getRegisteredUsers();
    
    // Check if user already exists
    const existingDemoUser = demoUsers.find(u => u.email === email);
    const existingRegisteredUser = registeredUsers.find((u: any) => u.email === email);
    
    if (existingDemoUser || existingRegisteredUser) {
      toast({
        title: "Registration failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
      password,
      approved: role === 'client' ? true : false // Clients are auto-approved, trainers need approval
    };
    
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    if (role === 'client') {
      // Auto-login clients
      const user = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        approved: true
      };
      setUser(user);
      localStorage.setItem('fitbridge_user', JSON.stringify(user));
      toast({
        title: "Registration successful",
        description: `Welcome to FitBridge, ${name}!`,
      });
    } else if (role === 'trainer') {
      toast({
        title: "Registration submitted",
        description: "Your trainer account has been submitted for approval. You'll be notified once approved.",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitbridge_user');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
