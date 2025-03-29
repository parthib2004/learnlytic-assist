
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import { useToast } from "@/components/ui/use-toast";

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
      // Mock analysis results based on text length and characteristics
      const containsRepeatedWords = /([\w]+)\s+\1/i.test(text);
      const hasSpellingErrors = /teh|hte|adn|waht|wiht/i.test(text);
      const hasPoorPunctuation = text.split(".").length < 3 && text.length > 100;
      
      // Adjust scores based on text characteristics
      let dyslexiaScore = 30 + (hasSpellingErrors ? 40 : 0);
      let dysgraphiaScore = 15 + (hasPoorPunctuation ? 30 : 0);
      let adhdScore = 25 + (containsRepeatedWords ? 35 : 0);
      
      // Randomize a bit to make it look more realistic
      dyslexiaScore = Math.min(95, Math.max(5, dyslexiaScore + (Math.random() * 20 - 10)));
      dysgraphiaScore = Math.min(95, Math.max(5, dysgraphiaScore + (Math.random() * 20 - 10)));
      adhdScore = Math.min(95, Math.max(5, adhdScore + (Math.random() * 20 - 10)));
      
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
        
        <Card className="mb-8">
          <CardContent className="pt-6">
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
        
        {results && (
          <div className="space-y-8">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results">Analysis Results</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="results" className="space-y-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-lg text-gray-900 mb-4">Detection Probability</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Dyslexia</span>
                          <span className="text-sm font-medium text-gray-700">{results.dyslexia}%</span>
                        </div>
                        <Progress value={results.dyslexia} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Dysgraphia</span>
                          <span className="text-sm font-medium text-gray-700">{results.dysgraphia}%</span>
                        </div>
                        <Progress value={results.dysgraphia} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">ADHD</span>
                          <span className="text-sm font-medium text-gray-700">{results.adhd}%</span>
                        </div>
                        <Progress value={results.adhd} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium text-lg text-gray-900">Analysis</h3>
                      <TextToSpeech text={results.analysis} />
                    </div>
                    <p className="text-gray-700">{results.analysis}</p>
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
