import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUsersStore } from "../../../stores/usersStore";

describe('usersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it ("Agregar usuario", () => {
    const store = useUsersStore();
    store.users.push({nombre: "Juan"});
    expect(store.users.length).toBe(1);
  });

  it ("Detectar email duplicado", () => {
    const store = useUsersStore();
    store.users.push({email: "test@test.com", rut:"12345678-9", id: "1"});
    const result = store.userExists("test@test.com", "1");
    expect(result).toBe(true);
  });

  
});