
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const NutritionPlanForm = () => {
  const [clientData, setClientData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '',
    goal: ''
  });

  const [calculatedNutrition, setCalculatedNutrition] = useState<any>(null);

  const calculateNutrition = () => {
    // Simple BMR calculation (Mifflin-St Jeor Equation)
    const weight = parseFloat(clientData.weight);
    const height = parseFloat(clientData.height);
    const age = parseFloat(clientData.age);
    
    let bmr;
    if (clientData.gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[clientData.activityLevel as keyof typeof activityMultipliers] || 1.2;
    const tdee = bmr * multiplier;

    // Adjust for goal
    let calories = tdee;
    if (clientData.goal === 'weight_loss') {
      calories = tdee - 500; // 500 calorie deficit
    } else if (clientData.goal === 'weight_gain') {
      calories = tdee + 500; // 500 calorie surplus
    }

    // Macronutrient distribution
    const protein = (calories * 0.25) / 4; // 25% protein
    const carbs = (calories * 0.45) / 4; // 45% carbs
    const fat = (calories * 0.30) / 9; // 30% fat

    setCalculatedNutrition({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      fiber: Math.round(weight * 0.5), // 0.5g per kg body weight
      water: Math.round((weight * 35) / 1000 * 10) / 10 // 35ml per kg body weight
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Nutrition Plan</CardTitle>
        <CardDescription>Calculate personalized nutrition requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="nutrition-client">Select Client</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alice">Alice Brown</SelectItem>
              <SelectItem value="bob">Bob Davis</SelectItem>
              <SelectItem value="carol">Carol White</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={clientData.weight}
              onChange={(e) => setClientData({...clientData, weight: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={clientData.height}
              onChange={(e) => setClientData({...clientData, height: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="30"
              value={clientData.age}
              onChange={(e) => setClientData({...clientData, age: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select value={clientData.gender} onValueChange={(value) => setClientData({...clientData, gender: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="activity">Activity Level</Label>
          <Select value={clientData.activityLevel} onValueChange={(value) => setClientData({...clientData, activityLevel: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
              <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
              <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="very_active">Very Active (very hard exercise, physical job)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="goal">Goal</Label>
          <Select value={clientData.goal} onValueChange={(value) => setClientData({...clientData, goal: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight_loss">Weight Loss</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="weight_gain">Weight Gain</SelectItem>
              <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateNutrition} className="w-full">
          Calculate Nutrition Requirements
        </Button>

        {calculatedNutrition && (
          <div className="p-4 bg-green-50 rounded-lg space-y-4">
            <h4 className="font-semibold text-green-800">Calculated Requirements</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Daily Calories</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.calories}</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Protein</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.protein}g</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Carbs</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.carbs}g</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Fat</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.fat}g</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Fiber</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.fiber}g</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="mb-2">Water</Badge>
                <p className="text-2xl font-bold">{calculatedNutrition.water}L</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button className="flex-1">Create Plan</Button>
              <Button variant="outline" className="flex-1">Save Template</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NutritionPlanForm;
