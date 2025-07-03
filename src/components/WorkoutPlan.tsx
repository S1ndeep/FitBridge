
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Target, Calendar } from 'lucide-react';
import { useState } from 'react';

const WorkoutPlan = () => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const workoutPlan = {
    week: "Week 3 - Strength Building",
    trainer: "John Smith",
    days: [
      {
        day: "Monday - Upper Body",
        exercises: [
          { id: '1', name: "Push-ups", sets: 3, reps: "12-15", rest: "60s", difficulty: "Beginner" },
          { id: '2', name: "Dumbbell Rows", sets: 3, reps: "10-12", rest: "90s", difficulty: "Intermediate" },
          { id: '3', name: "Shoulder Press", sets: 3, reps: "8-10", rest: "90s", difficulty: "Intermediate" },
          { id: '4', name: "Bicep Curls", sets: 2, reps: "12-15", rest: "60s", difficulty: "Beginner" },
        ]
      },
      {
        day: "Tuesday - Lower Body",
        exercises: [
          { id: '5', name: "Squats", sets: 3, reps: "15-20", rest: "90s", difficulty: "Beginner" },
          { id: '6', name: "Lunges", sets: 3, reps: "10 each leg", rest: "60s", difficulty: "Intermediate" },
          { id: '7', name: "Deadlifts", sets: 3, reps: "8-10", rest: "120s", difficulty: "Advanced" },
          { id: '8', name: "Calf Raises", sets: 2, reps: "15-20", rest: "45s", difficulty: "Beginner" },
        ]
      },
      {
        day: "Wednesday - Rest Day",
        exercises: [
          { id: '9', name: "Light Walking", sets: 1, reps: "30 minutes", rest: "N/A", difficulty: "Recovery" },
          { id: '10', name: "Stretching", sets: 1, reps: "15 minutes", rest: "N/A", difficulty: "Recovery" },
        ]
      }
    ]
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'Recovery': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{workoutPlan.week}</CardTitle>
              <CardDescription>Assigned by {workoutPlan.trainer}</CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-50">
              Current Plan
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {workoutPlan.days.map((day, dayIndex) => (
        <Card key={dayIndex}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {day.day}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {day.exercises.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className={`p-4 border rounded-lg transition-all ${
                    completedExercises.includes(exercise.id) 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{exercise.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                      <Button
                        size="sm"
                        variant={completedExercises.includes(exercise.id) ? "default" : "outline"}
                        onClick={() => toggleExerciseCompletion(exercise.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-600">Sets:</span>
                      <span className="font-semibold">{exercise.sets}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="text-gray-600">Reps:</span>
                      <span className="font-semibold">{exercise.reps}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-600">Rest:</span>
                      <span className="font-semibold">{exercise.rest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Completed {completedExercises.length} of {workoutPlan.days.reduce((total, day) => total + day.exercises.length, 0)} exercises this week
            </p>
            <Button className="w-full md:w-auto">
              Submit Weekly Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutPlan;
