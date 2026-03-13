import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Se quiere conectar al emulador que esta en el pc local (firebase local)

// Configuracion de firebase emulator
const firebaseConfig = {
  //apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Segun documentacion puede ser un apikey fake
  apiKey: "api-key-fake",
  authDomain: "demo-test.firebaseapp.com",
  projectId: "demo-test",
}

let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);

connectAuthEmulator(auth, 'http://localhost:9099');
connectFirestoreEmulator(db, 'localhost', 8080);