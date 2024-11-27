import { AppActions, QuestionType } from '../types/types';
import Options from './Options';

type IQuestionProps = {
  question: QuestionType;
  dispatch: (value: AppActions) => void;
  answer: number | null;
};

function Question({ question, dispatch, answer }: IQuestionProps) {
  return (
    <div className='options'>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer}/>
      <p></p>
    </div>
  );
}

export default Question;
