import Quiz from '../components/Quiz';

const sampleQuestions = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2
  },
  {
    question: "Quelle est la capitale de l'Allemagne ?",
    options: ["Berlin", "Munich", "Hambourg", "Francfort"],
    correctAnswer: 0
  }
];

const Page = () => {
  return (
    <div>
      <h1>Bienvenue dans l'application Quiz !</h1>
      <Quiz questions={sampleQuestions} />
    </div>
  );
};

export default Page;
