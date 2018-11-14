var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser());


var permisos = {
    'admin': ['*'],
    'user': ['POST', 'GET'],
}
var checkearPermisosUser = function(req, res, next) {
    if (req.query.user === 'user' && req.query.pass === 'user') {
        next();
    } else {
        res.status(401).send('Sin permisos GATOOOOO 🐈');
    }
}

var checkearPermisosAdmin = function(req, res, next) {
    if (req.query.user === 'admin' && req.query.pass === 'admin') {
        next();
    } else {
        res.status(401).send('Sin permisos GATOOOOO 🐈');
    }
}


var logger = function(req, res, next) {
    console.log(req);
    next();
}

var obtenerTareas = function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        res.send(JSON.parse(data));
    });
}

app.get('/todos', checkearPermisosUser, logger, obtenerTareas);

app.get('/todos/:todoId', checkearPermisosUser, function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        res.send(tasks[req.params.todoId]);
    });
});

app.post('/todos/:todoId', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        tasks[req.params.todoId] = req.body;
        fs.writeFile('./tareas.json', JSON.stringify(tasks), function() {
            res.send(req.params.todoId + ' guardado correctamente');
        });
    });
});

app.delete('/todos/:todoId',checkearPermisosAdmin, function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        delete tasks[req.params.todoId]
        fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
            res.send(req.params.todoId + ' borrado correctamente');
        });
    });
});

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
});
