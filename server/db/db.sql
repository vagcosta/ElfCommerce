/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `code` varchar(50) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `store_id` varchar(60) NOT NULL DEFAULT '',
  `added_by` varchar(60) NOT NULL,
  `parent_id` varchar(60) DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table country
# ------------------------------------------------------------

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `flag` varchar(20) NOT NULL DEFAULT '',
  `tel_code` varchar(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;

INSERT INTO `country` (`id`, `name`, `flag`, `tel_code`)
VALUES
	(1,'United States','','+1'),
	(2,'Australia','','+61'),
	(3,'Singapore','','+65'),
	(4,'United Kingdom','','+44'),
	(5,'Malaysia','','+60'),
	(6,'Indonesia','','+62'),
	(7,'India','','+91'),
	(8,'Philippines','','+63');

/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table currency
# ------------------------------------------------------------

DROP TABLE IF EXISTS `currency`;

CREATE TABLE `currency` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '',
  `symbol` varchar(3) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;

INSERT INTO `currency` (`id`, `name`, `symbol`)
VALUES
	(1,'United States Dollar','USD'),
	(2,'Euro','EUR'),
	(3,'Singapore Dollar','SGD'),
	(4,'Malaysia Ringgit','MYR'),
	(5,'Indonesian Rupiah','INR'),
	(6,'Chinese Yuan','CNY'),
	(7,'Japanese Yen','JPY');

/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table manufacturer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `manufacturer`;

CREATE TABLE `manufacturer` (
  `code` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `url` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `contact` varchar(60) NOT NULL DEFAULT '',
  `address` varchar(100) NOT NULL DEFAULT '',
  `logo` varchar(200) NOT NULL,
  `store_id` varchar(60) NOT NULL,
  `country_id` tinyint(3) NOT NULL,
  `added_by` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table order
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `code` varchar(60) NOT NULL DEFAULT '',
  `store_id` varchar(60) NOT NULL,
  `added_by` varchar(60) NOT NULL DEFAULT '',
  `added_on` datetime NOT NULL,
  `paid_on` datetime DEFAULT NULL,
  `customer_name` varchar(100) NOT NULL,
  `shipping_address` varchar(300) NOT NULL DEFAULT '',
  `billing_address` varchar(300) NOT NULL DEFAULT '',
  `contact` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table order_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_product`;

CREATE TABLE `order_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `purchased_price` decimal(10,2) NOT NULL,
  `order_id` int(11) NOT NULL,
  `quantity` smallint(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `code` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `store_id` varchar(60) NOT NULL,
  `category_id` varchar(60) NOT NULL DEFAULT '',
  `sku` varchar(120) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT '',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `allow_quantity` tinyint(1) NOT NULL DEFAULT '1',
  `added_on` datetime NOT NULL,
  `added_by` varchar(60) NOT NULL DEFAULT '',
  `unit_price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `cover_image` varchar(200) NOT NULL DEFAULT '',
  `supplier_id` varchar(60) NOT NULL,
  `manufacturer_id` varchar(60) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `name` (`name`),
  KEY `description` (`description`),
  KEY `code` (`code`),
  KEY `sku` (`sku`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product_attribute
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_attribute`;

CREATE TABLE `product_attribute` (
  `code` varchar(60) NOT NULL DEFAULT '',
  `product_id` varchar(60) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `quantity` int(9) NOT NULL,
  `var_price` decimal(10,2) NOT NULL,
  `added_on` datetime NOT NULL,
  `added_by` varchar(60) NOT NULL DEFAULT '',
  `product_attribute_category_id` tinyint(2) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `product_id` (`product_id`),
  KEY `product_attribute_category_id` (`product_attribute_category_id`),
  KEY `added_by` (`added_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table product_attribute_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_attribute_category`;

CREATE TABLE `product_attribute_category` (
  `id` tinyint(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product_attribute_category` WRITE;
/*!40000 ALTER TABLE `product_attribute_category` DISABLE KEYS */;

INSERT INTO `product_attribute_category` (`id`, `name`)
VALUES
	(1,'Color'),
	(2,'Size');

/*!40000 ALTER TABLE `product_attribute_category` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table product_image
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product_image`;

CREATE TABLE `product_image` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL DEFAULT '',
  `product_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(500) NOT NULL DEFAULT '',
  `logo` varchar(200) NOT NULL DEFAULT '',
  `created_on` datetime NOT NULL,
  `created_by` varchar(60) NOT NULL DEFAULT '',
  `country_id` tinyint(3) NOT NULL,
  `language` varchar(5) NOT NULL DEFAULT '',
  `currency_id` tinyint(3) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;

INSERT INTO `store` (`code`, `name`, `description`, `logo`, `created_on`, `created_by`, `country_id`, `language`, `currency_id`, `facebook`, `twitter`, `status`)
VALUES
	('asdfasdfasdfasd','Elf Commerce1','aabbcc','https://cdn.dribbble.com/users/1141152/screenshots/4450915/ecommerce-logo-1-dribbble.jpg','0000-00-00 00:00:00','40s1cqdw6jmyyiixe',3,'en',3,'','',1);

/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supplier
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `code` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(200) NOT NULL DEFAULT '',
  `url` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(60) NOT NULL,
  `address` varchar(100) NOT NULL,
  `logo` varchar(200) NOT NULL,
  `store_id` varchar(60) NOT NULL,
  `country_id` tinyint(3) NOT NULL,
  `added_by` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `code` varchar(20) NOT NULL DEFAULT '',
  `store_id` varchar(60) NOT NULL DEFAULT '',
  `name` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `salt` varchar(32) NOT NULL DEFAULT '',
  `joined_on` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `name` (`name`),
  KEY `email` (`email`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`code`, `store_id`, `name`, `email`, `password`, `salt`, `joined_on`, `status`)
VALUES
	('40s1cqdw6jmyyiixe','asdfasdfasdfasd','Nick Chen','test@test.com','b9d8f73d5c643d6c0558dd610c94f09f','EO4fwIBPKw5tVKl2a0eT8gW3ynjwG13Q','2018-10-07 14:22:30',1);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_access_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_access_token`;

CREATE TABLE `user_access_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(500) NOT NULL DEFAULT '',
  `user_id` varchar(50) NOT NULL DEFAULT '',
  `expired_on` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_address
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_address`;

CREATE TABLE `user_address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(200) NOT NULL DEFAULT '',
  `postal` varchar(16) NOT NULL DEFAULT '',
  `type` varchar(1) NOT NULL DEFAULT '',
  `user_id` varchar(50) NOT NULL DEFAULT '',
  `country` int(11) NOT NULL,
  `region` varchar(50) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_contact`;

CREATE TABLE `user_contact` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) NOT NULL,
  `number` varchar(30) NOT NULL DEFAULT '',
  `type` varchar(1) NOT NULL DEFAULT '',
  `country_id` tinyint(3) NOT NULL,
  `area_code` varchar(11) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_refresh_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_refresh_token`;

CREATE TABLE `user_refresh_token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(500) NOT NULL DEFAULT '',
  `user_id` varchar(50) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table warehouse
# ------------------------------------------------------------

DROP TABLE IF EXISTS `warehouse`;

CREATE TABLE `warehouse` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;