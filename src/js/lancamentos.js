// Lista fictícia de lançamentos financeiros para demonstrar a tela.
const lancamentos = [
  { descricao: "Venda de produtos", categoria: "Vendas", data: "2026-10-22", valor: 2450.00, tipo: "receita", status: "pago" },
  { descricao: "Pagamento de aluguel", categoria: "Moradia", data: "2026-10-05", valor: 1800.00, tipo: "despesa", status: "pendente" },
  { descricao: "Serviço de consultoria", categoria: "Serviços", data: "2026-10-20", valor: 1200.00, tipo: "receita", status: "pendente" },
  { descricao: "Conta de energia", categoria: "Utilidades", data: "2026-10-10", valor: 386.42, tipo: "despesa", status: "pendente" },
  { descricao: "Internet empresarial", categoria: "Utilidades", data: "2026-10-18", valor: 129.90, tipo: "despesa", status: "pago" },
  { descricao: "Recebimento de cliente", categoria: "Clientes", data: "2026-10-21", valor: 3200.00, tipo: "receita", status: "pago" },
  { descricao: "Compra de materiais", categoria: "Suprimentos", data: "2026-10-12", valor: 547.80, tipo: "despesa", status: "pendente" },
  { descricao: "Mensalidade de software", categoria: "Tecnologia", data: "2026-10-23", valor: 89.90, tipo: "despesa", status: "pago" },
  { descricao: "Projeto de design", categoria: "Serviços", data: "2026-10-25", valor: 950.00, tipo: "receita", status: "pendente" },
  { descricao: "Manutenção de equipamentos", categoria: "Manutenção", data: "2026-10-08", valor: 420.00, tipo: "despesa", status: "pendente" },
  { descricao: "Rendimento de aplicação", categoria: "Investimentos", data: "2026-10-15", valor: 76.35, tipo: "receita", status: "pago" },
  { descricao: "Transporte e entregas", categoria: "Logística", data: "2026-10-24", valor: 215.60, tipo: "despesa", status: "pendente" },
  { descricao: "Venda pela internet", categoria: "Vendas", data: "2026-10-19", valor: 785.50, tipo: "receita", status: "pago" },
  { descricao: "Compra de material de escritório", categoria: "Escritório", data: "2026-10-14", valor: 164.75, tipo: "despesa", status: "pago" },
  { descricao: "Treinamento da equipe", categoria: "Treinamento", data: "2026-10-02", valor: 600.00, tipo: "despesa", status: "pendente" }
];

// Guarda referências aos elementos da página para atualizar a tabela.
const campoBusca = document.querySelector("#busca-descricao");
const filtroTipo = document.querySelector("#filtro-tipo");
const filtroCategoria = document.querySelector("#filtro-categoria");
const totalValores = document.querySelector("#total-valores");
const botaoLimpar = document.querySelector("#limpar-filtros");
const corpoTabela = document.querySelector("#tabela-lancamentos");
const totalRegistros = document.querySelector("#total-registros");
const resultadoTexto = document.querySelector("#resultado-texto");
const mensagemVazia = document.querySelector("#mensagem-vazia");

