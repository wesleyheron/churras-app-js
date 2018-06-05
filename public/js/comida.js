var comida = document.getElementById('comida');
var ingredientes = document.getElementById('ingredientes');
var preco = document.getElementById('preco');
var addComida = document.getElementById('addComida');

var fileButton = document.getElementById('file');
var imgurl;


addComida.addEventListener('click', function () {
    create(comida.value, ingredientes.value, preco.value, imgurl);
});

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref().child('comidas/' + file.name);
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


function create(comida, ingredientes, preco, imgurl) {
    var data = {
        nome: comida,
        ingredientes: ingredientes,
        preco: preco,
        imgurl: imgurl
    };
    return firebase.database().ref().child('comidas').push(data);
}

firebase.database().ref('comidas').on('value', function (snapshot) {
    var comida;
    snapshot.forEach(function (item) {
        comida = item.val();
        var comidaTr = montaTr(comida);
        var tabela = document.getElementById('tabela-comidas');
        tabela.appendChild(comidaTr);
    });

});


function montaTr(comida) {
    var comidaTr = document.createElement("tr");
    comidaTr.classList.add('comidas');
    comidaTr.appendChild(montaTd(comida.nome, 'info-nome'));
    comidaTr.appendChild(montaTd(comida.ingredientes, 'info-ingredientes'));
    comidaTr.appendChild(montaTd(comida.preco, 'info-preco'));
    return comidaTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
