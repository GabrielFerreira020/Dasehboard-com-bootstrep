export function initRouter(onRouteChange) {
    const handleHashChange = () => {
        // Extrai o nome da rota (ex: #/novo -> novo)
        const hash = window.location.hash.replace('#/', '').replace('#', '') || 'dashboard';
        
        // Atualiza classe 'active' nos links da sidebar
        document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => {
            if (link.dataset.route === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Chama o callback passando o nome da rota atual
        onRouteChange(hash);
    };

    // Intercepta cliques em qualquer link com data-route para garantir a mudança de hash
    document.querySelectorAll('#sidebar-menu .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const route = link.dataset.route;
            if (route) {
                e.preventDefault();
                window.location.hash = '#' + route;
            }
        });
    });

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('DOMContentLoaded', handleHashChange);
}