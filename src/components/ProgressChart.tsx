
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ProgressChart = () => {
  const weightData = [
    { week: 'Week 1', weight: 70, bodyFat: 18 },
    { week: 'Week 2', weight: 69.5, bodyFat: 17.8 },
    { week: 'Week 3', weight: 69, bodyFat: 17.5 },
    { week: 'Week 4', weight: 68.8, bodyFat: 17.2 },
    { week: 'Week 5', weight: 68.5, bodyFat: 17 },
    { week: 'Week 6', weight: 68.2, bodyFat: 16.8 },
  ];

  const workoutData = [
    { day: 'Mon', workouts: 1, calories: 450 },
    { day: 'Tue', workouts: 1, calories: 380 },
    { day: 'Wed', workouts: 0, calories: 0 },
    { day: 'Thu', workouts: 1, calories: 420 },
    { day: 'Fri', workouts: 1, calories: 500 },
    { day: 'Sat', workouts: 1, calories: 350 },
    { day: 'Sun', workouts: 0, calories: 0 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weight & Body Fat Progress</CardTitle>
          <CardDescription>Track your body composition changes over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Weight (kg)"
              />
              <Line 
                type="monotone" 
                dataKey="bodyFat" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Body Fat (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Workout Activity</CardTitle>
          <CardDescription>Your workout frequency and calories burned this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={workoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#8b5cf6" name="Calories Burned" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressChart;
