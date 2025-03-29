
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, AlertCircle, ChevronRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import TextToSpeech from "@/components/TextToSpeech";
import { useToast } from "@/components/ui/use-toast";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  timeSpent?: number;
  answerChanged?: number;
};

type QuizResult = {
  correctAnswers: number;
  totalQuestions: number;
  timeDistribution: number[];
  changesDistribution: number[];
  focusPatterns: string;
  recommendation: string;
};

const AdaptiveQuiz = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerChanges, setAnswerChanges] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [changePerQuestion, setChangePerQuestion] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 1,
      text: "A train travels at 80 miles per hour. How far will it travel in 3.5 hours?",
      options: ["260 miles", "280 miles", "300 miles", "320 miles"],
      correctAnswer: 1,
    },
    {
      id: 2,
      text: "Which of the following words is spelled correctly?",
      options: ["accommodate", "acommodate", "accomodate", "acomodate"],
      correctAnswer: 0,
    },
    {
      id: 3,
      text: "If 3x + 7 = 22, what is the value of x?",
      options: ["3", "5", "7", "9"],
      correctAnswer: 1,
    },
    {
      id: 4,
      text: "Read the following paragraph:\n\nThe quick brown fox jumps over the lazy dog. The dog was so lazy that it didn't even move when the fox jumped. After jumping, the fox ran into the forest.\n\nWhat did the fox do after jumping?",
      options: [
        "It slept",
        "It ate the dog",
        "It ran into the forest",
        "It jumped again"
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      text: "Choose the word that best completes the analogy:\n\nTree is to Forest as Star is to _____",
      options: ["Sky", "Galaxy", "Shine", "Planet"],
      correctAnswer: 1,
    }
  ];

  const startQuiz = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    setAnswers(Array(questions.length).fill(null));
    setTimePerQuestion(Array(questions.length).fill(0));
    setChangePerQuestion(Array(questions.length).fill(0));
  };

  const handleOptionChange = (value: number) => {
    if (selectedOption !== null) {
      setAnswerChanges(answerChanges + 1);
      const newChanges = [...changePerQuestion];
      newChanges[currentQuestionIndex] = (newChanges[currentQuestionIndex] || 0) + 1;
      setChangePerQuestion(newChanges);
    }
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }

    // Record the time spent on this question
    if (startTime) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const newTimes = [...timePerQuestion];
      newTimes[currentQuestionIndex] = timeSpent;
      setTimePerQuestion(newTimes);
    }

    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);

    // Move to next question or submit
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setStartTime(Date.now());
    } else {
      submitQuiz(newAnswers);
    }
  };

  const submitQuiz = (finalAnswers: (number | null)[]) => {
    setIsSubmitting(true);

    // In a real app, you would send this data to the backend for analysis
    setTimeout(() => {
      // Calculate results
      const correctCount = finalAnswers.reduce((acc, answer, index) => {
        return answer === questions[index].correctAnswer ? acc + 1 : acc;
      }, 0);

      // Analyze time and change patterns
      const averageTime = timePerQuestion.reduce((acc, time) => acc + time, 0) / timePerQuestion.length;
      const maxTime = Math.max(...timePerQuestion);
      const maxTimeIndex = timePerQuestion.indexOf(maxTime);
      
      const totalChanges = changePerQuestion.reduce((acc, changes) => acc + changes, 0);
      const maxChanges = Math.max(...changePerQuestion);
      const maxChangesIndex = changePerQuestion.indexOf(maxChanges);

      // Generate feedback based on patterns
      let focusPattern = "Your focus pattern appears typical.";
      let recommendation = "Continue with standard learning approaches.";

      if (maxTime > averageTime * 2) {
        focusPattern = "You spent significantly more time on question #" + (maxTimeIndex + 1) + ". This could indicate difficulty with that concept.";
        recommendation = "Consider additional practice with " + (maxTimeIndex === 1 || maxTimeIndex === 3 ? "reading comprehension" : "mathematical concepts") + ".";
      }

      if (totalChanges > questions.length * 2) {
        focusPattern += " You changed your answers frequently, which may indicate uncertainty.";
        recommendation += " Practice building confidence in your answers through deliberate practice.";
      }

      if (correctCount <= 2) {
        recommendation = "Consider a more comprehensive learning assistance program to address multiple areas.";
      }

      setQuizResult({
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        timeDistribution: timePerQuestion,
        changesDistribution: changePerQuestion,
        focusPatterns: focusPattern,
        recommendation: recommendation
      });

      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Adaptive Quiz | Learnlytic Assist</title>
        <meta 
          name="description" 
          content="Take our adaptive quiz to identify learning patterns and potential disabilities" 
        />
      </Helmet>
      
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Adaptive Quiz</h1>
          <p className="mt-4 text-gray-600">
            Our AI analyzes your quiz-taking behavior to identify potential learning patterns.
          </p>
        </div>
        
        {!isStarted && !quizResult && (
          <Card>
            <CardHeader>
              <CardTitle>Behavioral Assessment Quiz</CardTitle>
              <CardDescription>
                This quiz contains 5 questions covering different subjects. Our AI will analyze not just your answers, but also your behavior while taking the quiz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This quiz tracks how long you spend on each question and how often you change your answers to detect potential learning patterns.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-500" />
                  <p className="text-sm text-gray-700">Takes approximately 5-10 minutes to complete</p>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="text-gray-500" />
                  <p className="text-sm text-gray-700">Contains math, reading, and problem-solving questions</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startQuiz} className="bg-purple-600 hover:bg-purple-700">
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {isStarted && !quizResult && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span id="timer">Tracking time</span>
                </Badge>
              </div>
              <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
                  <TextToSpeech 
                    text={questions[currentQuestionIndex].text}
                    buttonSize="icon"
                  />
                </div>
                <CardDescription className="text-base whitespace-pre-line">
                  {questions[currentQuestionIndex].text}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedOption?.toString()} onValueChange={(value) => handleOptionChange(parseInt(value))}>
                  <div className="space-y-4">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="text-base">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleNextQuestion} 
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={selectedOption === null}
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Submit Quiz"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {isSubmitting && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Analyzing your responses...</h3>
            <p className="text-gray-600">Our AI is processing your answers and behavior patterns.</p>
          </div>
        )}
        
        {quizResult && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>
                  Analysis of your answers and quiz-taking behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Score</h3>
                    <span className="text-lg font-medium">
                      {quizResult.correctAnswers} / {quizResult.totalQuestions}
                    </span>
                  </div>
                  <Progress 
                    value={(quizResult.correctAnswers / quizResult.totalQuestions) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Time Spent per Question</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {quizResult.timeDistribution.map((time, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-purple-200 w-full" 
                          style={{ 
                            height: `${Math.min(100, time * 3)}px`,
                            minHeight: '20px'
                          }}
                        ></div>
                        <p className="text-xs mt-1">Q{index + 1}</p>
                        <p className="text-xs text-gray-600">{time}s</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Answer Changes per Question</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {quizResult.changesDistribution.map((changes, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-200 w-full" 
                          style={{ 
                            height: `${Math.min(100, changes * 20)}px`,
                            minHeight: '20px'
                          }}
                        ></div>
                        <p className="text-xs mt-1">Q{index + 1}</p>
                        <p className="text-xs text-gray-600">{changes}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Alert className="bg-purple-50 border-purple-200">
                  <AlertTitle className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
                    Behavioral Analysis
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {quizResult.focusPatterns}
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Recommendation
                  </AlertTitle>
                  <AlertDescription className="mt-2">
                    {quizResult.recommendation}
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  setIsStarted(false);
                  setQuizResult(null);
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                }}>
                  Retake Quiz
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <a href="/learning-plan">View Learning Plan</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default AdaptiveQuiz;
