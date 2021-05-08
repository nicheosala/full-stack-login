CREATE DATABASE IF NOT EXISTS `nodelogin`;
USE `nodelogin`;
CREATE TABLE IF NOT EXISTS `accounts` (`id` INT AUTO_INCREMENT PRIMARY KEY, `username` varchar(50) NOT NULL, `password` varchar(255) NOT NULL);

-- INSERT INTO `accounts` (`username`, `password`) VALUES ('test', 'test');
