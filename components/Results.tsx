
import React from 'react';
import type { Answers } from '../types';
import { generatePdf } from '../services/pdfService';
import { QUESTIONS, ANSWERS_OPTIONS } from '../constants';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultsProps {
  score: number;
  interpretation: string;
  context: string;
  answers: Answers;
  age: string;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, interpretation, context, answers, age, onRestart }) => {
  const resultColor = score >= 4 ? 'bg-orange-100 border-orange-500 text-orange-800' : 'bg-green-100 border-green-500 text-green-800';

  const formatContext = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('* **') || paragraph.startsWith('**')) {
        const cleanText = paragraph.replace(/\*/g, '').trim();
        return <li key={index} className="mb-2 list-disc ml-6">{cleanText}</li>;
      }
      if (paragraph.startsWith('*')) {
        const cleanText = paragraph.replace(/\*/g, '').trim();
        return <h3 key={index} className="text-xl font-semibold text-slate-700 mt-4 mb-2">{cleanText}</h3>;
      }
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div id="pdf-content">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800">Your ASRS Screening Results</h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-slate-700 border-b pb-3 mb-4">Screening Summary</h2>
          <div className={`p-4 rounded-lg border-l-4 ${resultColor} mb-6`}>
            <p className="font-bold">Part A Score: {score} out of 6</p>
            <p>{interpretation}</p>
          </div>
           <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md text-left">
              <h3 className="font-bold">Important Disclaimer</h3>
              <p>This screening tool is not a substitute for a professional diagnosis. The information provided here is for educational purposes. Please consult with a doctor or mental health professional to discuss your results and any concerns you may have.</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-slate-700 border-b pb-3 mb-4">General Information about ADHD in Adults</h2>
          <div className="prose max-w-none text-slate-600">
              {formatContext(context)}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-700 border-b pb-3 mb-6">Your Responses</h2>
            <div className="space-y-4">
                {QUESTIONS.map(q => {
                    const answerValue = answers[q.id];
                    const answerText = ANSWERS_OPTIONS.find(opt => opt.value === answerValue)?.text || 'Not Answered';
                    const isShaded = answerValue >= q.shadedThreshold;
                    return (
                        <div key={q.id} className="p-4 border border-slate-200 rounded-lg">
                            <p className="font-semibold text-slate-800">{q.id}. {q.text}</p>
                            <p className={`mt-1 ${isShaded ? 'font-bold text-blue-600' : 'text-slate-600'}`}>
                                Your answer: {answerText} {isShaded && '(falls in shaded area)'}
                            </p>
                        </div>
                    );
                })}
                <div className="p-4 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-slate-800">How old were you when these problems first began to occur?</p>
                    <p className="mt-1 text-slate-600">Your answer: {age || 'Not Answered'}</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => generatePdf('adhd-asrs-results.pdf')}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg shadow-md"
        >
          <DownloadIcon />
          Download PDF Summary
        </button>
        <button
          onClick={onRestart}
          className="w-full sm:w-auto bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-300 transition-colors duration-300 text-lg"
        >
          Start Over
        </button>
      </div>

    </div>
  );
};

export default Results;
