var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

function logDeError(err, req, res, next) {
    console.log("===ERROR===");
    console.log(err);
    console.log("===========");
    next(err);
};

function controlDeErrores(err, req, res, next) {
    res.status(404).send(err.message);
}
app.use(bodyParser());


app.use(function(req, res, next) {
    setTimeout(function(){
        console.log("Llego una petición!!!");
        res.locals.name = "luis";
        res.locals.edad = 80;
        next();
    }, 1000);
});

var obtenerTareas = function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        res.send(JSON.parse(data));
    });
}

app.get('/todos', obtenerTareas);

app.get('/todos/:todoId', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        res.send(tasks[req.params.todoId]);
    });
});


var leerBaseDeDatos = function(req, res, next) {
    fs.readFile('./tareas.json', function(e, data){
        try {
            res.locals.data = data;
            next();
        } catch (err) {
            next(err);
        }
    });
};

var parsearDatos = function(req, res, next) {
    res.locals.data = JSON.parse(res.locals.data);
    next();
}

var agregarNuevaTarea = function(req, res, next) {
    if (res.locals.data[req.params.todoId]) {
        next(new Error("Ya existe"));
    } else {
        res.locals.data[req.params.todoId] = req.body;
        next();
    }
};

var guardarDatos = function(req, res, next) {
    fs.writeFile('./tareas.json', JSON.stringify(res.locals.data), function(){
        res.json({ok: true});
    });
}

app.post('/todos/:todoId',
    leerBaseDeDatos, 
    parsearDatos,
    agregarNuevaTarea,
    guardarDatos
);

app.delete('/todos/:todoId', function(req, res) {
    fs.readFile('./tareas.json', function(e, data){
        var tasks = JSON.parse(data);
        delete tasks[req.params.todoId]
        fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
            res.send(req.params.todoId + ' borrado correctamente');
        });
    });
});

app.use(logDeError);
app.use(controlDeErrores);

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
});

