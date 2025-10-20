
import React, { useState, useMemo } from 'react';
import { QUESTIONS, ANSWERS_OPTIONS } from '../constants';
import type { Answers, AnswerOption } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface QuestionProps {
  question: typeof QUESTIONS[0];
  currentAnswer?: number;
  onAnswerChange: (questionId: number, answerValue: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, currentAnswer, onAnswerChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4 transition-all duration-300 hover:shadow-md">
      <p className="text-lg text-slate-800 mb-4"><span className="font-bold">{question.id}.</span> {question.text}</p>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2">
        {ANSWERS_OPTIONS.map((option: AnswerOption) => (
          <button
            key={option.value}
            onClick={() => onAnswerChange(question.id, option.value)}
            className={`flex-1 min-w-[100px] text-sm sm:text-base text-center py-2 px-3 rounded-md transition-all duration-200 border-2 ${
              currentAnswer === option.value
                ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-100 hover:border-blue-300'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};


interface QuestionnaireProps {
  onSubmit: (answers: Answers, age: string) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Answers>({});
  const [age, setAge] = useState<string>('');
  
  const handleAnswerChange = (questionId: number, answerValue: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerValue }));
  };

  const completedCount = Object.keys(answers).length;
  const isComplete = completedCount === QUESTIONS.length;

  const partAQuestions = useMemo(() => QUESTIONS.filter(q => q.part === 'A'), []);
  const partBQuestions = useMemo(() => QUESTIONS.filter(q => q.part === 'B'), []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Symptom Checklist</h1>
        <p className="text-slate-500">Based on your experiences in the last 6 months.</p>
      </div>

      <div className="fixed top-0 left-0 right-0 h-2 bg-slate-200 z-10">
          <div 
              className="h-2 bg-blue-600 transition-all duration-300" 
              style={{ width: `${(completedCount / QUESTIONS.length) * 100}%` }}
          ></div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-blue-200 pb-2 mb-6">Part A</h2>
        {partAQuestions.map(q => (
          <Question key={q.id} question={q} currentAnswer={answers[q.id]} onAnswerChange={handleAnswerChange} />
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-700 border-b-2 border-blue-200 pb-2 mb-6">Part B</h2>
        {partBQuestions.map(q => (
          <Question key={q.id} question={q} currentAnswer={answers[q.id]} onAnswerChange={handleAnswerChange} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <label htmlFor="age" className="block text-lg text-slate-800 mb-2 font-semibold">How old were you when these problems first began to occur?</label>
        <input 
          id="age"
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g., 'Childhood', 'Teens', 'Around 25'"
          className="w-full p-3 border-2 border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <div className="text-center">
        <button
          onClick={() => onSubmit(answers, age)}
          disabled={!isComplete}
          className="inline-flex items-center gap-2 bg-green-600 text-white font-bold py-4 px-10 rounded-full hover:bg-green-700 transition-all duration-300 text-lg disabled:bg-slate-400 disabled:cursor-not-allowed shadow-lg disabled:shadow-none"
        >
          <CheckIcon />
          {isComplete ? 'See My Results' : `Answer ${QUESTIONS.length - completedCount} more questions`}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
