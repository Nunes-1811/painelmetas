// Seleção dos elementos
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const prioridade = document.querySelector("#prioridade");
const dataMeta = document.querySelector("#data-meta");
const btnAdd = document.querySelector("#btn-add");
const listaMetas = document.querySelector("#lista-metas");
const erro = document.querySelector(".erro");

// Função principal
function adicionarMeta() {
    erro.textContent = "";

    // Validações
    if (titulo.value.trim() === "") {
        erro.textContent = "Digite um título válido";
        return;
    }
    if (descricao.value.trim() === "") {
        erro.textContent = "Digite uma descrição válida";
        return;
    }
    if (prioridade.value === "") {
        erro.textContent = "Selecione uma prioridade válida";
        return;
    }
    if (dataMeta.value === "") {
        erro.textContent = "Selecione uma data válida";
        return;
    }

    const hoje = new Date().toISOString().split("T")[0];
    if (dataMeta.value < hoje) {
        erro.textContent = "A data não pode ser anterior a hoje";
        return;
    }

    // Criando elemento <li>
    const li = document.createElement("li");
    li.classList.add(prioridade.value);

    li.innerHTML = `
        <h3>${titulo.value}</h3>
        <p>${descricao.value}</p>
        <p><strong>Prioridade:</strong> ${prioridade.value}</p>
        <p><strong>Data:</strong> ${dataMeta.value}</p>
        <button class="btn-item btn-concluir">Concluir</button>
        <button class="btn-item btn-remover">Remover</button>
    `;

    // Eventos dos botões
    const btnConcluir = li.querySelector(".btn-concluir");
    const btnRemover = li.querySelector(".btn-remover");

    btnConcluir.addEventListener("click", () => {
        li.classList.toggle("concluida");
        btnConcluir.textContent =
            li.classList.contains("concluida") ? "Desfazer" : "Concluir";
    });

    btnRemover.addEventListener("click", () => {
        li.style.animation = "sumir 0.4s forwards";
        setTimeout(() => li.remove(), 400);
    });

    // Adiciona à lista
    listaMetas.appendChild(li);

    // Limpa o formulário
    titulo.value = "";
    descricao.value = "";
    prioridade.value = "";
    dataMeta.value = "";
}

btnAdd.addEventListener("click", adicionarMeta);
