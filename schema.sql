DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
\c products;
-- DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(200),
  description VARCHAR(500),
  category VARCHAR(100),
  default_price REAL
);

-- DROP TABLE IF EXISTS features;
CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  feature VARCHAR (100),
  value VARCHAR(200),
  product_id SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

-- DROP TABLE IF EXISTS styles;
CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  name varchar(100),
  original_price REAL,
  sale_price REAL,
  default_style BOOLEAN,
  product_id SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(product_id)
      REFERENCES products(id)
);

-- DROP TABLE IF EXISTS skus;
CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  quantity INT,
  size VARCHAR(10),
  styleId SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(styleId)
    REFERENCES styles(id)
);

-- DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  thumbnail_url VARCHAR(300),
  url VARCHAR (300),
  styleId SERIAL,
  CONSTRAINT fk
    FOREIGN KEY(styleId)
    REFERENCES styles(id)
);



INSERT INTO products (name, slogan, description, category, default_price) VALUES ('Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', 140);
INSERT INTO products (name, slogan, description, category, default_price) VALUES ('Bright Future Sunglasses','Youve got to wear shades', 'Where youre going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.', 'Accessories', 69);
INSERT INTO features (id, product_id, feature, value) VALUES (1,1,'Fabric', 'Canvas');
INSERT INTO features (id, product_id, feature, value) VALUES (2,2,'Buttons', 'Brass');