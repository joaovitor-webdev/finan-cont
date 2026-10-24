/* FinanCont Dashboard — dados fictícios para demonstração */
"use strict";

const brl = (value) => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const transactions = [
  { id: 1, description: "Venda de produtos", category: "Vendas", date: "2026-10-24", type: "income", status: "received", amount: 4850.00, symbol: "↗" },
  { id: 2, description: "Pagamento de aluguel", category: "Aluguel", date: "2026-10-23", type: "expense", status: "paid", amount: 1250.00, symbol: "⌂" },
  { id: 3, description: "Serviço de manutenção", category: "Serviços", date: "2026-10-22", type: "income", status: "received", amount: 780.00, symbol: "⚙" },
  { id: 4, description: "Conta de energia", category: "Utilidades", date: "2026-10-21", type: "expense", status: "pending", amount: 438.25, symbol: "ϟ" },
  { id: 5, description: "Compra de materiais", category: "Materiais", date: "2026-10-20", type: "expense", status: "overdue", amount: 690.00, symbol: "▤" },
  { id: 6, description: "Consultoria mensal", category: "Serviços", date: "2026-10-18", type: "income", status: "received", amount: 2200.00, symbol: "◇" },
  { id: 7, description: "Internet empresarial", category: "Utilidades", date: "2026-10-17", type: "expense", status: "paid", amount: 129.90, symbol: "⌁" },
  { id: 8, description: "Venda balcão", category: "Vendas", date: "2026-10-15", type: "income", status: "received", amount: 1620.00, symbol: "↗" }
];

const bills = [
  { title: "Aluguel comercial", supplier: "Imobiliária Central", due: "2026-10-26", amount: 1250.00, symbol: "⌂" },
  { title: "Energia elétrica", supplier: "Companhia de energia", due: "2026-10-27", amount: 438.25, symbol: "ϟ" },
  { title: "Internet empresarial", supplier: "Provedor de internet", due: "2026-10-29", amount: 129.90, symbol: "⌁" },
  { title: "Material de escritório", supplier: "Papelaria Modelo", due: "2026-10-30", amount: 361.85, symbol: "▤" }
];

const summaryByPeriod = {
  month: { balance: 18450.75, income: 24800.00, expense: 6349.25, due: 2180.00, dueCount: 4 },
  lastMonth: { balance: 17055.20, income: 22100.00, expense: 5044.80, due: 1430.00, dueCount: 3 },
  year: { balance: 98540.60, income: 142800.00, expense: 44259.40, due: 2180.00, dueCount: 4 }
};

const statusLabels = {
  received: { text: "Recebido", className: "paid" },
  paid: { text: "Pago", className: "paid" },
  pending: { text: "Pendente", className: "pending" },
  overdue: { text: "Atrasado", className: "overdue" }
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC"
});

function formatDate(isoDate) {
  return dateFormatter.format(new Date(`${isoDate}T12:00:00Z`));
}

function renderSummary(period = "month") {
  const summary = summaryByPeriod[period] || summaryByPeriod.month;
  document.querySelector("#balanceValue").textContent = brl(summary.balance);
  document.querySelector("#incomeValue").textContent = brl(summary.income);
  document.querySelector("#expenseValue").textContent = brl(summary.expense);
  document.querySelector("#dueValue").textContent = brl(summary.due);
  document.querySelector("#dueCount").textContent = `${summary.dueCount} contas`;
  renderChart(period);
}

