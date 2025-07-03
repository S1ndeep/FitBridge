
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, User, DollarSign } from 'lucide-react';
import { HoverRevealButton } from "@/components/ui/hover-reveal-button";

interface PaymentConfirmationProps {
  plan: {
    name: string;
    price: number;
  };
  trainer: {
    name: string;
    priceModifier: number;
  };
  totalAmount: number;
  onContinue: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ 
  plan, 
  trainer, 
  totalAmount, 
  onContinue 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Thank you for your payment! Your request is being verified by the admin.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{plan.name} (${plan.price}/month)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trainer:</span>
                <span className="font-semibold">{trainer.name} (+${trainer.priceModifier}/month)</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">${totalAmount}/month</span>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-2">
                  Waiting for Admin Verification
                </h4>
                <p className="text-amber-700 mb-3">
                  Your payment has been processed successfully. Our admin team is now reviewing your subscription request. This typically takes 2-4 hours during business hours.
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• You will receive an email confirmation once approved</li>
                  <li>• Your trainer will be notified and will reach out to you</li>
                  <li>• Full access to your personalized dashboard will be activated</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h4>
            <div className="space-y-3 text-blue-700">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <span>Admin verifies your payment and subscription details</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <span>Your selected trainer receives notification and prepares your plan</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span>You gain access to personalized workouts, nutrition plans, and trainer chat</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="text-center pt-4">
            <HoverRevealButton
              icon={User}
              text="Go to Dashboard"
              onClick={onContinue}
              variant="cta"
              size="lg"
              className="px-8"
              direction="right"
            />
            
            <p className="text-sm text-gray-600 mt-4">
              You can check your verification status on your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfirmation;
