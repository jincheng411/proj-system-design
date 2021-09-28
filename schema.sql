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

COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/jincheng/Desktop/rfe/sdc/products/csv-data/product.csv'
WITH DELIMITER ',' CSV HEADER NULL 'null';

COPY features(id, product_id, feature, value)
FROM '/Users/jincheng/Desktop/rfe/sdc/products/csv-data/features.csv'
WITH DELIMITER ',' CSV HEADER NULL 'null';

COPY styles(id,product_id, name, original_price, sale_price, default_style)
FROM '/Users/jincheng/Desktop/rfe/sdc/products/csv-data/styles.csv'
WITH DELIMITER ',' CSV HEADER NULL 'null';

COPY skus(id,styleId, quantity, size, styleId)
FROM '/Users/jincheng/Desktop/rfe/sdc/products/csv-data/skus.csv'
WITH DELIMITER ',' CSV HEADER NULL 'null';


COPY photos(id,styleId, thumbnail_url, url)
FROM '/Users/jincheng/Desktop/rfe/sdc/products/csv-data/skus.csv'
WITH DELIMITER ',' CSV HEADER NULL 'null';

