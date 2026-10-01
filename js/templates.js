export const templates = {
  // Tela de Dashboard (Visão Geral)
  dashboard: (items) => {
    const total = items.length;
    const prioridadeAlta = items.filter(i => i.prioridade === 'Alta').length;

    return `
      <h2 class="mb-4">Dashboard</h2>
      <div class="row g-4">
        <div class="col-md-6 col-lg-4">
          <div class="card text-white bg-primary shadow-sm">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-box"></i> Total de Itens</h5>
              <p class="card-text display-6 fw-bold">${total}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card text-white bg-danger shadow-sm">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-exclamation-triangle"></i> Alta Prioridade</h5>
              <p class="card-text display-6 fw-bold">${prioridadeAlta}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Tela de Formulário para Cadastro
  novo: () => `
    <h2 class="mb-4">Cadastrar Novo Item</h2>
    <div class="card shadow-sm col-lg-8">
      <div class="card-body">
        <form id="form-item">
          <div class="mb-3">
            <label for="titulo" class="form-label">Título/Nome</label>
            <input type="text" class="form-control" id="titulo" required placeholder="Ex: Comprar suprimentos">
          </div>
          <div class="mb-3">
            <label for="categoria" class="form-label">Categoria</label>
            <input type="text" class="form-control" id="categoria" required placeholder="Ex: Trabalho, Pessoal...">
          </div>
          <div class="mb-3">
            <label for="prioridade" class="form-label">Prioridade</label>
            <select class="form-select" id="prioridade" required>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">
            <i class="bi bi-check-lg"></i> Salvar no LocalStorage
          </button>
        </form>
      </div>
    </div>
  `,

  // Tela de Tabela de Listagem
  listar: (items) => `
    <h2 class="mb-4">Itens Cadastrados</h2>
    <div class="card shadow-sm">
      <div class="card-body p-0">
        ${items.length === 0 ? `
          <div class="p-4 text-center text-muted">
            <i class="bi bi-inbox fs-1 d-block mb-2"></i>
            Nenhum item cadastrado ainda.
          </div>
        ` : `
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Título</th>
                  <th>Categoria</th>
                  <th>Prioridade</th>
                  <th>Data</th>
                  <th class="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(item => `
                  <tr>
                    <td class="fw-bold">${item.titulo}</td>
                    <td><span class="badge bg-secondary">${item.categoria}</span></td>
                    <td>
                      <span class="badge bg-${item.prioridade === 'Alta' ? 'danger' : item.prioridade === 'Média' ? 'warning' : 'info'}">
                        ${item.prioridade}
                      </span>
                    </td>
                    <td>${item.dataCriacao}</td>
                    <td class="text-end">
                      <button class="btn btn-outline-danger btn-sm btn-delete" data-id="${item.id}">
                        <i class="bi bi-trash"></i> Excluir
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `,
  login: () => `
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <h2 class="mb-4 text-center">Login</h2>
                    <form id="form-login">
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" required placeholder="seu@email.com">
                        </div>
                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" required placeholder="********">
                        </div>
                        <button type="submit" class="btn btn-primary w-100 mb-3">
                            <i class="bi bi-box-arrow-in-right"></i> Entrar
                        </button>
                        <p class="text-center mb-0">Não tem uma conta? <a href="#cadastro">Cadastre-se</a></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
`,
cadastro: () => `
    <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-5">
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <h2 class="mb-4 text-center">Criar Conta</h2>
                    <form id="form-cadastro-usuario">
                        <div class="mb-3">
                            <label for="nome" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="nome" required placeholder="Seu nome">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">E-mail</label>
                            <input type="email" class="form-control" id="email" required placeholder="seu@email.com">
                        </div>
                        <div class="mb-3">
                            <label for="senha" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="senha" required placeholder="********">
                        </div>
                        <button type="submit" class="btn btn-success w-100 mb-3">
                            <i class="bi bi-person-plus"></i> Cadastrar
                        </button>
                        <p class="text-center mb-0">Já tem uma conta? <a href="#login">Faça login</a></p>
                    </form>
                </div>
            </div>
        </div>
    </div>
`
};