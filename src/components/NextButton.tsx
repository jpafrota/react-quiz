import { AppActions } from "../types/types";

type INextButtonProps = {
  dispatch: (value: AppActions) => void;
  answer: number | null;
  index: number;
  numQuestions: number;
};
function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: INextButtonProps) {
  if (answer === null) return null;

  if (index !== numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next Question
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
