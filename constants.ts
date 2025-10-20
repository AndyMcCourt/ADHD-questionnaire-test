
import type { QuestionData, AnswerOption } from './types';

export const ANSWERS_OPTIONS: AnswerOption[] = [
  { text: 'Never', value: 0 },
  { text: 'Rarely', value: 1 },
  { text: 'Sometimes', value: 2 },
  { text: 'Often', value: 3 },
  { text: 'Very Often', value: 4 },
];

export const QUESTIONS: QuestionData[] = [
  // Part A
  { id: 1, part: 'A', text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?', shadedThreshold: 3 },
  { id: 2, part: 'A', text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?', shadedThreshold: 3 },
  { id: 3, part: 'A', text: 'How often do you have problems remembering appointments or obligations?', shadedThreshold: 3 },
  { id: 4, part: 'A', text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?', shadedThreshold: 2 },
  { id: 5, part: 'A', text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?', shadedThreshold: 2 },
  { id: 6, part: 'A', text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?', shadedThreshold: 2 },
  // Part B
  { id: 7, part: 'B', text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?', shadedThreshold: 3 },
  { id: 8, part: 'B', text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?', shadedThreshold: 3 },
  { id: 9, part: 'B', text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?', shadedThreshold: 2 },
  { id: 10, part: 'B', text: 'How often do you misplace or have difficulty finding things at home or at work?', shadedThreshold: 2 },
  { id: 11, part: 'B', text: 'How often are you distracted by activity or noise around you?', shadedThreshold: 2 },
  { id: 12, part: 'B', text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?', shadedThreshold: 3 },
  { id: 13, part: 'B', text: 'How often do you feel restless or fidgety?', shadedThreshold: 2 },
  { id: 14, part: 'B', text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?', shadedThreshold: 3 },
  { id: 15, part: 'B', text: 'How often do you find yourself talking too much when you are in social situations?', shadedThreshold: 3 },
  { id: 16, part: 'B', text: 'When you\'re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?', shadedThreshold: 2 },
  { id: 17, part: 'B', text: 'How often do you have difficulty waiting your turn in situations when turn taking is required?', shadedThreshold: 3 },
  { id: 18, part: 'B', text: 'How often do you interrupt others when they are busy?', shadedThreshold: 2 },
];
