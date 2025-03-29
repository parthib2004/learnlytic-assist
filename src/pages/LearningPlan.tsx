
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, CheckCircle, Clock, FileText, Flag, GraduationCap, MoreHorizontal } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";

const LearningPlan = () => {
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const toggleActivity = (id: string) => {
    if (completedActivities.includes(id)) {
      setCompletedActivities(completedActivities.filter(item => item !== id));
    } else {
      setCompletedActivities([...completedActivities, id]);
    }
  };

  const calculateProgress = (category: string) => {
    const categoryActivities = activities.filter(activity => activity.category === category);
    const completedCategoryActivities = categoryActivities.filter(activity => 
      completedActivities.includes(activity.id)
    );
    
    return (completedCategoryActivities.length / categoryActivities.length) * 100;
  };

  const activities = [
    {
      id: "reading-1",
      title: "Structured Reading Practice",
      description: "Use text-to-speech to read a short paragraph, then try reading it yourself.",
      category: "reading",
      difficulty: "Medium",
      duration: "15 min",
      content: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. Practicing with this sentence can help improve reading fluency."
    },
    {
      id: "reading-2",
      title: "Word Recognition Exercise",
      description: "Practice recognizing high-frequency words quickly.",
      category: "reading",
      difficulty: "Easy",
      duration: "10 min",
      content: "Focus on these common words: the, and, to, of, a, in, that, is, was, for, with, he, as, you, on."
    },
    {
      id: "reading-3",
      title: "Chunking Technique",
      description: "Practice breaking text into manageable chunks.",
      category: "reading",
      difficulty: "Hard",
      duration: "20 min",
      content: "Read this text by breaking it into chunks: [Learning to read] [can be challenging] [for some students.] [Breaking text] [into smaller parts] [makes it easier] [to process information.]"
    },
    {
      id: "writing-1",
      title: "Sentence Structure Basics",
      description: "Practice constructing simple, clear sentences.",
      category: "writing",
      difficulty: "Easy",
      duration: "15 min",
      content: "Complete these sentence starters: 1. Today I feel... 2. My favorite food is... 3. On weekends I like to..."
    },
    {
      id: "writing-2",
      title: "Graphic Organizers",
      description: "Use visual aids to organize thoughts before writing.",
      category: "writing",
      difficulty: "Medium",
      duration: "25 min",
      content: "Create a mind map about your favorite hobby. Start with the main idea in the center and add branches for different aspects."
    },
    {
      id: "focus-1",
      title: "Pomodoro Technique",
      description: "Practice focused work with timed intervals.",
      category: "focus",
      difficulty: "Easy",
      duration: "25 min",
      content: "Set a timer for 25 minutes and work on a single task without distractions. Then take a 5-minute break."
    },
    {
      id: "focus-2",
      title: "Task Prioritization",
      description: "Learn to organize tasks by importance and urgency.",
      category: "focus",
      difficulty: "Medium",
      duration: "20 min",
      content: "Create a 2x2 grid with Important/Not Important and Urgent/Not Urgent axes. Place your tasks in the appropriate quadrants."
    },
    {
      id: "focus-3",
      title: "Environmental Management",
      description: "Set up an optimal learning environment.",
      category: "focus",
      difficulty: "Easy",
      duration: "15 min",
      content: "Remove distractions from your workspace. Turn off notifications, clear clutter, and ensure good lighting."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Personalized Learning Plan | Learnlytic Assist</title>
        <meta 
          name="description" 
          content="AI-generated personalized learning plan based on your specific needs" 
        />
      </Helmet>
      
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Personalized Learning Plan</h1>
          <p className="mt-4 text-gray-600">
            AI-generated activities and resources tailored to your specific learning needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-purple-600" />
                  <CardTitle className="text-lg">Reading Skills</CardTitle>
                </div>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                  3 Activities
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{Math.round(calculateProgress("reading"))}%</span>
                </div>
                <Progress value={calculateProgress("reading")} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Writing Skills</CardTitle>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  2 Activities
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{Math.round(calculateProgress("writing"))}%</span>
                </div>
                <Progress value={calculateProgress("writing")} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Flag className="mr-2 h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Focus & Attention</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  3 Activities
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{Math.round(calculateProgress("focus"))}%</span>
                </div>
                <Progress value={calculateProgress("focus")} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="reading" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reading">Reading Skills</TabsTrigger>
            <TabsTrigger value="writing">Writing Skills</TabsTrigger>
            <TabsTrigger value="focus">Focus & Attention</TabsTrigger>
          </TabsList>
          
          {["reading", "writing", "focus"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-6 mt-6">
              {activities
                .filter(activity => activity.category === category)
                .map(activity => (
                  <Card key={activity.id} className={
                    completedActivities.includes(activity.id) 
                      ? "border-green-200 bg-green-50/30"
                      : ""
                  }>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <Checkbox 
                              id={`check-${activity.id}`}
                              checked={completedActivities.includes(activity.id)}
                              onCheckedChange={() => toggleActivity(activity.id)}
                              className="mr-2"
                            />
                            <Label
                              htmlFor={`check-${activity.id}`}
                              className={`font-medium text-lg ${
                                completedActivities.includes(activity.id)
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {activity.title}
                            </Label>
                          </div>
                          <CardDescription className="mt-1">
                            {activity.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {activity.duration}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              activity.difficulty === "Easy"
                                ? "border-green-200 text-green-700"
                                : activity.difficulty === "Medium"
                                ? "border-yellow-200 text-yellow-700"
                                : "border-red-200 text-red-700"
                            }
                          >
                            {activity.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-700">
                            {activity.content}
                          </p>
                          <TextToSpeech 
                            text={activity.content} 
                            buttonSize="icon"
                            className="ml-2 flex-shrink-0"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="mr-1 h-4 w-4" />
                          <span>
                            Tailored for your {
                              category === "reading" 
                                ? "dyslexia support" 
                                : category === "writing" 
                                ? "dysgraphia support" 
                                : "ADHD support"
                            }
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Activities</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-12 border-t pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Schedule</h2>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recommended Activity Schedule</CardTitle>
                <Badge className="flex items-center bg-purple-100 text-purple-800">
                  <Calendar className="mr-1 h-4 w-4" />
                  This Week
                </Badge>
              </div>
              <CardDescription>
                Based on your assessment results, we've created an optimal schedule to improve your skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                  <Card key={day} className="border-t-4 border-t-purple-600">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm font-medium">{day}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <ul className="space-y-3">
                        <li className="text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">Reading Skills</span>
                            <span className="text-gray-500">15 min</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {index % 3 === 0 ? "Word Recognition" : index % 3 === 1 ? "Structured Reading" : "Chunking Exercise"}
                          </p>
                        </li>
                        <Separator className="my-2" />
                        <li className="text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {index % 2 === 0 ? "Writing Skills" : "Focus Training"}
                            </span>
                            <span className="text-gray-500">20 min</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {index % 2 === 0 
                              ? (index % 4 === 0 ? "Sentence Structure" : "Graphic Organizers")
                              : (index % 4 === 1 ? "Pomodoro Technique" : "Task Prioritization")
                            }
                          </p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-800">Pro Tip</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Consistency is key! Try to follow your schedule at the same time each day to build a routine.
                      Don't worry about perfection—even 10 minutes of focused practice is valuable.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LearningPlan;
