var bebida = document.getElementById('bebida');
var tamanho = document.getElementById('tamanho');
var ingredientes = document.getElementById('ingredientes');
var preco = document.getElementById('preco');
var addBebida = document.getElementById('addBebida');
var fileButton = document.getElementById('file');
var imgurl;

addBebida.addEventListener('click', function () {
    create(bebida.value, tamanho.value, preco.value, ingredientes.value, imgurl);
});

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref().child('bebidas/' + file.name);
    var uploadTask = storageRef.put(file);
    var imgRef = storageRef;
    

    uploadTask.on('state_changed', function (snapshot) {
            
        },
        function error(err) {
            console.log(err);
        },
        function complete() {
            imgRef.getDownloadURL().then(function(url) {
                imgurl = url;
              });
        });

});


function create(bebida, tamanho, preco, ingredientes, imgurl) {
    var data = {
        nome: bebida,
        ingredientes: ingredientes,
        tamanho: tamanho,
        preco: preco,
        imgurl: imgurl
    };
    return firebase.database().ref().child('bebidas').push(data);
}

firebase.database().ref('bebidas').on('value', function (snapshot) {
    var bebida;
    snapshot.forEach(function (item) {
        bebida = item.val();
        var bebidaTr = montaTr(bebida);
        var tabela = document.getElementById('tabela-bebidas');
        tabela.appendChild(bebidaTr);
    });

});


function montaTr(bebida) {
    var bebidaTr = document.createElement("tr");
    bebidaTr.classList.add('bebidas');
    bebidaTr.appendChild(montaTd(bebida.nome, 'info-nome'));
    bebidaTr.appendChild(montaTd(bebida.ingredientes, 'info-ingredientes'));
    bebidaTr.appendChild(montaTd(bebida.tamanho, 'info-tamanho'));
    bebidaTr.appendChild(montaTd(bebida.preco, 'info-preco'));
    return bebidaTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
