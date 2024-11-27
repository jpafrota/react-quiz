import { AppActions } from '../App';

type IStartScreenProps = {
  numQuestions: number;
  dispatch: (value: AppActions) => void;
};

function StartScreen({ numQuestions, dispatch }: IStartScreenProps) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'startGame' })}>
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
