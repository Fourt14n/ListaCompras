let listaCompras = [];
const inputItem = document.querySelector("#item");
const inputQtd = document.querySelector("#quantidade");
const lista = document.querySelector(".lista")

carregaDados();

function adicionarItem(){

    if(inputItem.value.trim() === ""){
        return;
    }

    let item = {
        id: Date.now(),
        nome: inputItem.value,
        quantidade: inputQtd.value || 1,
        comprado: false
    };

    listaCompras.push(item);

    atualizarInterface();


    // Session mantém até o navegador ser fechado
    // sessionStorage.setItem('testeSessionStorage', "Hello Session Storage meu bem");
    // console.log(sessionStorage.getItem("testeSessionStorage"));
    // Local storage mantém até alguém apagar
    salvarDados();

}

function limparLista(){
    listaCompras = [];
    atualizarInterface();
    salvarDados();
}

function atualizarInterface(){
    lista.innerHTML = "";

    for(let i = 0; i < listaCompras.length; i++){
        let item = document.createElement("li");
        item.innerHTML = `
                <input ${listaCompras[i].comprado ? 'checked' : ""} onchange="toggle(${listaCompras[i].id})" type="checkbox" name="" id="">
                <p>${listaCompras[i].quantidade}  ${listaCompras[i].nome}</p>
                <button onclick="excluirItem(${listaCompras[i].id})"> X </button> 
        `

        lista.append(item);
    }

    inputItem.value = "";
    inputQtd.value = "";
}

function excluirItem(id){
    listaCompras = listaCompras.filter(item => item.id != id);
    atualizarInterface();
    salvarDados();
}

function limparComprados(){
    listaCompras = listaCompras.filter((item) => item.comprado != true);
    atualizarInterface();
    salvarDados();
}

function toggle(id){
    const item = listaCompras.find((item) => item.id == id);
    item.comprado = !item.comprado;
}

inputItem.addEventListener('keypress', function(e){
    if(e.key === "Enter")
        adicionarItem();
});
inputQtd.addEventListener('keypress', function(e){
    if(e.key === "Enter")
        adicionarItem();
});
function carregaDados(){
    const dados = localStorage.getItem("listaCompras");
    if(dados){
        listaCompras = JSON.parse(dados);
        atualizarInterface();
    }
}
function salvarDados(){
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}