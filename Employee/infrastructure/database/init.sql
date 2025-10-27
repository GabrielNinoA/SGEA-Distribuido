-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Crear tabla de empleados
CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(50) NOT NULL,
    incomeDate DATETIME NOT NULL,
    isActive BOOLEAN DEFAULT true,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_is_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla de logs de autenticación
CREATE TABLE IF NOT EXISTS auth_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    action VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear usuario administrador por defecto
INSERT INTO employees (
    firstName,
    lastName,
    phone,
    email,
    rol,
    incomeDate,
    isActive,
    username,
    password
) VALUES (
    'Admin',
    'System',
    '0000000000',
    'admin@system.com',
    'admin',
    NOW(),
    true,
    'admin',
    '$2b$10$YourHashedPasswordHere'  -- Asegúrate de cambiar esto por un hash real
) ON DUPLICATE KEY UPDATE email = email;
