# ************************************************************
# Sequel Pro SQL dump
# Version 4135
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.28)
# Database: example_list
# Generation Time: 2016-07-26 00:13:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `items`;

CREATE TABLE `items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `description` text,
  `create_date` datetime DEFAULT NULL,
  `price` int(11) DEFAULT '0',
  `approved` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;

INSERT INTO `items` (`id`, `title`, `description`, `create_date`, `price`, `approved`)
VALUES
	(1,'ombrella','black ombrella','2016-07-25 20:21:16',10,1),
	(2,'phone','Old white phone','2016-07-25 20:21:40',50,0),
	(3,'table','200x80 wood table','2016-07-25 20:22:14',150,1),
	(4,'screen','22\' samsung 120hz screen','2016-07-25 20:23:05',70,0),
	(5,'tablet','7\' screen 2012','2016-07-25 20:23:01',85,1),
	(6,'phone','Motorola','2016-07-25 20:23:48',65,1),
	(8,'pc','4core 3500mhz 16gb ram, 1TB','2016-07-25 20:24:14',530,1),
	(9,'printer','laser printer 2010','2016-07-25 20:24:47',150,0),
	(10,'freezer','Broked freezer','2016-07-25 20:25:16',40,1),
	(11,'sofa','180x80','2016-07-25 20:26:11',350,1),
	(12,'bed','160x190','2016-07-25 20:26:46',250,0),
	(13,'playstation','version 3','2016-07-25 20:27:13',90,1);

/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
