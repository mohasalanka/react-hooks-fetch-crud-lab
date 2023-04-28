
import QuestionItem from "./QuestionItem"

function QuestionList({questions, set}) {

  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <QuestionItem key={question.id} question={question} reset={set} data={questions}/>
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
