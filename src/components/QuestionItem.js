import React from "react";

function QuestionItem({ question, onUpdateQuestion, reset, data }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    // DELETE request
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(id,data)
        let newData = data.filter(item=>item.id !== id)
        console.log(newData)
        reset(newData)
      })
      .catch((error) => console.log(error));
  }

  function handleUpdate(e) {
    const updatedQuestion = { ...question, correctIndex: e.target.value };
    // PATCH request
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the correctIndex property of the corresponding question object
        onUpdateQuestion(data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
