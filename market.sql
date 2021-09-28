-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: market
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Solar Panels','A solar panel, or photo-voltaic (PV) module, is an assembly of photo-voltaic cells mounted in a framework for installation. Solar panels use sunlight as a source of energy to generate direct current electricity. A collection of PV modules is called a PV panel, and a system of PV panels is called an array. Arrays of a photovoltaic system supply solar electricity to electrical equipment.','category-solar-icon.svg'),(2,'Wind Turbines','A wind turbine is a device that converts the wind\'s kinetic energy into electrical energy. Smaller wind turbines are used for applications such as battery charging for auxiliary power for boats or caravans, and to power traffic warning signs. Larger turbines can contribute to a domestic power supply while selling unused power back to the utility supplier via the electrical grid.','category-erlandh-Wind-Turbine.svg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `cost` double DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'360 Watt Black Frame NeON 2 Solar Panel - Cello technology','40mm Black Frame, White Backsheet.',350,'LG360N1C-N5-2T.jpg',1),(2,'400 Watt NeON R Solar Panel, Cello technology - Black Frame','40mm Black Frame, White Backsheet.',450,'LG400Q1C-A6-2T.jpg',1),(3,'435 Watt NeON R Prime Solar Panel, Cello technology - Black Frame','40mm Black Frame, White Backsheet.',500,'LG435QAC-A6-2T.jpg',1),(4,'370 Watt Mono Solar Panel - Black 30mm Frame','Half-Cut Cell Solar Panel - 120 Cell , 30mm Black Frame, White Backsheet.',400,'Panasonic-EVPV370-2T.jpg',1),(5,' Q-Peak Duo G6+ 340 Watt AC Solar Panel - All Black, with Enphase IQ 7+ Micro Inverter','Black Frame (32mm), Black Backsheet - Half-Cut Cell Solar Panel - 120 Cell.',350,'Q-Cells-Q.Peak-Duo-BLK-G6340AC-2T.jpg',1),(6,'Q-Peak Duo G6+ 340 Watt Mono Solar Panel - All Black','Black Frame (32mm), Black Backsheet - Half-Cut Cell Solar Panel - 120 Cell.',200,'Q-Cells-Q.Peak-Duo-BLK-G6-340-2T.jpg',1),(7,'365 Watt Mono Solar Panel - All Black','132 Half-Cell Monocrystalline solar panel. 35mm clear frame, Black backsheet.',250,'Trina-TSM-365-DE06X.05-II-2T.jpg',1),(8,'410 Watt Mono Solar Panel - Pallet Quantity - 31 Solar Panels','144 Half-Cell Monocrystalline solar panel. 35mm clear frame, White backsheet. TS4 connectors.',7000,'Trina-TSM-410-DE15M-Pallet-2T.jpg',1),(9,'Air 30 Land Wind Turbine 12V','Industrial applications in moderate to high wind regimes',950,'Primus-1-AR30-10-12-2T.jpg',2),(10,'Air 30 Land Wind Turbine 24V','Industrial applications in moderate to high wind regimes',950,'Primus-1-AR30-10-24-2T.jpg',2),(11,'Air 40 Land Wind Turbine 24V','Quiet operation in low to moderate wind regimes',950,'Primus-1-AR40-10-24-2T.jpg',2),(12,'Air 40 Land Wind Turbine 48V','Quiet operation in low to moderate wind regimes',950,'Primus-1-AR40-10-48-2T.jpg',2),(13,'Air Breeze Marine 24V Wind Turbine','Quiet operation in low to moderate wind regimes',1200,'Primus-1-ARBM-15-24-2T.jpg',2),(14,'Air Breeze Marine 48V Wind Turbine','Quiet operation in low to moderate wind regimes',1300,'Primus-1-ARBM-15-48-2T.jpg',2),(15,'Silent X Marine 12V Wind Turbine','Designed With Built-in Regulator and Marine Grade Paint - (Silent Blue Blades)',1500,'Primus-1-ARSM-15-12-2T.jpg',2);
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_order`
--

DROP TABLE IF EXISTS `shop_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shop_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `goods_id` int NOT NULL,
  `goods_cost` double NOT NULL,
  `goods_amount` int NOT NULL,
  `total` double NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goods_id_idx` (`goods_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `goods_id` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_order`
--

LOCK TABLES `shop_order` WRITE;
/*!40000 ALTER TABLE `shop_order` DISABLE KEYS */;
INSERT INTO `shop_order` VALUES (17,22,7,250,3,750,'2021-09-27','2021-09-27');
/*!40000 ALTER TABLE `shop_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(50) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'SELLERSELLER','$2a$07$hHj8X5trf8hAAJy2haAqDOuTFMFaDO1arsRP.ABUpN.uDoyOTQd7i','SELLER'),(2,'ADMINADMIN','$2a$07$Pn3fVFyEhn..VFC.8WmTkepk.RkRCCqGLWya8FE4jpwDpFHFUkrmm','ADMIN'),(3,'USERUSER','$2a$07$8di6ScrGrVxdcMUcn3EcWez9a9FVs361jnNJsyWh1JzMwnBqpbRzS','USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_phone` varchar(100) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (22,'A1','797401985','a1@a1','Kolbego 7');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'market'
--

--
-- Dumping routines for database 'market'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-28  5:36:15
