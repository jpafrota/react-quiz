interface IProgressBarProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
  answer: number | null;
}
function ProgressBar({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: IProgressBarProps) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} points
      </p>
    </header>
  );
}

export default ProgressBar;
