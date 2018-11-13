var fs = require('fs');
var express = require('express');
var app = express();

app.get('/todos', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        res.send(JSON.parse(data));
    })
})
app.get('/todos/:todoId', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        res.send(tasks[req.params.todoId]);
    })
})
app.put('/todos/:todoId', function(req, res) {
    res.send({
        hola: 'mundo',
    })
})
app.post('/todos', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        tasks['3'] = {"titulo": "Hacer andar esta cosa", "done": false};
        fs.writeFile('./tareas.json', JSON.stringify(tasks));
    })
})
app.delete('/todos/:todoId', function(req, res) {
    res.send({
        hola: 'mundo',
    })
})

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
})
