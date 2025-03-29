import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, BarChart, LineChart, PieChart, CheckCircle, Activity, Book, 
  Brain, FileText, Target, ChevronRight, Pencil, Ruler, BrainCircuit,
  FileBarChart, BookOpen, Lightbulb 
} from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const WritingAnalysis = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<{
    dyslexia: number;
    dysgraphia: number;
    adhd: number;
    analysis: string;
  } | null>(null);
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [predictionData, setPredictionData] = useState<{
    confidence: number;
    report: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (text.trim().length < 50) {
      toast({
        title: "Text too short",
        description: "Please write at least 50 characters for accurate analysis.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a timeout (in a real app, this would be an API call)
    setTimeout(() => {
      // Adjust scores to stay within 80-100 range
      let dyslexiaScore = 80 + (Math.random() * 20); // Random score between 80-100
      let dysgraphiaScore = 80 + (Math.random() * 20);
      let adhdScore = 80 + (Math.random() * 20);
      
      // Round scores
      dyslexiaScore = Math.round(Math.max(80, Math.min(100, dyslexiaScore)));
      dysgraphiaScore = Math.round(Math.max(80, Math.min(100, dysgraphiaScore)));
      adhdScore = Math.round(Math.max(80, Math.min(100, adhdScore)));
      
      const analysisText = generateAnalysisText(dyslexiaScore, dysgraphiaScore, adhdScore);
      
      setResults({
        dyslexia: Math.round(dyslexiaScore),
        dysgraphia: Math.round(dysgraphiaScore),
        adhd: Math.round(adhdScore),
        analysis: analysisText,
      });
      
      setIsAnalyzing(false);
    }, 2500);
  };
  
  const generateAnalysisText = (dyslexia: number, dysgraphia: number, adhd: number) => {
    let text = "Based on the writing sample analysis, ";
    
    if (dyslexia > 70) {
      text += "there are significant indicators consistent with dyslexia. Common patterns include spelling inconsistencies and word substitutions. ";
    } else if (dyslexia > 40) {
      text += "there are some patterns that may indicate mild dyslexic tendencies, though the indicators are not strongly pronounced. ";
    } else {
      text += "there are few indicators of dyslexia in the writing pattern. ";
    }
    
    if (dysgraphia > 70) {
      text += "The writing shows strong markers of dysgraphia, including organizational challenges and structural inconsistencies. ";
    } else if (dysgraphia > 40) {
      text += "There are some signs that could indicate mild dysgraphia, particularly in the organization of ideas. ";
    } else {
      text += "Dysgraphia indicators are minimal based on this writing sample. ";
    }
    
    if (adhd > 70) {
      text += "The text displays patterns often associated with ADHD, such as train-of-thought writing and topic shifting.";
    } else if (adhd > 40) {
      text += "There are some patterns that might suggest attention challenges, though they're not strongly pronounced.";
    } else {
      text += "The writing shows good focus and organization, with minimal indicators of attention-related challenges.";
    }
    
    return text;
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('age', '12'); // You can make this dynamic
    formData.append('learning_style', 'visual');
    formData.append('challenges', JSON.stringify(['reading', 'writing']));
    formData.append('goals', JSON.stringify(['improve reading', 'better writing']));

    try {
      const response = await fetch('http://localhost:5000/api/analyze/handwriting', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze handwriting');

      const data = await response.json();
      setPredictionData(data);
      
      // Update results with all assessment scores
      setResults({
        dyslexia: data.assessments.dyslexia,
        dysgraphia: data.assessments.dysgraphia,
        adhd: data.assessments.adhd,
        analysis: data.report
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze handwriting",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 60) return "High";
    if (score >= 45) return "Moderate";
    return "Low";
  };

  return (
    <>
      <Helmet>
        <title>Writing Analysis | Learnlytic Assist</title>
        <meta 
          name="description" 
          content="Analyze writing patterns to detect potential learning disabilities" 
        />
      </Helmet>
      
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Writing Analysis</h1>
          <p className="mt-4 text-gray-600">
            Our AI analyzes writing patterns to identify potential markers for learning disabilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Handwriting Analysis Form */}
          <Card>
            <CardHeader>
              <CardTitle>Handwriting Analysis</CardTitle>
              <CardDescription>
                Upload a handwriting sample for dyslexia detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <div>
                  <label htmlFor="handwriting" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Handwriting Sample
                  </label>
                  <Input
                    id="handwriting"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload a clear image of handwritten text
                  </p>
                </div>
                
                <Button 
                  type="submit"
                  disabled={!imageFile || isAnalyzing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Handwriting...
                    </>
                  ) : (
                    "Analyze Handwriting"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Text Analysis Form */}
          <Card>
            <CardHeader>
              <CardTitle>Text Analysis</CardTitle>
              <CardDescription>
                Write or paste text for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="writing-sample" className="block text-sm font-medium text-gray-700 mb-1">
                      Writing Sample
                    </label>
                    <Textarea
                      id="writing-sample"
                      placeholder="Write or paste a writing sample (at least 50 characters)..."
                      className="min-h-[200px]"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      For best results, provide at least 200 characters of text.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isAnalyzing || text.trim().length < 50}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Writing"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {results && (
          <div className="space-y-8">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="results">Analysis Results</TabsTrigger>
                <TabsTrigger value="patterns">Writing Patterns</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detection Probability</CardTitle>
                      <CardDescription>Analysis confidence scores</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6">
                        {/* Dyslexia */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                              <span className="text-sm font-medium">Dyslexia</span>
                            </div>
                            <span className="text-sm font-bold">{results.dyslexia}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={results.dyslexia} className="h-3" />
                            <div 
                              className="absolute top-0 h-3 bg-purple-200 opacity-25"
                              style={{ width: `${Math.min(100, results.dyslexia + 20)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>High</span>
                          </div>
                        </div>

                        {/* Similar styled sections for Dysgraphia and ADHD */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                              <span className="text-sm font-medium">Dysgraphia</span>
                            </div>
                            <span className="text-sm font-bold">{results.dysgraphia}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={results.dysgraphia} className="h-3" />
                            <div 
                              className="absolute top-0 h-3 bg-blue-200 opacity-25"
                              style={{ width: `${Math.min(100, results.dysgraphia + 20)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>High</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                              <span className="text-sm font-medium">ADHD</span>
                            </div>
                            <span className="text-sm font-bold">{results.adhd}%</span>
                          </div>
                          <div className="relative">
                            <Progress value={results.adhd} className="h-3" />
                            <div 
                              className="absolute top-0 h-3 bg-green-200 opacity-25"
                              style={{ width: `${Math.min(100, results.adhd + 20)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>High</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">Composite Score</p>
                            <p className="text-sm text-gray-500">
                              Overall analysis based on multiple factors
                            </p>
                          </div>
                          <div className="relative h-32 w-32">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              {/* Background circle */}
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#E2E8F0"
                                strokeWidth="10"
                              />
                              {/* Progress circle */}
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#9333EA"
                                strokeWidth="10"
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (results.dyslexia || 0) / 100)}`}
                                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                              />
                              {/* Composite score */}
                              <text
                                x="50"
                                y="45"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="font-bold text-2xl fill-gray-900"
                              >
                                {Math.round(results.dyslexia)}%
                              </text>
                              {/* Label */}
                              <text
                                x="50"
                                y="65"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs fill-gray-500"
                              >
                                Composite
                              </text>
                            </svg>
                            
                            {/* Score indicator */}
                            <div className={`absolute -right-2 -top-2 p-1 rounded-full ${
                              results.dyslexia > 70 
                                ? 'bg-red-100' 
                                : results.dyslexia > 40 
                                  ? 'bg-yellow-100' 
                                  : 'bg-green-100'
                            }`}>
                              <div className={`w-3 h-3 rounded-full ${
                                results.dyslexia > 70 
                                  ? 'bg-red-500' 
                                  : results.dyslexia > 40 
                                    ? 'bg-yellow-500' 
                                    : 'bg-green-500'
                              }`} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="rounded-md bg-green-50 p-2">
                            <span className="text-green-700 font-medium">80-85%</span>
                            <p className="text-green-600">Initial</p>
                          </div>
                          <div className="rounded-md bg-blue-50 p-2">
                            <span className="text-blue-700 font-medium">86-95%</span>
                            <p className="text-blue-600">Advanced</p>
                          </div>
                          <div className="rounded-md bg-purple-50 p-2">
                            <span className="text-purple-700 font-medium">96-100%</span>
                            <p className="text-purple-600">Expert</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Writing Characteristics</CardTitle>
                      <CardDescription>Detailed pattern analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                            <div className="flex items-center">
                              <BarChart className="h-5 w-5 text-purple-500 mr-2" />
                              <span className="text-sm font-medium">Pattern Consistency</span>
                            </div>
                            <Badge variant="secondary">
                              {results.dyslexia > 70 ? "Low" : results.dyslexia > 40 ? "Moderate" : "High"}
                            </Badge>
                          </div>

                          {/* Add more characteristic items */}
                          <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                              <LineChart className="h-5 w-5 text-blue-500 mr-2" />
                              <span className="text-sm font-medium">Writing Flow</span>
                            </div>
                            <Badge variant="secondary">
                              {results.dysgraphia > 70 ? "Disrupted" : "Smooth"}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <PieChart className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm font-medium">Focus Level</span>
                            </div>
                            <Badge variant="secondary">
                              {results.adhd > 70 ? "Low" : results.adhd > 40 ? "Moderate" : "High"}
                            </Badge>
                          </div>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                {/* Analysis Card with enhanced visualization */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-medium text-lg text-gray-900">Detailed Analysis</h3>
                        <p className="text-sm text-gray-500">AI-powered writing assessment</p>
                      </div>
                      <TextToSpeech text={results.analysis} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex items-center mb-3">
                          <Brain className="h-5 w-5 text-purple-600 mr-2" />
                          <h4 className="font-medium text-purple-800">Key Findings</h4>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center text-purple-700">
                            <CheckCircle className="h-4 w-4 mr-2 text-purple-500" />
                            Pattern Recognition
                          </li>
                          <li className="flex items-center text-purple-700">
                            <Activity className="h-4 w-4 mr-2 text-purple-500" />
                            Writing Consistency
                          </li>
                          <li className="flex items-center text-purple-700">
                            <Book className="h-4 w-4 mr-2 text-purple-500" />
                            Reading Patterns
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center mb-3">
                          <Target className="h-5 w-5 text-blue-600 mr-2" />
                          <h4 className="font-medium text-blue-800">Focus Areas</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="relative pt-1">
                            <div className="flex justify-between text-xs text-blue-700 mb-1">
                              <span>Reading Speed</span>
                              <span>{results.dyslexia}%</span>
                            </div>
                            <div className="bg-blue-100 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-2 transition-all duration-500"
                                style={{ width: `${results.dyslexia}%` }}
                              />
                            </div>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex justify-between text-xs text-blue-700 mb-1">
                              <span>Writing Form</span>
                              <span>{results.dysgraphia}%</span>
                            </div>
                            <div className="bg-blue-100 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full h-2 transition-all duration-500"
                                style={{ width: `${results.dysgraphia}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                        <div className="flex items-center mb-3">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-800">Improvement Areas</h4>
                        </div>
                        <ScrollArea className="h-[100px]">
                          <ul className="space-y-2 text-sm pr-4">
                            <li className="flex items-start text-green-700">
                              <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Focused reading exercises
                            </li>
                            <li className="flex items-start text-green-700">
                              <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Handwriting practice
                            </li>
                            <li className="flex items-start text-green-700">
                              <ChevronRight className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                              Concentration techniques
                            </li>
                          </ul>
                        </ScrollArea>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 via-purple-50 to-gray-50 p-6 rounded-lg border border-purple-100">
                      <div className="prose prose-purple max-w-none">
                        <h4 className="text-lg font-medium text-purple-900 mb-4">Analysis Summary</h4>
                        <p className="text-gray-700 leading-relaxed">{results.analysis}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patterns" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Pattern Analysis</CardTitle>
                    <CardDescription>
                      Detailed breakdown of writing characteristics and patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Letter Formation */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Pencil className="h-5 w-5 text-purple-500" />
                          <h3 className="font-medium">Letter Formation</h3>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Consistency</span>
                              <span>{results.dyslexia}%</span>
                            </div>
                            <Progress value={results.dyslexia} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Spacing</span>
                              <span>{Math.max(75, Math.min(95, results.dyslexia + 5))}%</span>
                            </div>
                            <Progress 
                              value={Math.max(75, Math.min(95, results.dyslexia + 5))} 
                              className="h-2" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Writing Speed */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-500" />
                          <h3 className="font-medium">Writing Speed</h3>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.round(results.dyslexia * 0.8)}
                              </div>
                              <div className="text-xs text-gray-500">Words/Min</div>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.round(results.dysgraphia * 0.9)}%
                              </div>
                              <div className="text-xs text-gray-500">Accuracy</div>
                            </div>
                            <div className="p-2 bg-white rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.round(results.adhd * 0.85)}%
                              </div>
                              <div className="text-xs text-gray-500">Flow</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Cognitive Load */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <BrainCircuit className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Cognitive Load Indicators</h3>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="space-y-3">
                            {['Memory Access', 'Processing Speed', 'Visual Recognition'].map((item, index) => (
                              <div key={item} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="flex-1">
                                  <div className="flex justify-between mb-1">
                                    <span className="text-sm">{item}</span>
                                    <span className="text-sm font-medium">
                                      {Math.round(results.dyslexia - (index * 5))}%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={results.dyslexia - (index * 5)} 
                                    className="h-1.5" 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Pattern Recognition */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <FileBarChart className="h-5 w-5 text-amber-500" />
                          <h3 className="font-medium">Pattern Recognition</h3>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg space-y-3">
                          {[
                            { label: 'Letter Reversals', icon: Ruler },
                            { label: 'Word Spacing', icon: BookOpen },
                            { label: 'Line Alignment', icon: Lightbulb }
                          ].map(item => (
                            <div key={item.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-amber-500" />
                                <span className="text-sm">{item.label}</span>
                              </div>
                              <Badge variant="outline" className={
                                results.dyslexia > 90 
                                  ? "border-red-200 text-red-700"
                                  : results.dyslexia > 85
                                    ? "border-yellow-200 text-yellow-700"
                                    : "border-green-200 text-green-700"
                              }>
                                {results.dyslexia > 90 
                                  ? "Frequent" 
                                  : results.dyslexia > 85 
                                    ? "Occasional" 
                                    : "Rare"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full">
                          <BrainCircuit className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-900 mb-1">AI Pattern Analysis</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Based on the writing patterns analyzed, the AI has detected 
                            {results.dyslexia > 90 
                              ? " significant irregularities in letter formation and spacing" 
                              : results.dyslexia > 85
                                ? " moderate inconsistencies in writing patterns"
                                : " minor variations in writing characteristics"
                            }. These patterns are commonly associated with 
                            {results.dyslexia > 90 
                              ? " advanced stages of dyslexia"
                              : results.dyslexia > 85
                                ? " developing dyslexic tendencies"
                                : " early indicators of potential dyslexia"
                            }.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-lg text-gray-900">Learning Recommendations</h3>
                      <TextToSpeech text={"Based on the analysis, we recommend the following strategies to support the learning process."} />
                    </div>
                    
                    <ul className="space-y-4">
                      {results.dyslexia > 40 && (
                        <li className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-medium text-purple-800">Dyslexia Support</h4>
                          <p className="mt-1 text-sm text-gray-700">
                            Use text-to-speech tools, provide more time for reading tasks, and use dyslexia-friendly fonts.
                          </p>
                        </li>
                      )}
                      
                      {results.dysgraphia > 40 && (
                        <li className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-800">Dysgraphia Support</h4>
                          <p className="mt-1 text-sm text-gray-700">
                            Allow use of digital writing tools, provide extra time for writing tasks, and use graphic organizers.
                          </p>
                        </li>
                      )}
                      
                      {results.adhd > 40 && (
                        <li className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800">ADHD Support</h4>
                          <p className="mt-1 text-sm text-gray-700">
                            Break tasks into smaller chunks, provide clear structure, and minimize distractions.
                          </p>
                        </li>
                      )}
                      
                      <li className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-800">General Recommendations</h4>
                        <p className="mt-1 text-sm text-gray-700">
                          Visit our adaptive learning section for personalized learning activities based on your profile.
                        </p>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <Button asChild className="bg-purple-600 hover:bg-purple-700">
                        <a href="/learning-plan">View Personalized Learning Plan</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </>
  );
};

export default WritingAnalysis;
