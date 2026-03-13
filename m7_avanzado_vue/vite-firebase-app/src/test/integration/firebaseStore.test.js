import { describe, it, expect } from "vitest";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../setup/firebaseTestSetup";

describe("Firestore integration", () => {
  it ("Crear un usuario (registro) en firestore", async () => {
    const userData = {
      rut: '15338424-5',
      nombre: 'Esteban',
      apellido: 'Dido',
      email: 'esteban.dido@mail.com'
    }
    const docRef = await addDoc(collection(db, 'users'), userData);
    expect(docRef.id).toBeDefined(); //Esperamos que nos devuelva un id
  });

  it ("Leer usuarios registrados desde Firestore", async () => {
    const snapshot = await getDocs(collection(db, 'users'))
    console.log(snapshot.docs.map(d => d.data()));
    expect(snapshot.docs.length).toBeGreaterThanOrEqual(1);
  });
});