// Preenche o filtro com as categorias existentes, sem duplicações.
function preencherFiltroCategorias() {
  const categorias = [...new Set(lancamentos.map((lancamento) => lancamento.categoria))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  categorias.forEach((categoria) => {
    const opcao = document.createElement("option");
    opcao.value = categoria;
    opcao.textContent = categoria;
    filtroCategoria.appendChild(opcao);
  });
}

// Formata valores como moeda brasileira (Real).
const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

// Converte AAAA-MM-DD para DD/MM/AAAA sem depender do fuso horário do navegador.
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Obtém a data local de hoje no formato AAAA-MM-DD.
function obterHojeISO() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

// Identifica despesas pendentes cuja data já passou.
function obterStatus(lancamento) {
  if (
    lancamento.tipo === "despesa" &&
    lancamento.status === "pendente" &&
    lancamento.data < obterHojeISO()
  ) {
    return { texto: "Atrasado", classe: "atrasado" };
  }

  return {
    texto: lancamento.status === "pago" ? "Pago" : "Pendente",
    classe: lancamento.status
  };
}

// Cria uma célula de texto sem interpretar o conteúdo como HTML.
function criarCelula(texto, classe = "") {
  const celula = document.createElement("td");
  celula.textContent = texto;
  if (classe) celula.className = classe;
  return celula;
}

// Monta uma linha completa da tabela para um lançamento.
function criarLinha(lancamento) {
  const linha = document.createElement("tr");
  const tipoNome = lancamento.tipo === "receita" ? "Receita" : "Despesa";
  const status = obterStatus(lancamento);

  linha.appendChild(criarCelula(lancamento.descricao, "description-cell"));
  linha.appendChild(criarCelula(lancamento.categoria, "category-cell"));
  linha.appendChild(criarCelula(formatarData(lancamento.data)));

  // A etiqueta do tipo usa cores diferentes para receita e despesa.
  const celulaTipo = document.createElement("td");
  const etiquetaTipo = document.createElement("span");
  etiquetaTipo.className = `type-pill ${lancamento.tipo}`;
  etiquetaTipo.textContent = tipoNome;
  celulaTipo.appendChild(etiquetaTipo);
  linha.appendChild(celulaTipo);

  // O valor fica verde para receitas e vermelho para despesas.
  const celulaValor = document.createElement("td");
  celulaValor.className = "numeric";
  const valor = document.createElement("span");
  valor.className = `amount ${lancamento.tipo}`;
  valor.textContent = formatarMoeda.format(lancamento.valor);
  celulaValor.appendChild(valor);
  linha.appendChild(celulaValor);

  // Despesas vencidas e pendentes recebem a etiqueta vermelha "Atrasado".
  const celulaStatus = document.createElement("td");
  const etiquetaStatus = document.createElement("span");
  etiquetaStatus.className = `status-pill ${status.classe}`;
  const ponto = document.createElement("span");
  ponto.className = "status-dot";
  ponto.setAttribute("aria-hidden", "true");
  etiquetaStatus.append(ponto, document.createTextNode(status.texto));
  celulaStatus.appendChild(etiquetaStatus);
  linha.appendChild(celulaStatus);

  return linha;
}

// Aplica busca e tipo ao mesmo tempo e atualiza a tabela em tempo real.
function renderizarTabela() {
  const termo = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
  const tipoSelecionado = filtroTipo.value;
  const categoriaSelecionada = filtroCategoria.value;

  const filtrados = lancamentos.filter((lancamento) => {
    const correspondeDescricao = lancamento.descricao
      .toLocaleLowerCase("pt-BR")
      .includes(termo);
    const correspondeTipo =
      tipoSelecionado === "todos" || lancamento.tipo === tipoSelecionado;
    const correspondeCategoria =
      categoriaSelecionada === "todas" || lancamento.categoria === categoriaSelecionada;

    return correspondeDescricao && correspondeTipo && correspondeCategoria;
  });

  // Limpa as linhas anteriores antes de inserir os resultados atuais.
  corpoTabela.replaceChildren();
  const linhas = filtrados.map(criarLinha);
  corpoTabela.append(...linhas);

  // Soma os valores dos lançamentos que passaram por todos os filtros.
  const somaFiltrada = filtrados.reduce((soma, lancamento) => soma + lancamento.valor, 0);
  totalValores.textContent = formatarMoeda.format(somaFiltrada);

  // Atualiza os contadores e a mensagem de tabela vazia.
  totalRegistros.textContent = `${filtrados.length} ${filtrados.length === 1 ? "lançamento" : "lançamentos"}`;
  resultadoTexto.textContent = filtrados.length === lancamentos.length
    ? "Exibindo todos os lançamentos"
    : `Exibindo ${filtrados.length} de ${lancamentos.length} lançamentos`;
  mensagemVazia.hidden = filtrados.length !== 0;
  document.querySelector(".table-scroll").hidden = filtrados.length === 0;
}

// A busca e o filtro são executados imediatamente após cada alteração.
campoBusca.addEventListener("input", renderizarTabela);
filtroTipo.addEventListener("change", renderizarTabela);
filtroCategoria.addEventListener("change", renderizarTabela);

// Restaura os filtros para o estado inicial.
botaoLimpar.addEventListener("click", () => {
  campoBusca.value = "";
  filtroTipo.value = "todos";
  filtroCategoria.value = "todas";
  renderizarTabela();
});

// Prepara as categorias e exibe os 15 lançamentos ao abrir a página.
preencherFiltroCategorias();
renderizarTabela();
