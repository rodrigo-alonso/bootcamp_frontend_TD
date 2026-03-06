export function useEmail() {
  const validaEmail = (email) => {
    const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex_email.test(email);
  }

  return { validaEmail }; // Retorna funcion q se puede usar
};