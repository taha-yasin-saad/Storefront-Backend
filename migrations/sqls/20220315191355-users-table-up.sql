CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    username VARCHAR(150),
    password VARCHAR(255), 
    phone integer,
    about text
);