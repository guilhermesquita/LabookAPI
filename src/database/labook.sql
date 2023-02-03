-- Active: 1675458687535@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

DROP TABLE users;

CREATE TABLE accounts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    owner_id TEXT NOT NULL,
    balance REAL DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id)
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Juliano", "juliano@email.com", "senha123", 'user'),
	("u002", "Luciana", "luciana@email.com", "mnos2020", 'user');

SELECT * FROM users;

INSERT INTO accounts (id, owner_id)
VALUES
	("a001", "u001"),
	("a002", "u002");
