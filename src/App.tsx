import { useEffect, useReducer } from "react";
import ErrorMessage from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import NextButton from "./components/NextButton";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import { AppActions, QuizState } from "./types/types";

// =========> use case study <===========
// type Increment = { type: 'increment'; payload: number };
// type Random = { type: 'random' };

// type AppActions = Increment | Random;
// ----------------------------------------

const initialState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state: QuizState, action: AppActions): QuizState => {
  const question = state.questions.at(state.index);

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startGame":
      return { ...state, status: "active" };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "reset":
      return initialState;
    default:
      throw new Error("Unkown action type.");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status, index, answer } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.slice(0, 2) })
      )
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
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
