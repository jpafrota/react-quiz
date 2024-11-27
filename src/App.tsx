import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMessage from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';

// =========> use case study <===========
// type Increment = { type: 'increment'; payload: number };
// type Random = { type: 'random' };

// type AppActions = Increment | Random;
// ----------------------------------------

// =====> Types
type Statuses = 'loading' | 'error' | 'ready' | 'active' | 'finished';

type Questions = QuestionType[];

export type QuestionType = {
  question: string;
  options: Array<string>;
  correctOption: number;
  points: number;
};

type QuizState = {
  questions: Questions;
  status: Statuses;
  index: number;
  answer: number | null;
  points: number;
};

type DataReceived = {
  type: 'dataReceived';
  payload: Questions;
};

type DataFailed = {
  type: 'dataFailed';
};

type Reset = {
  type: 'reset';
};

type StartGame = {
  type: 'startGame';
};

type UpdateAnswer = {
  type: 'newAnswer';
  payload: number;
};

type NextQuestion = {
  type: 'nextQuestion';
};

export type AppActions =
  | DataReceived
  | DataFailed
  | StartGame
  | Reset
  | NextQuestion
  | UpdateAnswer;

const initialState: QuizState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state: QuizState, action: AppActions): QuizState => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'startGame':
      return { ...state, status: 'active' };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unkown action type.');
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer } = state;

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: 'dataReceived', payload: data.slice(0, 2) })
      )
      .catch((error) => dispatch({ type: 'dataFailed' }));
  }, []);

  const numQuestions = questions.length;

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
