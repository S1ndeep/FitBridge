
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from 'lucide-react';

const FoodLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [todaysFoods] = useState([
    { id: '1', name: 'Greek Yogurt with Berries', calories: 150, protein: 15, carbs: 20, fat: 2, time: '08:00' },
    { id: '2', name: 'Grilled Chicken Breast', calories: 300, protein: 55, carbs: 0, fat: 7, time: '13:00' },
    { id: '3', name: 'Brown Rice', calories: 110, protein: 3, carbs: 23, fat: 1, time: '13:00' },
    { id: '4', name: 'Mixed Green Salad', calories: 50, protein: 2, carbs: 10, fat: 1, time: '13:00' },
  ]);

  const [foodDatabase] = useState([
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice (1 cup)', calories: 218, protein: 4.5, carbs: 45, fat: 1.6 },
    { name: 'Broccoli (1 cup)', calories: 25, protein: 3, carbs: 5, fat: 0.3 },
    { name: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 12 },
    { name: 'Oatmeal (1 cup)', calories: 154, protein: 5, carbs: 28, fat: 3 },
  ]);

  const filteredFoods = foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCalories = todaysFoods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = todaysFoods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = todaysFoods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = todaysFoods.reduce((sum, food) => sum + food.fat, 0);

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Food Log</CardTitle>
          <CardDescription>Track your daily nutrition intake</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{totalCalories}</p>
              <p className="text-sm text-gray-600">Calories</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{totalProtein.toFixed(1)}g</p>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{totalCarbs.toFixed(1)}g</p>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{totalFat.toFixed(1)}g</p>
              <p className="text-sm text-gray-600">Fat</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Food */}
      <Card>
        <CardHeader>
          <CardTitle>Add Food</CardTitle>
          <CardDescription>Search and add foods to your daily log</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Search for food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {searchTerm && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">{food.name}</h4>
                      <p className="text-sm text-gray-600">
                        {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                      </p>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Today's Foods */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Foods</CardTitle>
          <CardDescription>Foods you've logged today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysFoods.map((food) => (
              <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{food.name}</h4>
                  <p className="text-sm text-gray-600">
                    {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {food.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodLog;
