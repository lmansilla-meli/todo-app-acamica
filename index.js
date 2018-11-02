var express = require('express');
var app = express();

var fs = require('fs');

app.post('/', function(req, res) {
    res.send({
        task: 'guardado',
    })
});

app.get('/', function(req, res) {
    res.send( {
        task: 'leido',
    })
})

app.delete('/', function(req, res) {
    res.send( {
        task: 'eliminado',
    })
})

app.put('/', function(req, res) {
    res.send( {
        task: 'modificado',
    })
})

app.listen(8080, function() {
    console.log(`Server escuchando en puerto 8080!`);
});