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
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` double NOT NULL,
  `platform` varchar(10) NOT NULL,
  `year` year NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `catid` int NOT NULL,
  `images` varchar(255) DEFAULT '""',
  PRIMARY KEY (`gameid`),
  KEY `catid_idx` (`catid`),
  CONSTRAINT `catid` FOREIGN KEY (`catid`) REFERENCES `category` (`catid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (8,'Ori and the Blind Forest','Ori and the Blind Forest tells the tale of a young orphan destined for heroics, through a visually stunning action-platformer.',24.99,'PC',2020,'2021-01-13 01:09:29',11,'../images/ori.jpg'),(9,'Stardew Valley','You\'ve inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life!',14.99,'PS5',2020,'2021-01-13 01:12:34',11,'../images/stardew valley.jpg'),(13,'Temtem','Temtem is a massively multiplayer creature-collection adventure. Battle, tame, trade and explore the lovely Airborne Archipelago along your Temtem squad!',18.99,'XBOX',2020,'2021-01-25 15:42:20',9,'../images/temtem.jpg'),(14,'League of legends','League of Legends is a team-based game with over 140 champions to make epic plays with.',10.99,'PC',2020,'2021-01-25 15:42:20',8,'../images/league of legends.jpg'),(15,'Wurm online','Wurm Online is the ultimate sandbox MMORPG with total player freedom. Shape the land, build a village or wage war against enemy kingdoms.',13.99,'XBOX',2020,'2021-01-25 15:42:20',9,'../images/wurm online.jpg'),(16,'Valorant','Riot Games presents VALORANT a 5v5 character-based tactical FPS where precise gunplay meets unique agent abilities.',15.99,'Mobile',2020,'2021-01-25 15:42:20',6,'../images/valorant.png');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
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
