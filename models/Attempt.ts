// models/Attempt.ts
import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema({
  user: {
    type: String,  // Identifiant ou email de l'utilisateur
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      correctAnswer: { type: Number, required: true },
      selectedAnswer: { type: Number, required: true },  // Réponse sélectionnée par l'utilisateur
    },
  ],
  score: {
    type: Number,  // Score total pour cette tentative
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,  // Date de la tentative
  },
});

export default mongoose.models.Attempt || mongoose.model('Attempt', AttemptSchema);
