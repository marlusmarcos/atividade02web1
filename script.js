/*
* Função AJAX base do tipo assíncrona.
* type é o tipo de objeto que você quer recuperar.
* value é o valor do parâmetro para filtrar os resultados dos tipos 2, 3 e 4.
* [Importante!] Você não pode, em nenhuma hipótese, alterar a função xhttpAssincrono.
*/
function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
    // Chama a função em callback e passa a resposta da requisição
    callBackFunction(this.responseText);
    }
    };
    // Path para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/";
    switch (type) {
    case 1:
    url += "users"
    break;
    case 2:
    url += "posts?userId=" + value;
    break;
    case 3:
    url += "todos?userId=" + value;
    break;
    case 4:
    url += "comments?postId=" + value;
    break;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function pegarUsuarios() {
    xhttpAssincrono (mostrarUsuarios, 1, null);
}

function mostrarUsuarios (response) {
    usuarios = document.getElementById("nomeid");
    let dados = JSON.parse(response);
    for (i = 0; i < dados.length; i++) {
        console.log (dados[i].name); 
        option = new Option(dados[i].nome, dados[i].id);
        usuarios.options[usuarios.options.length] = option;
        option.innerHTML = dados[i].name; 
   }

}
pegarUsuarios();

function pegarPosts () {
    let id = document.getElementById("nomeid").value;
    xhttpAssincrono (mostrarPost, 2, id);
}

function mostrarPost(response){
    m_post = document.getElementById("postsid");
    m_post.innerHTML = "";
    if (document.getElementById("userPostid").checked) {
        let dados_post = JSON.parse(response);
        for (i = 0; i < dados_post.length; i++){
            console.log(dados_post[i].title);
            var li = document.createElement('li');
            li.innerHTML = dados_post[i].title;
            m_post.appendChild(li);
        }
        
    }
}

