-- MariaDB dump 10.19  Distrib 10.4.19-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: hotel
-- ------------------------------------------------------
-- Server version	10.4.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inventory_kamar`
--

DROP TABLE IF EXISTS `inventory_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kamar_id` int(11) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `kondisi_rusak` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `inventory_kamar_FK` (`kamar_id`),
  CONSTRAINT `inventory_kamar_FK` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_kamar`
--

LOCK TABLES `inventory_kamar` WRITE;
/*!40000 ALTER TABLE `inventory_kamar` DISABLE KEYS */;
INSERT INTO `inventory_kamar` VALUES (9,4,'kedap suara',0),(10,4,'gayung',0),(11,4,'kasur',0),(12,4,'toilet',0),(13,5,'berisik',0),(14,5,'baskom',0),(15,5,'tisu',0),(26,28,'gayung',0),(27,28,'teras',0);
/*!40000 ALTER TABLE `inventory_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jenis_kamar`
--

DROP TABLE IF EXISTS `jenis_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jenis_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `harga_kamar` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jenis_kamar`
--

LOCK TABLES `jenis_kamar` WRITE;
/*!40000 ALTER TABLE `jenis_kamar` DISABLE KEYS */;
INSERT INTO `jenis_kamar` VALUES (1,'reguler',160000),(2,'premium',240000);
/*!40000 ALTER TABLE `jenis_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kamar`
--

DROP TABLE IF EXISTS `kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `jenis_kamar` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `max_kapasitas` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `kamar_FK` (`jenis_kamar`),
  CONSTRAINT `kamar_FK` FOREIGN KEY (`jenis_kamar`) REFERENCES `jenis_kamar` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kamar`
--

LOCK TABLES `kamar` WRITE;
/*!40000 ALTER TABLE `kamar` DISABLE KEYS */;
INSERT INTO `kamar` VALUES (4,'x30-04',1,'2022-03-12 06:46:23',3,0),(5,'x30-05',1,'2022-03-12 06:47:06',2,1),(28,'xbox',2,'2022-04-02 14:03:44',4,0);
/*!40000 ALTER TABLE `kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kamar_gallery`
--

DROP TABLE IF EXISTS `kamar_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kamar_gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `kamar_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kamar_gallery_FK` (`kamar_id`),
  CONSTRAINT `kamar_gallery_FK` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kamar_gallery`
--

LOCK TABLES `kamar_gallery` WRITE;
/*!40000 ALTER TABLE `kamar_gallery` DISABLE KEYS */;
INSERT INTO `kamar_gallery` VALUES (1,'assets/uploads/gallery-1648908224475-114487235.jpg',28),(2,'assets/uploads/gallery-1648908224479-491131138.jpg',28),(3,'assets/uploads/gallery-1648908224549-791133483.jpg',28);
/*!40000 ALTER TABLE `kamar_gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kamar_thumbnail`
--

DROP TABLE IF EXISTS `kamar_thumbnail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kamar_thumbnail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `kamar_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kamar_thumbnail_FK` (`kamar_id`),
  CONSTRAINT `kamar_thumbnail_FK` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kamar_thumbnail`
--

LOCK TABLES `kamar_thumbnail` WRITE;
/*!40000 ALTER TABLE `kamar_thumbnail` DISABLE KEYS */;
INSERT INTO `kamar_thumbnail` VALUES (4,'assets/uploads/thumbnail-1648908224441-966322178.jpg',28);
/*!40000 ALTER TABLE `kamar_thumbnail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log_pemesanan_kamar`
--

DROP TABLE IF EXISTS `log_pemesanan_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_pemesanan_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kamar_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `nama_user` varchar(100) DEFAULT NULL,
  `no_telp` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pricing` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pemesanan_kamar_FK` (`kamar_id`) USING BTREE,
  KEY `pemesanan_kamar_FK_1` (`created_by`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_pemesanan_kamar`
--

LOCK TABLES `log_pemesanan_kamar` WRITE;
/*!40000 ALTER TABLE `log_pemesanan_kamar` DISABLE KEYS */;
INSERT INTO `log_pemesanan_kamar` VALUES (2,4,'2022-03-12 10:56:41',1,'uus',121231,'asas@hk',NULL),(3,5,'2022-03-12 11:26:23',1,'uus',121231,'asas@hk',128000),(4,4,'2022-03-12 11:30:10',1,'uhs',121231,'asas@hk',160000),(5,4,'2022-03-27 04:12:40',1,'uhs',121231,'asas@hk',80000),(6,5,'2022-03-27 04:27:35',1,'uhs',121231,'asas@hk',80000),(7,4,'2022-03-27 06:20:06',1,'uhs',121231,'asas@hk',80000),(8,5,'2022-03-27 06:23:27',1,'uhs',121231,'asas@hk',80000),(9,5,'2022-03-27 06:30:45',1,'uhs',121231,'asas@hk',80000),(10,5,'2022-03-27 06:34:34',1,'uhs',121231,'asas@hk',80000),(11,5,'2022-03-27 06:35:01',1,'uhs',121231,'asas@hk',80000),(12,5,'2022-03-27 06:35:33',1,'uhs',121231,'asas@hk',80000),(13,5,'2022-03-27 07:23:06',1,'uhs',121231,'asas@hk',80000),(14,4,'2022-03-27 07:23:11',1,'uhs',121231,'asas@hk',80000),(15,4,'2022-03-30 14:00:41',1,'uhs',121231,'asas@hk',160000),(16,5,'2022-03-31 09:17:35',1,'uhs',121231,'asas@hk',160000),(17,5,'2022-03-31 09:22:35',1,'uhs',121231,'asas@hk',160000);
/*!40000 ALTER TABLE `log_pemesanan_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pemesanan_kamar`
--

DROP TABLE IF EXISTS `pemesanan_kamar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pemesanan_kamar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kamar_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `nama_user` varchar(100) DEFAULT NULL,
  `no_telp` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pricing` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pemesanan_kamar_FK` (`kamar_id`),
  KEY `pemesanan_kamar_FK_1` (`created_by`),
  CONSTRAINT `pemesanan_kamar_FK` FOREIGN KEY (`kamar_id`) REFERENCES `kamar` (`id`),
  CONSTRAINT `pemesanan_kamar_FK_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pemesanan_kamar`
--

LOCK TABLES `pemesanan_kamar` WRITE;
/*!40000 ALTER TABLE `pemesanan_kamar` DISABLE KEYS */;
INSERT INTO `pemesanan_kamar` VALUES (26,5,'2022-03-31 09:22:35',1,'uhs',121231,'asas@hk',160000);
/*!40000 ALTER TABLE `pemesanan_kamar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'super_admin'),(2,'resepsionis'),(3,'tamu');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_bencana_hotel`
--

DROP TABLE IF EXISTS `tb_bencana_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_bencana_hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `early_warning_date` timestamp NULL DEFAULT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `warning_level` int(11) DEFAULT NULL,
  `headline` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_bencana_hotel`
--

LOCK TABLES `tb_bencana_hotel` WRITE;
/*!40000 ALTER TABLE `tb_bencana_hotel` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_bencana_hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_diskon`
--

DROP TABLE IF EXISTS `tb_diskon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_diskon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `diskon` int(2) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_diskon`
--

LOCK TABLES `tb_diskon` WRITE;
/*!40000 ALTER TABLE `tb_diskon` DISABLE KEYS */;
INSERT INTO `tb_diskon` VALUES (1,20,'weekend'),(2,50,'special');
/*!40000 ALTER TABLE `tb_diskon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_item_kerusakan`
--

DROP TABLE IF EXISTS `tb_item_kerusakan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_item_kerusakan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `tb_kerusakan_hotel_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_item_kerusakan`
--

LOCK TABLES `tb_item_kerusakan` WRITE;
/*!40000 ALTER TABLE `tb_item_kerusakan` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_item_kerusakan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_kerusakan_hotel`
--

DROP TABLE IF EXISTS `tb_kerusakan_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_kerusakan_hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `jenis_kerusakan` int(11) DEFAULT NULL,
  `keterangan` varchar(100) DEFAULT NULL,
  `cause` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_kerusakan_hotel`
--

LOCK TABLES `tb_kerusakan_hotel` WRITE;
/*!40000 ALTER TABLE `tb_kerusakan_hotel` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_kerusakan_hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_warning_level`
--

DROP TABLE IF EXISTS `tb_warning_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_warning_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `advice` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_warning_level`
--

LOCK TABLES `tb_warning_level` WRITE;
/*!40000 ALTER TABLE `tb_warning_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_warning_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`role`),
  CONSTRAINT `users_FK` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'saya','aasa@gmail.com',1,'$2b$10$9.GAWalUodrxGbSIxJKO/eEFOCj5Fbt7cUtR0LEKB72O4Wp6NIngS'),(2,'krossing','uwa@gmail.com',1,'$2b$10$bH6ENPECsYg7ghnECELd0ey/HGzghY3UzP7J4t3mf.VM1UsXMRk1S'),(3,'krossing','test@mail.com',1,'$2b$10$aHwKirzte5u8fZVACbpQoeANE/v/NFSNb0FqE5Ffsvv.JB5gnD7M.'),(4,'krossing','test@mail.com',1,'$2b$10$GIuTGyMnr.p.NAgRcvv5Pu5O.ialftzDHqboodEseQRkZsYlh0Z8a'),(9,'krossing','test1@mail.com',1,'$2b$10$nuv9sx8GtWumXu8mepDd1uIyc1OIBMQYr7b.pMvGrvr7HqsVfdryu'),(10,'21313','sss@gmail.com',1,'$2b$10$6FUNwD0KNXID5FBYzfZAXuZZbENuaDBqPH9IOKBl7JkH9X.GdUqz.'),(11,'asasa','aaaa@gmail.com',1,'$2b$10$kUoPWdgMphA4NY2aZkw4NOqxkVrVCWPTv9aZ1mEjJ/DZIjeE8O.nS'),(18,'asdad','muhammad.rafli241103@gmail.com',1,'$2b$10$AK6LWDGbm6nz3Ai8Ci.V..0Y.l8OYOE5B30EpDiWfryZM/gLd7l7a'),(19,'asda','muhammada.rafli241103@gmail.com',1,'$2b$10$q5I3sTXtWUM2OkTaPObSQe2hx60KHMGvDI3fK5ASyVDlRyQe.sFb2'),(21,'jane doe','john@example.com',1,'$2b$10$oA/PZ5jIBYLRZ8e7ciR9TumXvmqiGIFN6MoIBe3SnjiR.U5TcRw0a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hotel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-09 10:45:54
