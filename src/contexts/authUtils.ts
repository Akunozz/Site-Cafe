export function logout() {
    localStorage.removeItem("userData");
    window.location.href = "/"; // Redireciona para a tela de login
  }
  