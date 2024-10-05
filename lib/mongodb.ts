import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Veuillez définir la variable d\'environnement MONGODB_URI dans votre fichier .env.local');
}

// Utiliser un cache global pour éviter de reconnecter à chaque fois
let cached = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!);  // Suppression des options obsolètes
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
