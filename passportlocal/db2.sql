-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.25-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db2
CREATE DATABASE IF NOT EXISTS `db2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db2`;

-- Dumping structure for table db2.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `usr` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table db2.user: ~4 rows (approximately)
INSERT INTO `user` (`id`, `role`, `usr`, `pwd`) VALUES
	(3, 'user', 'bao', '$2b$10$vD9gTgHuAMpyw/zX1CBbOe4lI6cksXQZFBu43/48e4XGHghV4MqGu'),
	(4, 'user', 'linh', '$2b$10$0WbpexdAflxkoFL/pUnT0.ke.pTVSSK4WY4Lff5qvb5O/EQxJimJK'),
	(5, 'admin', 'truc', '$2b$10$Kep889CAFwwxHT1CSf1TXu7qRASkoaAGOepV5VVgE9Hli/.XvKhV2'),
	(6, 'user', 'cuong', '$2b$10$oimbrsk2NMYJmeVHIkmeye.Udua9EKrspPSQvpihjp8FAxjjkR/km');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
