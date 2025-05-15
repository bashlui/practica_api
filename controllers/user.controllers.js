import { pool } from "../db/db.js";
import { getSalt, hashPassword, verifyPassword } from "../utils/hash.js";

export const getUsers = (req, res) => {
    const id = req.params.id;
    pool.execute('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ msg: error, users: [] });
            return;
        }
        res.status(200).json({ msg: "ok", users: results.rows });
    });
};

export const postUser = (req, res) => {
    const { name, username, password, age } = req.body;
    const salt = getSalt();
    const hash = hashPassword(password, salt);
    pool.execute(
        'INSERT INTO users (name, username, password, salt, age) VALUES (?, ?, ?, ?, ?)',
        [name, username, hash, salt, age],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error, users: [] });
                return;
            }
            res.status(200).json({ msg: "User created successfully" });
        }
    );
};

export const loginUser = (req, res) => {
    const { username, password } = req.body;
    pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (error, results) => {
            if (error || results.rows.length === 0) {
                res.status(401).json({ msg: "Invalid username or password" });
                return;
            }

            const user = results.rows[0];
            const isValid = verifyPassword(password, user.salt, user.password);
            if (!isValid) {
                res.status(401).json({ msg: "Invalid username or password" });
                return;
            }

            res.status(200).json({ msg: "Login successful", user: { id: user.id, name: user.name, username: user.username } });
        }
    );
};
