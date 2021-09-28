DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
\c products;
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  slogan VARCHAR(200),
  description VARCHAR(500),
  category VARCHAR(100),
  default_price REAL
);

DROP TABLE IF EXISTS features;
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  feature VARCHAR (20),
  value VARCHAR(100),
  product_id SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  name varchar(20),
  original_price REAL,
  sale_price REAL,
  default_style BOOLEAN,
  product_id SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  quantity INT,
  size VARCHAR(10),
  styleId SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(styleId)
    REFERENCES styles(id)
);

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  thumbnail_url VARCHAR(100),
  url VARCHAR (100),
  styleId SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(styleId)
    REFERENCES styles(id)
);



INSERT INTO products (name, slogan, description, category, default_price) VALUES ('a', 'abc', 'abcde', 'ade', 13.23);