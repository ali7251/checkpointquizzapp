import React from 'react';

interface HistoryItem {
  date: string; // Format de la date (par exemple, 'YYYY-MM-DD')
  score: number; // Score obtenu lors du quiz
  questions: number; // Nombre total de questions
}

interface HistoryProps {
  history: HistoryItem[]; // Liste des tentatives de l'utilisateur
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <div className="history">
      <h2>Historique des tentatives</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <p>Date : {item.date}</p>
            <p>Score : {item.score}</p>
            <p>Questions : {item.questions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
