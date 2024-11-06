const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');
const uniqid = require('uniqid');
const {promisify} = require('util');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ReceTitas'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/recetas/nueva', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'carga.html'));
});

app.get('/recetas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/recetas/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recetasAdmin.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register-sv', (req, res) => {
    const {name, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO usuarios (name, password) VALUES (?, ?)';
    db.query(query, [name, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('Usuario registrado');
    });
});

app.post('/login', (req, res) => {
    const {name, password} = req.body;

    const query = 'SELECT * FROM usuarios WHERE name = ?';
    db.query(query, [name], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            const user = result[0];

            if (bcrypt.compareSync(password, user.password)) {
                res.json({success: true, name: user.name, id: user.id});
            } else {
                res.json({success: false, message: 'Contraseña incorrecta'});
            }
        } else {
            res.json({success: false, message: 'Usuario no encontrado'});
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post('/agregar-receta', (req, res) => {
    const {name, ingredients, preparation, user_id} = req.body;
    console.log('Datos recibidos:', {name, ingredients, preparation, user_id});

    const query = 'INSERT INTO recetas (name, ingredients, preparation, user_id) VALUES (?, ?, ?, ?)';
    db.query(query, [name, ingredients, preparation, user_id], (err, result) => {
        if (err) {
            console.error('Error al insertar la receta en la base de datos:', err);
            return res.status(500).json({success: false, message: 'Error al agregar la receta'});
        }
        console.log('Receta agregada');
        res.json({success: true, message: 'Receta agregada exitosamente'});
    });
});

app.get('/recetasMostrar', (req, res) => {
    const query = 'SELECT * FROM recetas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar las recetas:', err);
            return res.status(500).json({success: false, message: 'Error al consultar las recetas'});
        }
        res.json({success: true, recetas: results});
    });
});

app.get('/recetas-admin', async (req, res) => {
    const query = 'SELECT * FROM recetas';
    const myQuery = promisify(db.query).bind(db);
    let recetas = await myQuery(query);

    return res.json({success: true, recetas});
});

app.delete('/borrar-receta/:id', (req, res) => {
    const recetaId = req.params.id;

    const query = "DELETE FROM recetas WHERE id = ?";

    db.query(query, [recetaId], (err, results) => {
        if (err) {
            res.json({ success: false, message: 'Error al anular el pedido.' });
            console.error(err);
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});
