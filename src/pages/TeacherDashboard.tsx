import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, AlertCircle, BarChart3, BookOpen, Brain, ChevronRight, 
  Clock, FileText, Flag, Layers, LineChart as LineChartIcon, Users, CheckCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const TeacherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  const students = [
    { 
      id: 1, 
      name: "Emily Johnson", 
      avatar: "", 
      initials: "EJ",
      grade: "8th Grade",
      assessments: {
        dyslexia: 78,
        dysgraphia: 45,
        adhd: 65
      },
      progress: 62,
      activityCompletion: 14,
      lastActive: "2 hours ago",
      alerts: ["Struggling with reading comprehension", "Needs more time on writing tasks"],
      strengths: ["Visual learning", "Creative thinking", "Verbal communication"]
    },
    { 
      id: 2, 
      name: "Michael Chen", 
      avatar: "", 
      initials: "MC",
      grade: "7th Grade",
      assessments: {
        dyslexia: 32,
        dysgraphia: 75,
        adhd: 58
      },
      progress: 47,
      activityCompletion: 9,
      lastActive: "Yesterday",
      alerts: ["Difficulty with handwriting", "Struggles with organizing thoughts"],
      strengths: ["Mathematical concepts", "Logical reasoning", "Persistence"]
    },
    { 
      id: 3, 
      name: "Sofia Rodriguez", 
      avatar: "", 
      initials: "SR",
      grade: "8th Grade",
      assessments: {
        dyslexia: 42,
        dysgraphia: 38,
        adhd: 82
      },
      progress: 53,
      activityCompletion: 11,
      lastActive: "3 days ago",
      alerts: ["Difficulty maintaining focus", "Frequently misses instructions"],
      strengths: ["Creative problem-solving", "Verbal discussion", "Artistic ability"]
    },
    { 
      id: 4, 
      name: "Jacob Williams", 
      avatar: "", 
      initials: "JW",
      grade: "7th Grade",
      assessments: {
        dyslexia: 85,
        dysgraphia: 52,
        adhd: 35
      },
      progress: 39,
      activityCompletion: 8,
      lastActive: "4 hours ago",
      alerts: ["Significant reading delays", "Word recognition challenges"],
      strengths: ["Excellent listening comprehension", "Strong in science concepts", "Good with technology"]
    }
  ];
  
  const classStats = {
    assessmentsCompleted: 24,
    averageImprovement: 28,
    activeStudents: 18,
    completedActivities: 156,
    skillDistribution: {
      reading: 35,
      writing: 42,
      focus: 23
    }
  };

  const performanceData = students.map(student => ({
    name: student.name,
    dyslexia: student.assessments.dyslexia,
    dysgraphia: student.assessments.dysgraphia,
    adhd: student.assessments.adhd,
    progress: student.progress
  }));

  const progressData = [
    { month: 'Jan', reading: 65, writing: 45, focus: 50 },
    { month: 'Feb', reading: 68, writing: 52, focus: 55 },
    { month: 'Mar', reading: 75, writing: 58, focus: 62 },
    { month: 'Apr', reading: 85, writing: 65, focus: 70 },
  ];

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard | Learnlytic Assist</title>
        <meta 
          name="description" 
          content="Teacher dashboard for monitoring student progress and insights" 
        />
      </Helmet>
      
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Monitor student progress and get AI-powered insights to support learning.
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Generate Reports
          </Button>
        </div>
        
        {/* Removed Demo Version Alert */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Assessments Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{classStats.assessmentsCompleted}</div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">+5 from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Avg. Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{classStats.averageImprovement}%</div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <LineChartIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ 7% increase</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{classStats.activeStudents}</div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Out of 20 total students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{classStats.completedActivities}</div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Layers className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <p className="text-xs text-indigo-600 mt-2">↑ 23 this week</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Class Skill Distribution</CardTitle>
              <CardDescription>
                Breakdown of learning focus areas across your class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm font-medium">Reading Skills</span>
                    </div>
                    <span className="text-sm font-medium">{classStats.skillDistribution.reading}%</span>
                  </div>
                  <Progress value={classStats.skillDistribution.reading} className="h-2 bg-gray-100" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm font-medium">Writing Skills</span>
                    </div>
                    <span className="text-sm font-medium">{classStats.skillDistribution.writing}%</span>
                  </div>
                  <Progress value={classStats.skillDistribution.writing} className="h-2 bg-gray-100" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium">Focus & Attention</span>
                    </div>
                    <span className="text-sm font-medium">{classStats.skillDistribution.focus}%</span>
                  </div>
                  <Progress value={classStats.skillDistribution.focus} className="h-2 bg-gray-100" />
                </div>
                
                <div className="pt-4 grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Brain className="h-4 w-4 text-purple-600 mr-1.5" />
                      <span className="text-xs font-medium">Dyslexia</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold">42%</span>
                      <span className="text-xs text-gray-500 ml-1">of class</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <FileText className="h-4 w-4 text-blue-600 mr-1.5" />
                      <span className="text-xs font-medium">Dysgraphia</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold">35%</span>
                      <span className="text-xs text-gray-500 ml-1">of class</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Flag className="h-4 w-4 text-green-600 mr-1.5" />
                      <span className="text-xs font-medium">ADHD</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold">27%</span>
                      <span className="text-xs text-gray-500 ml-1">of class</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>
                Generated recommendations for your class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-purple-800">Reading Focus</h4>
                      <p className="text-xs text-purple-700 mt-1">
                        5 students would benefit from additional phonological awareness exercises.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-blue-800">Writing Support</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        Consider introducing graphic organizers to help with writing structure.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Flag className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-green-800">Focus Improvement</h4>
                      <p className="text-xs text-green-700 mt-1">
                        Try implementing 5-minute brain breaks between learning activities.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Activity className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-amber-800">Group Activities</h4>
                      <p className="text-xs text-amber-700 mt-1">
                        Pair struggling readers with strong readers for collaborative exercises.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Insights
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="overview">Student Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="plans">Learning Plans</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center text-sm">
                <Button variant="outline" size="sm" className="mr-2">
                  <Clock className="h-4 w-4 mr-1" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle>Students</CardTitle>
                  <CardDescription>
                    Monitor individual student progress and needs
                  </CardDescription>
                </CardHeader>
                
                <div className="grid grid-cols-3 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500">
                  <div>Student</div>
                  <div>Assessment Results</div>
                  <div>Progress</div>
                </div>
                
                {students.map((student) => (
                  <div key={student.id}>
                    <CardContent className="grid grid-cols-3 py-4 items-center">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {student.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-500">{student.grade}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-xs font-medium w-16">Dyslexia</span>
                          <Progress value={student.assessments.dyslexia} className="h-1.5 w-24" />
                          <span className="text-xs ml-2">{student.assessments.dyslexia}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-xs font-medium w-16">Dysgraphia</span>
                          <Progress value={student.assessments.dysgraphia} className="h-1.5 w-24" />
                          <span className="text-xs ml-2">{student.assessments.dysgraphia}%</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-xs font-medium w-16">ADHD</span>
                          <Progress value={student.assessments.adhd} className="h-1.5 w-24" />
                          <span className="text-xs ml-2">{student.assessments.adhd}%</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Overall Progress</span>
                            <span className="font-medium">{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2 w-40" />
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last active {student.lastActive}</span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                    <Separator />
                  </div>
                ))}
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Assessment Distribution</CardTitle>
                    <CardDescription>
                      Comparison of assessment scores across students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="dyslexia" fill="#9333ea" name="Reading Skills" />
                          <Bar dataKey="dysgraphia" fill="#3b82f6" name="Writing Skills" />
                          <Bar dataKey="adhd" fill="#22c55e" name="Focus & Attention" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Class Progress Trends</CardTitle>
                    <CardDescription>
                      Monthly progress tracking in key areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={progressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="reading" 
                            stroke="#9333ea" 
                            name="Reading Skills"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="writing" 
                            stroke="#3b82f6" 
                            name="Writing Skills"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="focus" 
                            stroke="#22c55e" 
                            name="Focus & Attention"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="plans" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Plans</CardTitle>
                  <CardDescription>
                    View and manage personalized learning plans
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {students.map((student) => (
                      <div key={student.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {student.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.grade}</p>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">
                            {student.activityCompletion} Activities Completed
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Alerts & Observations</h4>
                            <ul className="space-y-1">
                              {student.alerts.map((alert, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <AlertCircle className="h-4 w-4 text-amber-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{alert}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Strengths</h4>
                            <ul className="space-y-1">
                              {student.strengths.map((strength, index) => (
                                <li key={index} className="text-sm flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{strength}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit Plan
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
