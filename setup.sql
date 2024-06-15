CREATE DATABASE IF NOT EXISTS test_db;
USE test_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT,
  name VARCHAR(255),
  PRIMARY KEY(id)
);

INSERT INTO items (name) VALUES ('skibidi toilet'), ('item 2'), ('item 3');