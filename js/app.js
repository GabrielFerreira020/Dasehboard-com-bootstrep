import { initRouter } from './router.js';
import { templates } from './templates.js';
import { storage } from './storage.js';

const contentArea = document.getElementById('content-area');

// Verifica se existe usuário logado na sessão atual
function getUsuarioLogado() {
    return JSON.parse(localStorage.getItem('usuario_logado'));
}

// Renderiza a tela baseada na rota ativa
function renderView(route) {
    const usuarioLogado = getUsuarioLogado();

    // Rotas protegidas que exigem login
    const rotasProtegidas = ['dashboard', 'novo', 'listar'];

    if (rotasProtegidas.includes(route) && !usuarioLogado) {
        alert('Por favor, faça login para aceder a esta página.');
        window.location.hash = '#login';
        return;
    }

    // Se já estiver logado e tentar ir para login/cadastro, redireciona para o dashboard
    if ((route === 'login' || route === 'cadastro') && usuarioLogado) {
        window.location.hash = '#dashboard';
        return;
    }

    const items = storage.getAll();

    if (route === 'dashboard') {
        contentArea.innerHTML = templates.dashboard(items, usuarioLogado);
    } else if (route === 'novo') {
        contentArea.innerHTML = templates.novo();
        bindFormEvents();
    } else if (route === 'listar') {
        contentArea.innerHTML = templates.listar(items);
        bindListEvents();
    } else if (route === 'login') {
        contentArea.innerHTML = templates.login();
        bindLoginEvents();
    } else if (route === 'cadastro') {
        contentArea.innerHTML = templates.cadastro();
        bindCadastroEvents();
    } else {
        window.location.hash = usuarioLogado ? '#dashboard' : '#login';
    }
}

// Evento de submissão do formulário de itens
function bindFormEvents() {
    const form = document.getElementById('form-item');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = {
            titulo: document.getElementById('titulo').value,
            categoria: document.getElementById('categoria').value,
            prioridade: document.getElementById('prioridade').value
        };

        storage.save(newItem);
        window.location.hash = '#listar';
    });
}

// Evento para exclusão de itens na tabela
function bindListEvents() {
    contentArea.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            if (confirm('Deseja realmente remover este item?')) {
                storage.delete(id);
                renderView('listar');
            }
        }
    });
}

// Evento de submissão do Login
function bindLoginEvents() {
    const form = document.getElementById('form-login');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios_app')) || [];
        const usuarioEncontrado = usuarios.find(u => u.email === email && u.senha === senha);

        if (usuarioEncontrado) {
            // Salva a sessão ativa
            localStorage.setItem('usuario_logado', JSON.stringify(usuarioEncontrado));
            alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}!`);
            window.location.hash = '#dashboard';
            atualizarMenuSidebar();
        } else {
            alert('E-mail ou senha incorretos. Verifique os dados inseridos.');
        }
    });
}

// Evento de submissão do Cadastro de Usuário
function bindCadastroEvents() {
    const form = document.getElementById('form-cadastro-usuario');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const novoUsuario = {
            id: Date.now().toString(),
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        };

        const usuarios = JSON.parse(localStorage.getItem('usuarios_app')) || [];
        
        if (usuarios.some(u => u.email === novoUsuario.email)) {
            alert('Este e-mail já está registado no sistema!');
            return;
        }

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios_app', JSON.stringify(usuarios));

        alert('Conta criada com sucesso! Faça o login.');
        window.location.hash = '#login';
    });
}

// Função auxiliar para gerir o menu lateral com base na sessão
function atualizarMenuSidebar() {
    const usuarioLogado = getUsuarioLogado();
    const sidebarMenu = document.getElementById('sidebar-menu');
    if (!sidebarMenu) return;

    if (usuarioLogado) {
        sidebarMenu.innerHTML = `
            <li class="nav-item mb-1"><a href="#dashboard" class="nav-link text-white" data-route="dashboard"><i class="bi bi-speedometer2 me-2"></i> Dashboard</a></li>
            <li class="nav-item mb-1"><a href="#novo" class="nav-link text-white" data-route="novo"><i class="bi bi-plus-circle me-2"></i> Novo Item</a></li>
            <li class="nav-item mb-1"><a href="#listar" class="nav-link text-white" data-route="listar"><i class="bi bi-list-task me-2"></i> Listar Itens</a></li>
            <li class="nav-item mt-4"><button id="btn-logout" class="btn btn-outline-danger w-100"><i class="bi bi-box-arrow-right me-2"></i> Terminar Sessão</button></li>
        `;

        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('usuario_logado');
            alert('Sessão encerrada com sucesso.');
            window.location.hash = '#login';
            atualizarMenuSidebar();
        });
    } else {
        sidebarMenu.innerHTML = `
            <li class="nav-item mb-1"><a href="#login" class="nav-link text-white" data-route="login"><i class="bi bi-box-arrow-in-right me-2"></i> Login</a></li>
            <li class="nav-item mb-1"><a href="#cadastro" class="nav-link text-white" data-route="cadastro"><i class="bi bi-person-plus me-2"></i> Cadastro</a></li>
        `;
    }
}

// Inicializa o router e o menu ao carregar a página
initRouter(renderView);
atualizarMenuSidebar();

// Ouve mudanças de hash para atualizar os menus e estados
window.addEventListener('hashchange', atualizarMenuSidebar);