import { defineStore } from "pinia";

// UI Store que se encarga de manejar el estado de la interfaz de usuario, como los mensajes de snackbar y su color.
export const useUiStore = defineStore("ui", {
  state: () => ({
    // Snackbar es un componente de Vuetify que se utiliza para mostrar mensajes temporales en la pantalla, como notificaciones o alertas.
    snackbar: false,
    message: "", // El mensaje que se mostrará en el snackbar
    color: "success", // El color del snackbar (error, warning, success, etc.)
    timeout: 3000, // El tiempo que el snackbar estará visible (en milisegundos)
    location: "bottom", // La ubicación del snackbar en la pantalla
    variant: "tonal", // El estilo del snackbar
    closable: true, // Indica si el snackbar se puede cerrar manualmente
    persistent: false, // Indica si el snackbar es persistente (no se cierra automáticamente)
  }),
  actions: () => ({
    showMessage(msg, color, timeout, location, variant, closable, persistent) {
      this.message = msg;
      this.color = color;
      this.timeout = timeout;
      this.location = location;
      this.variant = variant;
      this.closable = closable;
      this.persistent = persistent;
      this.snackbar = true;
    }
  })
});