import { defineStore } from "pinia";
import { auth } from "../services/firebaseService";
// onAuthStateChanged = Metodo para detectar q si usuario esta logeado, no le solicita volver a logearse
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: true
  }),
  actions: {
    async register(email, password) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      this.user = res.user;
    },

    async login(email, password) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      this.user = res.user;
    },

    async logout() {
      await signOut(auth);
      this.user = null;
    },

    initAuth() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        this.loading = false;
      })
    }
  }

});
