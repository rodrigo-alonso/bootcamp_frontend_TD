<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container">
      <span class="navbar-brand">Mini CRUD Vue</span>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse"
           id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active"
                        to="/formulario">Formulario</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link"
                        to="/registros">Registros</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  text-decoration: none;
}
</style>
