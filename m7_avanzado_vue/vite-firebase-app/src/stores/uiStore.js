import { defineStore } from "pinia";

// UI Store que se encarga de manejar el estado de la interfaz de usuario, como los mensajes de snackbar y su color.
export const useUiStore = defineStore("ui", {
  state: () => ({
    snackbar: false, // Snackbar es un componente de Vuetify que se utiliza para mostrar mensajes temporales en la pantalla, como notificaciones o alertas.
    message: "", // El mensaje que se mostrará en el snackbar, que puede ser un mensaje de éxito, error o advertencia.
    color: "success" // El color del snackbar, que puede ser "success" para mensajes de éxito, "error" para mensajes de error o "warning" para mensajes de advertencia.
  }),
  actions: () => ({
    showSucces(msg) {
      this.message = msg;
      this.color = "success";
      this.snackbar = true;
    },
    showError(msg) {
      this.message = msg;
      this.color = "error";
      this.snackbar = true;
    },
    showWarning(msg) {
      this.message = msg;
      this.color = "warning";
      this.snackbar = true;
    },
  })
});