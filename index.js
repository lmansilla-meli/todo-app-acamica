var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser());

<<<<<<< HEAD

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
=======
app.get('/todos', function(req, res) {
    if (req.query.user === 'admin' && req.query.pass === 'admin' || req.query.user === 'cliente' && req.query.pass === 'cliente'){
        fs.readFile('./tareas.json', function(e, data){
            res.send(JSON.parse(data));
    });
}
else {
    res.status(403).send('No estas autorizado gato 😼');
}
});

app.get('/todos/:todoId', function(req, res) {
    if (req.query.user === 'admin' && req.query.pass === 'admin' || req.query.user === 'cliente' && req.query.pass === 'cliente'){
>>>>>>> a49a6899a670c45833f0c3a75f5c843abb60ce23
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        res.send(tasks[req.params.todoId]);
    });
}
else{
    res.status(403).send('No estas autorizado gato 😼');
}
});

app.post('/todos/:todoId', function(req, res) {
    if (req.query.user === 'admin' && req.query.pass === 'admin' || req.query.user === 'cliente' && req.query.pass === 'cliente'){
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        tasks[req.params.todoId] = req.body;
        fs.writeFile('./tareas.json', JSON.stringify(tasks), function() {
            res.send(req.params.todoId + ' guardado correctamente');
        });
    });
}
else{
    res.status(403).send('No estas autorizado gato 😼');
}
});

<<<<<<< HEAD
app.delete('/todos/:todoId',checkearPermisosAdmin, function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        delete tasks[req.params.todoId]
        fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
            res.send(req.params.todoId + ' borrado correctamente');
=======
app.delete('/todos/:todoId', function(req, res) {
    if (req.query.user === 'admin' && req.query.pass === 'admin'){
        fs.readFile('./tareas.json', function(e, data){
            var tasks = JSON.parse(data);
            delete tasks[req.params.todoId]
            fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
                res.send(req.params.todoId + ' borrado correctamente');
            });
>>>>>>> a49a6899a670c45833f0c3a75f5c843abb60ce23
        });
    } else{
        res.status(403).send('No estas autorizado gato 😼');
    }
});

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
});
