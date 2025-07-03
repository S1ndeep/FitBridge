
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, QrCode, CreditCard, DollarSign, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentFormProps {
  plan: {
    name: string;
    price: number;
  };
  trainer: {
    name: string;
    priceModifier: number;
  };
  totalAmount: number;
  onPaymentSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  plan, 
  trainer, 
  totalAmount, 
  onPaymentSubmit 
}) => {
  const { toast } = useToast();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Fake banking details
  const bankingDetails = {
    accountName: "FitBridge Fitness Solutions",
    accountNumber: "1234567890123456",
    ifscCode: "FITB0001234",
    bankName: "FitBridge Bank",
    upiId: "fitbridge@upi"
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleConfirmPayment = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      onPaymentSubmit();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Payment Details */}
        <Card className="bg-white shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Complete Your Payment
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Transfer the amount using the details below
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">{plan.name} (${plan.price}/month)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Trainer:</span>
                  <span className="font-semibold">{trainer.name} (+${trainer.priceModifier}/month)</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-xl font-bold">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">${totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bank Transfer Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Account Name</p>
                    <p className="font-semibold">{bankingDetails.accountName}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyToClipboard(bankingDetails.accountName, "Account Name")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Account Number</p>
                    <p className="font-semibold font-mono">{bankingDetails.accountNumber}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyToClipboard(bankingDetails.accountNumber, "Account Number")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">IFSC Code</p>
                    <p className="font-semibold font-mono">{bankingDetails.ifscCode}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyToClipboard(bankingDetails.ifscCode, "IFSC Code")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Bank Name</p>
                    <p className="font-semibold">{bankingDetails.bankName}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyToClipboard(bankingDetails.bankName, "Bank Name")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* UPI Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">UPI Payment</h3>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">UPI ID</p>
                  <p className="font-semibold font-mono">{bankingDetails.upiId}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyToClipboard(bankingDetails.upiId, "UPI ID")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Important Note */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important:</strong> Please include your email ID in the transfer remarks/description for faster processing.
              </AlertDescription>
            </Alert>

            {/* Confirm Payment Button */}
            <div className="pt-4">
              <Button
                onClick={handleConfirmPayment}
                disabled={paymentConfirmed}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
              >
                {paymentConfirmed ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Payment Confirmed
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    I Have Made the Payment
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-600 text-center mt-2">
                Click this button after completing the payment transfer
              </p>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <Card className="bg-white shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <QrCode className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Quick Payment
            </CardTitle>
            <CardDescription>
              Scan QR code for instant UPI payment
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">QR Code for</p>
                  <p className="font-semibold text-purple-600">${totalAmount}</p>
                  <p className="text-xs text-gray-500 mt-2">Scan with any UPI app</p>
                </div>
              </div>
            </div>

            {/* Payment Apps */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Supported Payment Apps:</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600">GPay</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600">PhonePe</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600">Paytm</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Payment Instructions:</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Open your UPI app</li>
                <li>2. Scan the QR code above</li>
                <li>3. Verify the amount (${totalAmount})</li>
                <li>4. Complete the payment</li>
                <li>5. Click "I Have Made the Payment" button</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;
