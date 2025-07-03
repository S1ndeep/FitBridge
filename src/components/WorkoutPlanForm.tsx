
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';

const WorkoutPlanForm = () => {
  const [exercises, setExercises] = useState([
    { name: '', sets: '', reps: '', rest: '', notes: '' }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', rest: '', notes: '' }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Workout Plan</CardTitle>
        <CardDescription>Design a custom workout plan for your client</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client">Select Client</Label>
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
          <div>
            <Label htmlFor="week">Week</Label>
            <Input id="week" placeholder="e.g., Week 1" />
          </div>
        </div>

        <div>
          <Label htmlFor="plan-name">Plan Name</Label>
          <Input id="plan-name" placeholder="e.g., Upper Body Strength" />
        </div>

        <div>
          <Label>Exercises</Label>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Exercise {index + 1}</h4>
                  {exercises.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeExercise(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Exercise Name</Label>
                    <Input
                      placeholder="e.g., Push-ups"
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Sets</Label>
                    <Input
                      placeholder="e.g., 3"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Reps</Label>
                    <Input
                      placeholder="e.g., 12-15"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Rest Time</Label>
                    <Input
                      placeholder="e.g., 60s"
                      value={exercise.rest}
                      onChange={(e) => updateExercise(index, 'rest', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Special instructions or form cues..."
                    value={exercise.notes}
                    onChange={(e) => updateExercise(index, 'notes', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={addExercise}
            className="w-full mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Exercise
          </Button>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">Save Plan</Button>
          <Button variant="outline" className="flex-1">Save as Template</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkoutPlanForm;
