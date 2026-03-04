import { defineStore } from "pinia";
import { db } from '../services/firebase'; // Es la base de datos a la que conectamos

// Importar metodos relacionados con firebase
// colection: manejar coleccion como datos
// addDoc: agregar dato
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),

  actions: {
    async loadUsers() {
      const snapshot = await getDocs(collection(db, 'users'))
      this.users = snapshot.docs.map(e => ({
        id: d.id,
        ...d.data()
      }))
    },

    async addUser(user) {
      const userData = {
        nombre: user.nombre,
        apellido: user.apellido,
        dob: user.dob,
        genero: user.genero,
        email: user.email,
        password: user.password,
        foto: user.foto,
        pais: user.pais,
        hobbies: user.hobbies || [],
        terminos: user.terminos
    
      }

      const docRef = await addDoc(collection(db, "users"), userData)
      this.users.push({
        id: docRef.id,
        ...userData
      })
    },

    async deleteUser(id) {
      await deleteDoc(doc(db, 'users', id));
      this.users = this.users.filter(e => e.id !== id);
    },

    async updateUser(id) {
      await updateDoc(doc(db, 'users', id));
      const index = this.user.findIndex(e => e.id === id);
      this.user[index] = {id, ...data}   
    }
  }
});