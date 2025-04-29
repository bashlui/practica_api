import { pool } from "../db/db.js";

export const getUsers = (req, res) => {
    const id = req.params.id;
    pool.execute('select * from users where id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: []});
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

export const postUser = (req, res) => {
    const { name, username, password, age } = req.body;
    pool.execute('insert into users (name, username, password, age) values (?,?,?,?)', [name, username, password, age], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: []});
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;
    pool.execute('select * from users where username = ?'), [username], (error, results) => {
        res.status(500).json({ msg: error, users: []});
        return;
    }
    if (results.length < 1) {
        res.status(401).json({ isLogin: false, msg: "Usuario o contraseña incorrectos", user: {} });
        return;
    }
    if (results[0].password === password) {
        res.status(200).json({ isLogin: true, msg: "ok", user: results[0] });
    } else {
        res.status(401).json({ isLogin: false, msg: "Usuario o contraseña incorrectos", user: {} });
    }
};

export const putUser = (req, res) => {
    const { name, username, password, age } = req.body;
    pool.execute('update users set name = ?, username = ?, password = ?, age = ? where id = ?', [name, username, password, age, req.params.id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: []});
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    pool.execute('delete from users where id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: []});
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

