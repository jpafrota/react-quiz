import { AppActions } from '../App';

type INextButtonProps = {
  dispatch: (value: AppActions) => void;
  answer: number | null;
};
function NextButton({ dispatch, answer }: INextButtonProps) {
  if (answer === null) return null;
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}>
      Next Question
    </button>
  );
}

export default NextButton;
