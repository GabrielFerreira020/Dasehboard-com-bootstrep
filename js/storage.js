const DB_KEY = 'meu_app_itens';

export const storage = {
  // Buscar todos os itens registrados
  getAll() {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar do LocalStorage:", error);
      return [];
    }
  },

  // Salvar um novo item
  save(item) {
    const items = this.getAll();
    const newItem = {
      id: Date.now().toString(),
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      ...item
    };
    items.push(newItem);
    localStorage.setItem(DB_KEY, JSON.stringify(items));
    return newItem;
  },

  // Deletar um item pelo ID
  delete(id) {
    let items = this.getAll();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(items));
  }
};