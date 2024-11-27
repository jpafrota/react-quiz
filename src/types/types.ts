// =====> Types
export type Statuses = "loading" | "error" | "ready" | "active" | "finished";

export type Questions = QuestionType[];

export type QuestionType = {
  question: string;
  options: Array<string>;
  correctOption: number;
  points: number;
};

export type QuizState = {
  questions: Questions;
  status: Statuses;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
};

export type DataReceived = {
  type: "dataReceived";
  payload: Questions;
};

export type DataFailed = {
  type: "dataFailed";
};

export type Restart = {
  type: "restart";
};

export type StartGame = {
  type: "startGame";
};

export type UpdateAnswer = {
  type: "newAnswer";
  payload: number;
};

export type NextQuestion = {
  type: "nextQuestion";
};

export type FinishGame = {
  type: "finish";
};

export type AppActions =
  | DataReceived
  | DataFailed
  | StartGame
  | FinishGame
  | Restart
  | NextQuestion
  | UpdateAnswer;
