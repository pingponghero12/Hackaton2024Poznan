CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS genres (
    id INT AUTO_INCREMENT,
    genre VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS papers (
    id INT AUTO_INCREMENT,
    title VARCHAR(255),
    publicationDate DATE,
    description TEXT,
    author VARCHAR(255),
    PRIMARY KEY(id)
);


CREATE TABLE IF NOT EXISTS paper_genres (
    paper_id INT,
    genre_id INT,
    PRIMARY KEY(paper_id, genre_id),
    FOREIGN KEY(paper_id) REFERENCES papers(id),
    FOREIGN KEY(genre_id) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS relation_list (
    user_id INT,
    paper_id INT,
    PRIMARY KEY(user_id, paper_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(paper_id) REFERENCES papers(id)
);