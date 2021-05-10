-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sp_games
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `rating` smallint NOT NULL,
  `gameid` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` int NOT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `gameid_idx` (`gameid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `gameid` FOREIGN KEY (`gameid`) REFERENCES `game` (`gameid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (9,'Enjoyed the game! The story and gameplay was good!',7,8,'2021-01-13 01:10:45',9),(10,'Love the chill farming and growing your own crops!',9,9,'2021-01-13 01:13:50',11),(11,'Really brings back nostalgia from pokemon!',6,13,'2021-01-31 08:06:18',12),(12,'Love the constant updates and competitive gameplay!',9,14,'2021-01-31 08:06:18',9),(13,'Loved the immersive gameplay and sense of adventure the game gave!',8,8,'2021-01-31 09:11:14',11),(14,'Love the ability to battle other players and fight dojos!',9,13,'2021-01-31 09:31:31',9),(15,'Love being able to mine and interact with villagers!',8,9,'2021-01-31 09:32:39',9),(16,'Enjoyed the game! The story and gameplay was good!',8,14,'2021-02-01 03:36:45',12),(17,'I love the freedom to build anything you want and the community!',9,15,'2021-02-01 05:11:07',9),(18,'I love this game! The competitiveness drives me crazy!',8,16,'2021-02-01 05:12:43',12),(19,'The game is fast-paced and exciting. Would recommend!',9,16,'2021-02-01 05:13:09',11),(20,'It was fun being able to have a profession and contribute to the player-based economy!',7,15,'2021-02-01 05:15:17',11),(21,'I love being able to catch many temtems.',7,13,'2021-02-01 05:20:59',11),(22,'I love it!',9,14,'2021-02-01 05:23:06',11);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-07 11:40:35
