var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser());

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

app.delete('/todos/:todoId', function(req, res) {
    if (req.query.user === 'admin' && req.query.pass === 'admin'){
        fs.readFile('./tareas.json', function(e, data){
            var tasks = JSON.parse(data);
            delete tasks[req.params.todoId]
            fs.writeFile('./tareas.json', JSON.stringify(tasks), function(e) {
                res.send(req.params.todoId + ' borrado correctamente');
            });
        });
    } else{
        res.status(403).send('No estas autorizado gato 😼');
    }
});

app.listen('8080', function(){
    console.log("Escuchando el puerto 8080")
});
