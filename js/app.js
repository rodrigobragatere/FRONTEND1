/**
 * Live 1 — Desenvolvimento Frontend
 * JavaScript de demonstração | @RodrigoBraga
 */

document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById("anoAtual");
  if (ano) ano.textContent = new Date().getFullYear();

  initAmbiente();
  initHtmlBasico();
  initTabela();
  initFormulario();
  initTemas();
  initDuvidas();
  initNavActive();
});

/* ---------- 1. Ambiente de Programação ---------- */
function initAmbiente() {
  const btn = document.getElementById("btnAmbiente");
  const out = document.getElementById("resultadoAmbiente");
  if (!btn || !out) return;

  btn.addEventListener("click", () => {
    const ide = document.getElementById("ideSelect").value;
    const nav = document.getElementById("navegadorSelect").value;

    if (!ide || !nav) {
      out.className = "alert alert-warning mt-3";
      out.textContent = "Selecione a IDE e o navegador para continuar.";
      out.classList.remove("d-none");
      return;
    }

    out.className = "alert alert-success mt-3";
    out.innerHTML = `<strong>Ambiente registrado:</strong> ${ide} + ${nav}. Pronto para desenvolver!`;
    out.classList.remove("d-none");
  });
}

/* ---------- 2. HTML básico ---------- */
function initHtmlBasico() {
  const btn = document.getElementById("btnHtml");
  const preview = document.getElementById("htmlPreview");
  const codigo = document.getElementById("htmlCodigo");
  const input = document.getElementById("tituloInput");
  const nivel = document.getElementById("nivelTitulo");
  if (!btn || !preview || !codigo) return;

  const render = () => {
    const texto = (input.value || "Texto").trim();
    const tag = nivel.value;
    preview.innerHTML = "";
    const el = document.createElement(tag);
    el.textContent = texto;
    preview.appendChild(el);
    codigo.innerHTML = `<code>&lt;${tag}&gt;${escapeHtml(texto)}&lt;/${tag}&gt;</code>`;
  };

  btn.addEventListener("click", render);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      render();
    }
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- 4. Tabelas ---------- */
function initTabela() {
  const tabela = document.getElementById("tabelaAlunos");
  const info = document.getElementById("infoTabela");
  const filtrar = document.getElementById("btnFiltrarConcluidos");
  const todos = document.getElementById("btnMostrarTodos");
  if (!tabela) return;

  const linhas = [...tabela.querySelectorAll("tbody tr")];

  filtrar?.addEventListener("click", () => {
    let visiveis = 0;
    linhas.forEach((tr) => {
      const ok = tr.textContent.includes("Concluído");
      tr.style.display = ok ? "" : "none";
      if (ok) visiveis++;
    });
    if (info) info.textContent = `${visiveis} aluno(s) concluído(s).`;
  });

  todos?.addEventListener("click", () => {
    linhas.forEach((tr) => {
      tr.style.display = "";
    });
    if (info) info.textContent = `Exibindo ${linhas.length} registros.`;
  });
}

/* ---------- 5. Formulários ---------- */
function initFormulario() {
  const form = document.getElementById("formInscricao");
  const range = document.getElementById("experiencia");
  const nivelExp = document.getElementById("nivelExp");
  const sucesso = document.getElementById("formSucesso");

  range?.addEventListener("input", () => {
    if (nivelExp) nivelExp.textContent = range.value;
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const modulo = document.getElementById("modulo");
    const moduloTxt = modulo.options[modulo.selectedIndex].text;
    const horario = form.querySelector('input[name="horario"]:checked')?.value;

    sucesso.className = "alert alert-success mt-3";
    sucesso.innerHTML = `Inscrição recebida, <strong>${escapeHtml(nome)}</strong>! Módulo: ${escapeHtml(moduloTxt)} · Horário: ${escapeHtml(horario || "")}.`;
    sucesso.classList.remove("d-none");
    form.reset();
    form.classList.remove("was-validated");
    if (nivelExp) nivelExp.textContent = "3";
  });

  form?.addEventListener("reset", () => {
    setTimeout(() => {
      if (nivelExp) nivelExp.textContent = "3";
      sucesso?.classList.add("d-none");
      form.classList.remove("was-validated");
    }, 0);
  });
}

/* ---------- 7. Temas CSS ---------- */
function initTemas() {
  document.querySelectorAll(".btn-tema").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tema = btn.dataset.tema;
      document.body.classList.remove("tema-escuro", "tema-verde");
      if (tema === "escuro") document.body.classList.add("tema-escuro");
      if (tema === "verde") document.body.classList.add("tema-verde");
    });
  });
}

/* ---------- LR1 — Dúvidas ---------- */
function initDuvidas() {
  const form = document.getElementById("formDuvida");
  const lista = document.getElementById("listaDuvidas");
  const vazio = document.getElementById("duvidasVazio");
  if (!form || !lista) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nomeDuvida").value.trim();
    const texto = document.getElementById("textoDuvida").value.trim();
    if (!nome || !texto) return;

    vazio?.remove();

    const item = document.createElement("article");
    item.className = "duvida-item";
    const agora = new Date();
    item.innerHTML = `
      <strong>${escapeHtml(nome)}</strong>
      <p>${escapeHtml(texto)}</p>
      <time datetime="${agora.toISOString()}">${agora.toLocaleString("pt-BR")}</time>
    `;
    lista.prepend(item);
    form.reset();
  });
}

/* ---------- Nav ativa ao rolar ---------- */
function initNavActive() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".navbar-nav .nav-link");

  const onScroll = () => {
    const y = window.scrollY + 100;
    let current = "";
    sections.forEach((sec) => {
      if (sec.offsetTop <= y) current = sec.id;
    });
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const collapse = document.getElementById("menuPrincipal");
      if (collapse?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });
}
