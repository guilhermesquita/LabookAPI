-- Active: 1681243087309@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, name, email, password, role)
VALUES
	("u001", "Juliano", "juliano@email.com", "senha123", 'user'),
	("u002", "Luciana", "luciana@email.com", "mnos2020", 'user');

SELECT * FROM users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    update_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
    ("p001", "u001", "God Bless this land", 50, 2),
    ("p002", "u002", "Eu e o chico", 20, 0),
    ("p003", "u002", "E esse TBT?", 23, 1);

DROP TABLE posts; --NÃO USAR!!!!!!

SELECT * FROM posts
INNER JOIN users
ON posts.creator_id = users.id;