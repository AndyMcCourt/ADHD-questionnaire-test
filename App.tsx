
import React, { useState, useCallback } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { getAdhdContext } from './services/geminiService';
import { QUESTIONS, ANSWERS_OPTIONS } from './constants';
import type { Answers, View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('start');
  const [answers, setAnswers] = useState<Answers>({});
  const [age, setAge] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [interpretation, setInterpretation] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const calculateScore = useCallback((currentAnswers: Answers) => {
    const partAQuestions = QUESTIONS.filter(q => q.part === 'A');
    const partAScore = partAQuestions.reduce((acc, question) => {
      const answerValue = currentAnswers[question.id];
      if (answerValue !== undefined && answerValue >= question.shadedThreshold) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(partAScore);

    if (partAScore >= 4) {
      setInterpretation("Your responses to Part A suggest that your symptoms are highly consistent with ADHD in adults. It is recommended that you share these results with a healthcare professional for a comprehensive evaluation.");
    } else {
      setInterpretation("Your responses to Part A suggest that your symptoms may not be consistent with ADHD in adults. However, if you have concerns about your attention or behavior, it is still advisable to speak with a healthcare professional.");
    }
  }, []);

  const handleSubmit = useCallback(async (currentAnswers: Answers, currentAge: string) => {
    setIsLoading(true);
    setAnswers(currentAnswers);
    setAge(currentAge);
    calculateScore(currentAnswers);

    try {
      const geminiContext = await getAdhdContext();
      setContext(geminiContext);
    } catch (error) {
      console.error("Error fetching context from Gemini:", error);
      setContext("Could not load additional context. Please check your connection or API key. Speaking with a doctor is the best course of action for any health concerns.");
    } finally {
      setIsLoading(false);
      setView('results');
    }
  }, [calculateScore]);

  const handleStart = () => {
    setView('questionnaire');
  };
  
  const handleRestart = () => {
    setAnswers({});
    setAge('');
    setScore(0);
    setInterpretation('');
    setContext('');
    setView('start');
  };

  const renderContent = () => {
    switch (view) {
      case 'questionnaire':
        return <Questionnaire onSubmit={handleSubmit} />;
      case 'results':
        return (
          <Results
            score={score}
            interpretation={interpretation}
            context={context}
            answers={answers}
            age={age}
            onRestart={handleRestart}
          />
        );
      case 'start':
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Adult ADHD Self-Report Scale</h1>
                <p className="text-slate-600 mb-6">This is an interactive version of the ASRS-v1.1 Symptom Checklist. Please answer the questions based on how you have felt and conducted yourself over the past 6 months.</p>
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md text-left mb-8">
                    <h2 className="font-bold">Disclaimer</h2>
                    <p>This is a screening tool and not a diagnostic test. The results are for informational purposes only and should not replace a consultation with a qualified healthcare professional.</p>
                </div>
                <button
                    onClick={handleStart}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg"
                >
                    Start Questionnaire
                </button>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans antialiased text-slate-700">
        {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <p className="text-slate-600 text-lg">Analyzing results and preparing your summary...</p>
                </div>
            </div>
        ) : renderContent()}
    </main>
  );
};

export default App;
