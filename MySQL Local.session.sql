CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    type ENUM('admin', 'user', 'company') NOT NULL
);

INSERT INTO users (username, password, type) VALUES
('admin1', 'password1', 'admin'),
('user1', 'password2', 'user'),
('company1', 'password3', 'company');
