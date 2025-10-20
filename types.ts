
export type View = 'start' | 'questionnaire' | 'results';

export interface AnswerOption {
  text: string;
  value: number;
}

export interface QuestionData {
  id: number;
  part: 'A' | 'B';
  text: string;
  shadedThreshold: number;
}

export type Answers = {
  [key: number]: number;
};
