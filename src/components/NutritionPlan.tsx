
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const NutritionPlan = () => {
  const nutritionPlan = {
    week: "Week 3 - Balanced Nutrition",
    trainer: "John Smith",
    dailyTargets: {
      calories: 2200,
      protein: 120,
      carbs: 275,
      fat: 73,
      fiber: 25,
      water: 2.5
    },
    currentIntake: {
      calories: 1850,
      protein: 95,
      carbs: 220,
      fat: 58,
      fiber: 18,
      water: 2.1
    },
    mealPlan: [
      {
        meal: "Breakfast",
        time: "7:00 AM",
        foods: [
          { name: "Oatmeal with berries", calories: 350, protein: 12, carbs: 65, fat: 8 },
          { name: "Greek yogurt", calories: 100, protein: 15, carbs: 6, fat: 0 },
          { name: "Green tea", calories: 0, protein: 0, carbs: 0, fat: 0 }
        ]
      },
      {
        meal: "Mid-Morning Snack",
        time: "10:00 AM",
        foods: [
          { name: "Apple with almond butter", calories: 200, protein: 6, carbs: 25, fat: 12 }
        ]
      },
      {
        meal: "Lunch",
        time: "1:00 PM",
        foods: [
          { name: "Grilled chicken breast", calories: 300, protein: 55, carbs: 0, fat: 7 },
          { name: "Quinoa", calories: 150, protein: 6, carbs: 27, fat: 2 },
          { name: "Mixed vegetables", calories: 80, protein: 3, carbs: 18, fat: 1 }
        ]
      },
      {
        meal: "Afternoon Snack",
        time: "4:00 PM",
        foods: [
          { name: "Protein smoothie", calories: 250, protein: 25, carbs: 30, fat: 5 }
        ]
      },
      {
        meal: "Dinner",
        time: "7:00 PM",
        foods: [
          { name: "Baked salmon", calories: 350, protein: 40, carbs: 0, fat: 20 },
          { name: "Sweet potato", calories: 120, protein: 2, carbs: 28, fat: 0 },
          { name: "Steamed broccoli", calories: 50, protein: 4, carbs: 10, fat: 1 }
        ]
      }
    ]
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return "bg-green-500";
    if (percentage >= 70 && percentage < 90) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{nutritionPlan.week}</CardTitle>
              <CardDescription>Assigned by {nutritionPlan.trainer}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50">
              Active Plan
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Targets Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition Targets</CardTitle>
          <CardDescription>Track your daily intake progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Calories</span>
                <span className="text-sm">{nutritionPlan.currentIntake.calories}/{nutritionPlan.dailyTargets.calories}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.calories / nutritionPlan.dailyTargets.calories) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Protein (g)</span>
                <span className="text-sm">{nutritionPlan.currentIntake.protein}/{nutritionPlan.dailyTargets.protein}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.protein / nutritionPlan.dailyTargets.protein) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Carbs (g)</span>
                <span className="text-sm">{nutritionPlan.currentIntake.carbs}/{nutritionPlan.dailyTargets.carbs}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.carbs / nutritionPlan.dailyTargets.carbs) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fat (g)</span>
                <span className="text-sm">{nutritionPlan.currentIntake.fat}/{nutritionPlan.dailyTargets.fat}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.fat / nutritionPlan.dailyTargets.fat) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fiber (g)</span>
                <span className="text-sm">{nutritionPlan.currentIntake.fiber}/{nutritionPlan.dailyTargets.fiber}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.fiber / nutritionPlan.dailyTargets.fiber) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Water (L)</span>
                <span className="text-sm">{nutritionPlan.currentIntake.water}/{nutritionPlan.dailyTargets.water}</span>
              </div>
              <Progress 
                value={(nutritionPlan.currentIntake.water / nutritionPlan.dailyTargets.water) * 100} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meal Plan */}
      <div className="space-y-4">
        {nutritionPlan.mealPlan.map((meal, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{meal.meal}</CardTitle>
                <Badge variant="outline">{meal.time}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{food.name}</h4>
                      <p className="text-sm text-gray-600">
                        {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Total Calories</p>
                      <p className="font-semibold">{meal.foods.reduce((sum, food) => sum + food.calories, 0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Protein</p>
                      <p className="font-semibold">{meal.foods.reduce((sum, food) => sum + food.protein, 0)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Carbs</p>
                      <p className="font-semibold">{meal.foods.reduce((sum, food) => sum + food.carbs, 0)}g</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Fat</p>
                      <p className="font-semibold">{meal.foods.reduce((sum, food) => sum + food.fat, 0)}g</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NutritionPlan;
