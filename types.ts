
export enum AppMode {
  STUDY_GEN = 'Study Material',
  MCQ_GEN = 'MCQ Generator', // New: Only generates MCQs
  PAPER_CHECKER = 'Paper Checker',
  MATH_SOLVER = 'Math Solver',
  GRAPH_GEN = 'Graph Plotter', // New: Focus on Graphing
  GUESS_PAPER = 'Guess Paper'
}

export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QA {
  question: string;
  answer: string;
}

export interface PaperCheckResult {
  obtainedMarks: string;
  totalMarks: string;
  feedback: string;
  mistakes: string[];
  corrections: string[];
}

export interface GraphPoint {
  x: number;
  y: number;
}

export interface MathGraph {
  title: string;
  dataPoints: GraphPoint[];
  xLabel: string;
  yLabel: string;
}

export interface GuessPaper {
  importantTopics: string[];
  expectedQuestions: string[];
}

export interface AIResponse {
  subject: string;
  topic?: string;
  mcqs?: MCQ[];
  shortQuestions?: QA[];
  longQuestions?: QA[];
  paperCheck?: PaperCheckResult;
  guessPaper?: GuessPaper;
  mathSolution?: {
    steps: string[];
    finalAnswer: string;
  };
  graphData?: MathGraph;
  generalExplanation?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text?: string;
  imageUri?: string; // For display purposes
  content?: AIResponse;
}
