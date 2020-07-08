DROP DATABASE IF EXISTS chefpro_db;
CREATE DATABASE chefpro_db;

USE chefpro_db;

CREATE TABLE recipes (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    ingredients LONGTEXT NOT NULL,
    instructions LONGTEXT NOT NULL,
    PRIMARY KEY (id)
)