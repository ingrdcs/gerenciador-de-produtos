// Array de produtos
let produtos = [{ codigoDeBarras: "1234567890", tipo: "Alimento", peso: "500g", nome: "Arroz" }, { codigoDeBarras: "0987654321", tipo: "Bebida", peso: "1L", nome: "Refrigerante" }, ];

// Referências aos elementos do DOM
const form = document.querySelector("form");
const tabela = document.querySelector("table tbody");

// Função para adicionar um produto ao array e atualizar a tabela
function adicionarProduto(event) {
    event.preventDefault(); // Impede que o formulário seja enviado
    const codigoDeBarras = form.codigoDeBarras.value;
    const tipo = form.tipo.value;
    const peso = form.peso.value;
    const nome = form.nome.value;
    const produto = { codigoDeBarras, tipo, peso, nome };
    produtos.push(produto);
    atualizarTabela();
    form.reset();
}

// Função para atualizar a tabela com os produtos do array
function atualizarTabela() {
    tabela.innerHTML = "";
    produtos.forEach((produto, indice) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${produto.codigoDeBarras}</td>
      <td>${produto.tipo}</td>
      <td>${produto.peso}</td>
      <td>${produto.nome}</td>
      <td>
        <button type="button" class="btn btn-sm btn-primary" onclick="editarProduto(${indice})">Editar</button>
        <button type="button" class="btn btn-sm btn-danger" onclick="excluirProduto(${indice})">Excluir</button>
      </td>
    `;
        tabela.appendChild(tr);
    });
}

// Função para excluir um produto do array e atualizar a tabela
function excluirProduto(indice) {
    produtos.splice(indice, 1);
    atualizarTabela();
}

// Função para preencher o formulário com os dados do produto selecionado e alterar o botão de adicionar para editar
function editarProduto(indice) {
    const produto = produtos[indice];
    form.codigoDeBarras.value = produto.codigoDeBarras;
    form.tipo.value = produto.tipo;
    form.peso.value = produto.peso;
    form.nome.value = produto.nome;
    form.setAttribute("data-indice", indice);
    form.querySelector("button[type=submit]").textContent = "Editar Produto";
}

// Função para atualizar os dados de um produto no array e na tabela
function salvarEdicao(event) {
    event.preventDefault();
    const codigoDeBarras = form.codigoDeBarras.value;
    const tipo = form.tipo.value;
    const peso = form.peso.value;
    const nome = form.nome.value;
    const indice = form.getAttribute("data-indice");
    produtos[indice] = { codigoDeBarras, tipo, peso, nome };
    form.removeAttribute("data-indice");
    form.querySelector("button[type=submit]").textContent = "Adicionar Produto";
    atualizarTabela();
    form.reset();
}

// Adiciona os listeners aos eventos
form.addEventListener("submit", adicionarProduto);
form.addEventListener("submit", salvarEdicao); // adicionado para permitir a edição de produtos existentes