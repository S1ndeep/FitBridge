
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap, LucideIcon } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  icon: LucideIcon;
  gradient: string;
}

interface SubscriptionPlansProps {
  onSelectPlan: (plan: Plan) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ onSelectPlan }) => {
  const plans: Plan[] = [
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

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Fitness Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan that matches your fitness goals and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
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
                  <CardDescription>Perfect for getting started</CardDescription>
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
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full h-12 text-white font-semibold bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition-opacity`}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include a 7-day money-back guarantee</p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ No setup fees</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
