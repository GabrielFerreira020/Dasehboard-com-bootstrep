export function initRouter(onRouteChanged) {
  const handleHashChange = () => {
    // Extrai o nome da rota (ex: #/novo -> novo)
    const hash = window.location.hash.replace('#/', '') || 'dashboard';
    
    // Atualiza classe 'active' nos links da sidebar
    document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => {
      if (link.dataset.route === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Chama o callback passando o nome da rota atual
    onRouteChanged(hash);
  };

  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('DOMContentLoaded', handleHashChange);
}