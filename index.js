var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser());

var tieneCredenciales = function(req, user, pass){
    return req.query.user === user && req.query.pass === pass;
}

app.get('/todos', function(req, res) {
    if(tieneCredenciales(req, 'admin', 'admin') || tieneCredenciales(req, 'cliente', '1234')){
        fs.readFile('./tareas.json', function(e, data){
            res.send(JSON.parse(data));
        });
    } else {
        res.send('No tiene credenciales.');
    }; 
});

app.get('/todos/:todoId', function(req, res) {
    if(tieneCredenciales(req, 'admin', 'admin') || tieneCredenciales(req, 'cliente', '1234')){
        fs.readFile('./tareas.json', function(e, data){
            var tasks = JSON.parse(data);
            res.send(tasks[req.params.todoId]);
        });
    } else {
        res.send('No tiene credenciales.');
    };
});

app.post('/todos/:todoId', function(req, res) {
    if(tieneCredenciales(req, 'admin', 'admin') || tieneCredenciales(req, 'cliente', '1234')){
        fs.readFile('./tareas.json', function(e, data){
            var tasks = JSON.parse(data);
            tasks[req.params.todoId] = req.body;
            fs.writeFile('./tareas.json', JSON.stringify(tasks), function() {
                res.send(req.params.todoId + ' guardado correctamente');
            });
        });
    } else {
        res.send('No tiene credenciales.');
    };
});

app.delete('/todos/:todoId', function(req, res) {
    if(tieneCredenciales(req, 'admin', 'admin')) {
        fs.readFile('./tareas.json', function(e, data){
            var tasks = JSON.parse(data);
            delete tasks[req.params.todoId]
            fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
                res.send(req.params.todoId + ' borrado correctamente');
            });
        });
    } else {
        res.send('No tiene permiso de admin.');
    };  
});

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
});
