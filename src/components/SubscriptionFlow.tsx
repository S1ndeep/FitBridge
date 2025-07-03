
import React, { useState } from 'react';
import SubscriptionPlans from './SubscriptionPlans';
import TrainerSelection from './TrainerSelection';
import PaymentForm from './PaymentForm';
import PaymentConfirmation from './PaymentConfirmation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

interface Trainer {
  id: string;
  name: string;
  experience: number;
  specialization: string[];
  rating: number;
  reviews: number;
  priceModifier: number;
  image: string;
  bio: string;
  certifications: string[];
}

interface SubscriptionFlowProps {
  onComplete: () => void;
}

const SubscriptionFlow: React.FC<SubscriptionFlowProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'plans' | 'trainers' | 'payment' | 'confirmation'>('plans');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentStep('trainers');
  };

  const handleTrainerSelect = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    // Process payment after user confirms manual payment
    const subscriptionData = {
      isSubscribed: true,
      isVerified: false,
      plan: selectedPlan,
      trainer: selectedTrainer,
      paymentDate: new Date().toISOString(),
      verificationStatus: 'pending',
      totalAmount: (selectedPlan?.price || 0) + (selectedTrainer?.priceModifier || 0)
    };

    // Save to localStorage (in real app, this would be saved to backend)
    localStorage.setItem(`subscription_${user?.id}`, JSON.stringify(subscriptionData));

    // Notify admin (in real app, this would send a notification to admin)
    const adminNotifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    adminNotifications.push({
      id: Date.now().toString(),
      type: 'new_subscription',
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
      plan: selectedPlan?.name,
      trainer: selectedTrainer?.name,
      amount: subscriptionData.totalAmount,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('admin_notifications', JSON.stringify(adminNotifications));

    toast({
      title: "Payment Submitted",
      description: "Your payment has been submitted for verification!",
    });

    setCurrentStep('confirmation');
  };

  const handleConfirmationContinue = () => {
    onComplete();
  };

  if (currentStep === 'plans') {
    return <SubscriptionPlans onSelectPlan={handlePlanSelect} />;
  }

  if (currentStep === 'trainers' && selectedPlan) {
    return (
      <TrainerSelection 
        basePlanPrice={selectedPlan.price} 
        onSelectTrainer={handleTrainerSelect}
      />
    );
  }

  if (currentStep === 'payment' && selectedPlan && selectedTrainer) {
    return (
      <PaymentForm
        plan={selectedPlan}
        trainer={selectedTrainer}
        totalAmount={(selectedPlan.price) + selectedTrainer.priceModifier}
        onPaymentSubmit={handlePaymentSubmit}
      />
    );
  }

  if (currentStep === 'confirmation' && selectedPlan && selectedTrainer) {
    return (
      <PaymentConfirmation
        plan={selectedPlan}
        trainer={selectedTrainer}
        totalAmount={(selectedPlan.price) + selectedTrainer.priceModifier}
        onContinue={handleConfirmationContinue}
      />
    );
  }

  return null;
};

export default SubscriptionFlow;
