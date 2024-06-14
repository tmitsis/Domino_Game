-- --------------------------------------------------------
-- Διακομιστής:                  127.0.0.1
-- Έκδοση διακομιστή:            10.1.38-MariaDB - mariadb.org binary distribution
-- Λειτ. σύστημα διακομιστή:     Win32
-- HeidiSQL Έκδοση:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for procedure dominoes.clean_board
DELIMITER //
CREATE PROCEDURE `clean_board`()
BEGIN
UPDATE dominoes_tiles SET player_hand=NULL;
END//
DELIMITER ;

-- Dumping structure for procedure dominoes.delete_user
DELIMITER //
CREATE PROCEDURE `delete_user`()
BEGIN
UPDATE players SET username=NULL , token=NULL;
END//
DELIMITER ;

-- Dumping structure for πίνακας dominoes.dominoes_tiles
CREATE TABLE IF NOT EXISTS `dominoes_tiles` (
  `id` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `player_hand` int(11) DEFAULT NULL,
  `last_Action` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dominoes.dominoes_tiles: ~28 rows (approximately)
INSERT INTO `dominoes_tiles` (`id`, `x`, `y`, `player_hand`, `last_Action`) VALUES
	(7, 0, 3, NULL, '2023-01-05 15:16:50'),
	(16, 1, 5, NULL, '2023-01-05 15:16:50'),
	(5, 1, 2, NULL, '2023-01-05 15:16:50'),
	(4, 0, 2, NULL, '2023-01-05 15:16:50'),
	(1, 0, 0, NULL, '2023-01-05 15:16:50'),
	(20, 5, 5, NULL, '2023-01-05 15:16:50'),
	(15, 0, 5, NULL, '2023-01-05 15:16:50'),
	(19, 4, 5, NULL, '2023-01-05 15:16:50'),
	(12, 2, 4, NULL, '2023-01-05 15:16:50'),
	(17, 2, 5, NULL, '2023-01-05 15:16:50'),
	(23, 2, 6, NULL, '2023-01-05 15:16:50'),
	(18, 3, 5, NULL, '2023-01-05 15:16:50'),
	(9, 3, 3, NULL, '2023-01-05 15:16:50'),
	(28, 1, 3, NULL, '2023-01-05 15:16:50'),
	(11, 1, 4, NULL, '2023-01-05 15:17:34'),
	(21, 0, 6, NULL, '2023-01-05 15:17:37'),
	(10, 0, 4, NULL, '2023-01-05 15:17:44'),
	(13, 3, 4, NULL, '2023-01-05 15:17:47'),
	(22, 1, 6, NULL, '2023-01-05 15:17:50'),
	(2, 0, 1, NULL, '2023-01-05 15:17:53'),
	(3, 1, 1, NULL, '2023-01-05 15:18:05'),
	(6, 2, 2, NULL, '2023-01-05 15:18:05'),
	(14, 4, 4, NULL, '2023-01-05 15:18:05'),
	(26, 5, 6, NULL, '2023-01-05 15:18:05'),
	(27, 6, 6, NULL, '2023-01-05 15:18:05'),
	(25, 4, 6, NULL, '2023-01-05 15:18:05'),
	(24, 3, 6, NULL, '2023-01-05 15:18:05'),
	(8, 2, 3, NULL, '2023-01-05 15:18:05');

-- Dumping structure for πίνακας dominoes.game_status
CREATE TABLE IF NOT EXISTS `game_status` (
  `status` enum('not active','initialized','started','ended','aborder') NOT NULL DEFAULT 'not active',
  `p_turn` enum('1','2') DEFAULT NULL,
  `result` enum('1','2','D') DEFAULT NULL,
  `last_change` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dominoes.game_status: ~0 rows (approximately)
INSERT INTO `game_status` (`status`, `p_turn`, `result`, `last_change`) VALUES
	('started', '2', '2', '2023-01-05 15:17:57');

-- Dumping structure for πίνακας dominoes.players
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `last_action` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dominoes.players: ~2 rows (approximately)
INSERT INTO `players` (`id`, `username`, `token`, `last_action`) VALUES
	(1, NULL, NULL, '2023-01-05 15:18:05'),
	(2, NULL, NULL, '2023-01-05 15:18:05');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