function renderTransactions() {
  const query = document.querySelector("#searchInput").value.trim().toLocaleLowerCase("pt-BR");
  const type = document.querySelector("#typeFilter").value;
  const filtered = transactions.filter((item) => {
    const matchesText = `${item.description} ${item.category}`.toLocaleLowerCase("pt-BR").includes(query);
    const matchesType = type === "all" || item.type === type;
    return matchesText && matchesType;
  }).slice(0, 5);

  const table = document.querySelector("#transactionTable");
  const empty = document.querySelector("#emptyState");
  table.innerHTML = "";
  empty.hidden = filtered.length > 0;

  filtered.forEach((item) => {
    const status = statusLabels[item.status];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><div class="transaction-name"><span class="transaction-symbol ${item.type}">${item.symbol}</span><span>${escapeHTML(item.description)}</span></div></td>
      <td><span class="category-pill">${escapeHTML(item.category)}</span></td>
      <td>${formatDate(item.date)}</td>
      <td><span class="type-text ${item.type}">${item.type === "income" ? "Receita" : "Despesa"}</span></td>
      <td><span class="status-pill ${status.className}">${status.text}</span></td>
      <td class="align-right"><span class="amount ${item.type}">${item.type === "income" ? "+" : "−"} ${brl(item.amount)}</span></td>
      <td><button class="row-action" type="button" aria-label="Detalhes de ${escapeHTML(item.description)}" data-transaction="${item.id}">•••</button></td>
    `;
    table.appendChild(row);
  });

  document.querySelector("#resultCount").textContent = `Mostrando ${filtered.length} de ${transactions.length} lançamentos`;
}

function renderBills() {
  const container = document.querySelector("#billList");
  container.innerHTML = "";
  bills.forEach((bill) => {
    const item = document.createElement("div");
    item.className = "bill-item";
    item.innerHTML = `
      <span class="bill-icon">${bill.symbol}</span>
      <span class="bill-copy"><strong>${escapeHTML(bill.title)}</strong><small>${escapeHTML(bill.supplier)}</small></span>
      <span class="bill-amount"><strong>${brl(bill.amount)}</strong><small>Vence ${formatDate(bill.due)}</small></span>
    `;
    container.appendChild(item);
  });
}

function chartData(period) {
  if (period === "lastMonth") {
    return {
      labels: ["01–05", "06–10", "11–15", "16–20", "21–25", "26–30"],
      income: [3200, 4100, 2900, 5200, 3100, 3600],
      expense: [1200, 1800, 900, 1600, 1100, 1400]
    };
  }
  if (period === "year") {
    return {
      labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
      income: [18000, 21500, 19800, 24000, 22100, 24800],
      expense: [7600, 6900, 8100, 7200, 6800, 6349]
    };
  }
  return {
    labels: ["01–05", "06–10", "11–15", "16–20", "21–25", "26–31"],
    income: [3600, 5200, 4100, 4800, 3900, 3200],
    expense: [1100, 1500, 900, 1250, 850, 749]
  };
}

/* Gráfico desenhado com Canvas nativo, sem bibliotecas externas. */
function renderChart(period = "month") {
  const canvas = document.querySelector("#financeChart");
  if (!canvas) return;

  const data = chartData(period);
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, 280);
  const height = Math.max(rect.height, 180);
  const ratio = Math.max(window.devicePixelRatio || 1, 1);

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const styles = getComputedStyle(document.documentElement);
  const green = styles.getPropertyValue("--green").trim() || "#16a34a";
  const red = "#f87171";
  const muted = "#9ca3af";
  const grid = "#f0f1f4";
  const left = width < 380 ? 44 : 54;
  const right = 8;
  const top = 12;
  const bottom = 29;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const maxValue = Math.max(...data.income, ...data.expense) * 1.18;
  const y = (value) => top + plotHeight - (value / maxValue) * plotHeight;
  const x = (index) => left + (plotWidth * index) / (data.labels.length - 1);

  context.font = "10px Inter, Arial, sans-serif";
  context.textBaseline = "middle";
  context.lineWidth = 1;
  context.strokeStyle = grid;
  context.fillStyle = muted;

  for (let tick = 0; tick <= 4; tick++) {
    const value = (maxValue / 4) * tick;
    const yy = y(value);
    context.beginPath();
    context.moveTo(left, yy);
    context.lineTo(width - right, yy);
    context.stroke();

    const label = value >= 1000
      ? `R$ ${Math.round(value / 1000).toLocaleString("pt-BR")} mil`
      : `R$ ${Math.round(value)}`;
    context.textAlign = "right";
    context.fillText(label, left - 8, yy);
  }

  context.textAlign = "center";
  data.labels.forEach((label, index) => {
    context.fillText(label, x(index), height - 11);
  });

  function drawSeries(values, color, fillUnder = false) {
    context.beginPath();
    values.forEach((value, index) => {
      if (index === 0) context.moveTo(x(index), y(value));
      else context.lineTo(x(index), y(value));
    });
    if (fillUnder) {
      context.lineTo(x(values.length - 1), top + plotHeight);
      context.lineTo(x(0), top + plotHeight);
      context.closePath();
      context.fillStyle = color === green ? "rgba(22, 163, 74, .08)" : "rgba(248, 113, 113, .04)";
      context.fill();
      context.beginPath();
      values.forEach((value, index) => {
        if (index === 0) context.moveTo(x(index), y(value));
        else context.lineTo(x(index), y(value));
      });
    }
    context.strokeStyle = color;
    context.lineWidth = 2.5;
    context.lineJoin = "round";
    context.lineCap = "round";
    context.stroke();

    values.forEach((value, index) => {
      context.beginPath();
      context.arc(x(index), y(value), 3, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
      context.strokeStyle = "#fff";
      context.lineWidth = 1.5;
      context.stroke();
    });
  }

  drawSeries(data.income, green, true);
  drawSeries(data.expense, red, false);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

let toastTimeout;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

function setupInteractions() {
  document.querySelector("#periodFilter").addEventListener("change", (event) => renderSummary(event.target.value));
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderChart(document.querySelector("#periodFilter").value), 120);
  });
  document.querySelector("#searchInput").addEventListener("input", renderTransactions);
  document.querySelector("#typeFilter").addEventListener("change", renderTransactions);

  const sidebar = document.querySelector("#sidebar");
  const menuToggle = document.querySelector("#menuToggle");
  menuToggle.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 920 && sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
      sidebar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelector("#newEntryButton").addEventListener("click", () => {
    showToast("Demonstração: o formulário de novo lançamento será integrado pelo grupo.");
  });
  document.querySelector("#seeBillsButton").addEventListener("click", () => {
    showToast("Demonstração: a tela de contas a pagar/receber será integrada depois.");
  });
  document.querySelector("#seeTransactionsButton").addEventListener("click", () => {
    showToast("Exibindo até 5 lançamentos neste resumo. A lista completa será integrada depois.");
  });
  document.querySelector("#notificationButton").addEventListener("click", () => {
    showToast("Você tem 4 contas próximas do vencimento.");
  });
  document.querySelector("#helpButton").addEventListener("click", () => {
    showToast("Este painel usa dados fictícios e serve como protótipo acadêmico.");
  });
  document.querySelector("#profileButton").addEventListener("click", () => {
    showToast("Perfil de demonstração: Administrador.");
  });

  document.querySelectorAll("[data-demo-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Esta tela será conectada quando os arquivos dos colegas forem integrados.");
    });
  });

  document.querySelector("#transactionTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-transaction]");
    if (!button) return;
    const item = transactions.find((transaction) => transaction.id === Number(button.dataset.transaction));
    if (item) showToast(`${item.description}: ${brl(item.amount)} — ${statusLabels[item.status].text}.`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary("month");
  renderTransactions();
  renderBills();
  setupInteractions();
});
