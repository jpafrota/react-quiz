import { AppActions, QuestionType } from "../types/types";

type IOptionsProps = {
  question: QuestionType;
  dispatch: (value: AppActions) => void;
  answer: number | null;
};

function Options({ question, dispatch, answer }: IOptionsProps) {
  const hasUserAnswered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((e, index) => (
        <button
          key={e + index}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasUserAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={hasUserAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default Options;
