import { defineStore } from "pinia";
import { db } from '../services/firebaseService'; // Es la base de datos a la que conectamos

// Importar metodos relacionados con firebase
// colection: manejar coleccion como datos
// addDoc: agregar un nuevo documento a la coleccion
// getDocs: obtener los documentos de la coleccion
// deleteDoc: eliminar un documento de la coleccion
// updateDoc: actualizar un documento de la coleccion
// doc: obtener una referencia a un documento específico en la colección
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, where } from "firebase/firestore";

/*
TIPS: 
- Por cada tipo de entidad se define un store, en este caso un store para usuarios. Esto permite una mejor organización 
del código y una gestión más eficiente del estado de cada tipo de entidad en la aplicación.
- Pinia esta entre la aplicacion y la base de datos, es una capa intermedia que se encarga de manejar el estado de los 
usuarios y las operaciones relacionadas con ellos, como cargar, agregar, eliminar y actualizar usuarios en la base de datos.
*/

/*
Users Store se encarga de manejar el estado de los usuarios, incluyendo la carga, adición, eliminación y actualización 
de usuarios en la base de datos.
Es una capa intermedia entre la base de datos y los componentes de la aplicación, permitiendo una gestión centralizada 
del estado de los usuarios.
Con pinia ya no se usa props ni emit, sino que se accede directamente a los métodos del store para interactuar con el 
estado de los usuarios.
*/
export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),

  actions: {
    // Cargar los usuarios desde la base de datos y almacenarlos en el estado del store.
    async loadUsers() {
      const snapshot = await getDocs(collection(db, 'users'))
      this.users = snapshot.docs.map(e => ({
        id: e.id,
        ...e.data()
      }))
    },

    // Agregar un nuevo usuario a la base de datos y actualizar el estado del store con el nuevo usuario.
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

      // Agregar el nuevo usuario a la colección "users" en la base de datos y obtener la referencia del documento creado.
      const docRef = await addDoc(collection(db, "users"), userData)
      this.users.push({
        id: docRef.id,
        ...userData // Agregar los datos del nuevo usuario al estado del store (spread operator)
      })
    },

    // Eliminar un usuario de la base de datos utilizando su ID y actualizar el estado del store para reflejar la eliminación.
    async deleteUser(id) {
      await deleteDoc(doc(db, 'users', id));
      this.users = this.users.filter(e => e.id !== id);
    },

    // Actualizar un usuario en la base de datos utilizando su ID y los nuevos datos, y 
    // luego actualizar el estado del store para reflejar los cambios.
    async updateUser(id, data) {
      try {
        const ref = doc(db, 'users', id);
        await updateDoc(ref, data);
        const index = this.users.findIndex(e => e.id === id);
        if (index !== -1) {
          this.users[index] = { id, ...data }
        };
      } catch (error) {
        console.error('Error actualizando usuario', error);
        throw error; // Re-lanzar el error para que pueda ser manejado por el componente que llama a esta función
      }

    }
  },
  
  // Método para verificar si un email o rut ya existe en la base de datos, excluyendo el usuario actual (en caso de edición).
  userExists(email, rut, currentId = null) {
    const emailExists = this.users.some(u =>
      u.email === email && u.id !== currentId
    )
    const rutExists = this.users.some(u =>
      u.rut === rut && u.id !== currentId
    )
    return { emailExists, rutExists } // retorna un objeto { emailExists, rutExists } con los resultados de las verificaciones
  }
});