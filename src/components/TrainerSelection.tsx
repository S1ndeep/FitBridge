
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Calendar, DollarSign } from 'lucide-react';

interface Trainer {
  id: string;
  name: string;
  experience: number;
  specialization: string[];
  rating: number;
  reviews: number;
  priceModifier: number; // Additional cost per month
  image: string;
  bio: string;
  certifications: string[];
}

interface TrainerSelectionProps {
  basePlanPrice: number;
  onSelectTrainer: (trainer: Trainer) => void;
}

const TrainerSelection: React.FC<TrainerSelectionProps> = ({ basePlanPrice, onSelectTrainer }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const trainers: Trainer[] = [
    {
      id: 'john-smith',
      name: 'John Smith',
      experience: 5,
      specialization: ['Weight Loss', 'Strength Training', 'Nutrition'],
      rating: 4.8,
      reviews: 124,
      priceModifier: 0,
      image: '/placeholder.svg',
      bio: 'Certified personal trainer specializing in weight loss and strength training. Helped over 200 clients achieve their fitness goals.',
      certifications: ['NASM-CPT', 'Nutrition Specialist']
    },
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      experience: 8,
      specialization: ['Yoga', 'Flexibility', 'Mind-Body', 'Weight Loss'],
      rating: 4.9,
      reviews: 89,
      priceModifier: 15,
      image: '/placeholder.svg',
      bio: 'Expert in holistic fitness approach combining physical training with mental wellness. Yoga instructor and certified nutritionist.',
      certifications: ['RYT-500', 'ACSM-CPT', 'Holistic Nutrition']
    },
    {
      id: 'mike-wilson',
      name: 'Mike Wilson',
      experience: 10,
      specialization: ['Bodybuilding', 'Powerlifting', 'Advanced Training'],
      rating: 4.7,
      reviews: 156,
      priceModifier: 25,
      image: '/placeholder.svg',
      bio: 'Former competitive bodybuilder with expertise in advanced training techniques. Specializes in muscle building and strength development.',
      certifications: ['NSCA-CSCS', 'Powerlifting Coach', 'Sports Nutrition']
    },
    {
      id: 'emma-davis',
      name: 'Emma Davis',
      experience: 6,
      specialization: ['HIIT', 'Cardio', 'Weight Loss', 'Functional Training'],
      rating: 4.8,
      reviews: 98,
      priceModifier: 10,
      image: '/placeholder.svg',
      bio: 'High-energy trainer focused on functional fitness and cardiovascular health. Expert in creating efficient, time-effective workouts.',
      certifications: ['ACE-CPT', 'HIIT Specialist', 'Functional Movement']
    }
  ];

  const handleSelectTrainer = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
  };

  const calculateTotalPrice = (trainer: Trainer) => {
    return basePlanPrice + trainer.priceModifier;
  };

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Personal Trainer</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our certified trainers who will guide you on your fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {trainers.map((trainer) => (
            <Card 
              key={trainer.id} 
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
                selectedTrainer?.id === trainer.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectTrainer(trainer)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-xl">{trainer.name}</CardTitle>
                    <CardDescription>{trainer.experience} years experience</CardDescription>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{trainer.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({trainer.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${calculateTotalPrice(trainer)}
                      <span className="text-sm font-normal text-gray-600">/month</span>
                    </div>
                    {trainer.priceModifier > 0 && (
                      <div className="text-sm text-gray-500">
                        +${trainer.priceModifier} trainer fee
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm">{trainer.bio}</p>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialization.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Certifications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedTrainer?.id === trainer.id && (
                  <div className="pt-4 border-t">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-blue-800 font-semibold">✓ Selected Trainer</p>
                      <p className="text-sm text-blue-700">
                        Total: ${calculateTotalPrice(trainer)}/month
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTrainer && (
          <div className="text-center mt-12">
            <Card className="max-w-md mx-auto bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span>Base Plan:</span>
                    <span>${basePlanPrice}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trainer ({selectedTrainer.name}):</span>
                    <span>+${selectedTrainer.priceModifier}/month</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">${calculateTotalPrice(selectedTrainer)}/month</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => onSelectTrainer(selectedTrainer)}
                  className="w-full mt-6 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerSelection;
