/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
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
  `level` tinyint(1) NOT NULL DEFAULT '1',
  `parent_id` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`code`, `name`, `store_id`, `added_by`, `level`, `parent_id`, `status`)
VALUES
	('04Q9sSQE5','Peripherals','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('0x23BNkkj','Accessories','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('1UR4vU480','Computers','asdfasdfasdfasd','10wxg11jsabfnwt',1,'1UR4vU480',1),
	('5dkOCo5HQ','Beauty & Personal Care','asdfasdfasdfasd','10wxg11jsabfnwt',1,'5dkOCo5HQ',1),
	('66EkjpRcu','Food & Drinks','asdfasdfasdfasd','10wxg11jsabfnwt',1,'66EkjpRcu',1),
	('73wQH4Crw','Camera & Photo','asdfasdfasdfasd','10wxg11jsabfnwt',2,'87KOs5gR3',1),
	('87KOs5gR3','Electronics','asdfasdfasdfasd','10wxg11jsabfnwt',1,'87KOs5gR3',1),
	('BeSUKmVSb','Laptop Accessories','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('DLjxRtfuV','Toys & Games','asdfasdfasdfasd','10wxg11jsabfnwt',1,'DLjxRtfuV',1),
	('G4GZn7xVc','Skin Care','asdfasdfasdfasd','10wxg11jsabfnwt',2,'5dkOCo5HQ',1),
	('hSNrkgqAh','Servers','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('hSSO_MYQN','Mobiles & Electronics','asdfasdfasdfasd','10wxg11jsabfnwt',1,'hSSO_MYQN',1),
	('JeeGezUmc','Headphones','asdfasdfasdfasd','10wxg11jsabfnwt',2,'87KOs5gR3',1),
	('kul53RbdP','Cell Phones & Accessories','asdfasdfasdfasd','10wxg11jsabfnwt',2,'87KOs5gR3',1),
	('OipvvH4dt','GPS, Finders & Accessories','asdfasdfasdfasd','10wxg11jsabfnwt',2,'87KOs5gR3',1),
	('oTMsxZu2t','Printers','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('qu8Rin9wV','Monitors','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('sTG5zFy2F','Fashion','asdfasdfasdfasd','10wxg11jsabfnwt',1,'sTG5zFy2F',1),
	('T5_h-rpTQ','Home & Living','asdfasdfasdfasd','10wxg11jsabfnwt',1,'T5_h-rpTQ',1),
	('uVU1Bo2OG','Data Storage','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1),
	('vF7mpaqW6','Network Products','asdfasdfasdfasd','10wxg11jsabfnwt',2,'1UR4vU480',1);

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


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
	(8,'Philippines','','+63'),
	(9,'Germany','','+49'),
	(10,'China','','+86'),
	(11,'Japan','','+81'),
	(12,'South Korea','','+82');

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

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;

INSERT INTO `manufacturer` (`code`, `name`, `url`, `email`, `contact`, `address`, `logo`, `store_id`, `country_id`, `added_by`, `status`)
VALUES
	('1W_-svJXf','Karex Berhad','http://www.karex.com.my','test@karex.com.my',' +60 7-688 1996','141, Jln. Pontian, Pontian Besar, 82000 Pontian, Johor, Malaysia','https://s3-ap-southeast-1.amazonaws.com/isaham/stocks/karex-5247.png','asdfasdfasdfasd',5,'10wxg11jsabfnwt',1),
	('3-XU0ylVQ','Xiaomi Corporation','https://www.mi.com','contact@mi.com','400-100-5678','Haidian District, Beijing, China','https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/480px-Xiaomi_logo.svg.png','asdfasdfasdfasd',10,'10wxg11jsabfnwt',1),
	('36ZviehKi','Samsung','www.samsung.com','example@samsung.com','+1101010101','Samsung Silicon Valley','http://logok.org/wp-content/uploads/2014/07/Samsung-logo-2015-640x480.png','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('4bwj7TQhS','Apple Inc','http://www.apple.com','example@apple.com','+1212341234123','Apple Campus, Cupertino, CA 95014, USA','http://www.ourturnnj.com/wp-content/uploads/2018/10/apple-logos-complex-company-primary-7.jpeg','asdfasdfasdfasd',1,'10wxg11jsabfnwt',0),
	('6XQ10fbfC','Tsingtao Brewery Co. Ltd.','http://tsingtaobeer.com/','contactus@tsingtaobeer.com','+1 (844) 340-4494','Unknown','http://www.chinawhisper.com/wp-content/uploads/2013/09/Tsingtao-Beer.jpg','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('7Y8RXQf2v','The North Face, Inc.','https://www.thenorthface.com','example@thenorthface.com','+1212341234123','Alameda, California, United States','https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/200px-The_North_Face_logo.svg.png','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('BSpjnVW0d','Adidas','https://www.adidas.com','test@adidas.com','+1237654234','Herzogenaurach, Germany','http://findthatlogo.com/wp-content/gallery/adidas-logos/red-adidas-logo-image.gif','asdfasdfasdfasd',12,'10wxg11jsabfnwt',1),
	('CaNKr2FQy','Citizen Watch Co., Ltd.','https://www.citizenwatch.com','test@citizenwatch.com','+8102131237','Nishi-tokyo, Tokyo, Japan','https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/092015/citizen_logo.png?itok=XC9LRjLc','asdfasdfasdfasd',11,'10wxg11jsabfnwt',1),
	('IiV9LcYYl','Bintang Beer','http://www.multibintang.co.id','example@multibintang.co.id','(62-21) 2783 3800','Talavera Office Park, 20th fl Jl. Let Jend TB Simatupang kav. 22 – 26 Po Box 3264 JKT 10032 Jakarta ','https://mullerbev.com/wp-content/uploads/2018/10/Bintang.png','asdfasdfasdfasd',6,'10wxg11jsabfnwt',1),
	('mlwKOZfhC','International Business Machines Corporation','https://www.ibm.com','example@ibm.com','1800 418 1000','Armonk, New York, United States','https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/122015/untitled-1_84.png?itok=6yX4oOLu','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('NPq2KG1fR','TWG Tea','https://twgtea.com','contact@twgtea.com','+65 6538 1837',' 2 Stamford Road, Singapore 178882','https://upload.wikimedia.org/wikipedia/en/thumb/0/04/TWG_Tea_logo.jpg/220px-TWG_Tea_logo.jpg','asdfasdfasdfasd',3,'10wxg11jsabfnwt',1),
	('qO_j3pst2','Huawei Technologies Co., Ltd.','https://www.huawei.com','contact@huawei.com','1212341234123','Shenzhen, China','https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062013/huawei_0.jpg?itok=mNbiNOQ6','asdfasdfasdfasd',11,'10wxg11jsabfnwt',1),
	('SBhHS8pKC','asdfa','asdfa','asdfa','123123123','sadfads fasd fasd fadsf','','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('Zv1NoIa4-','Streets','https://www.streetsicecream.com.au','example@streetsicecream.com.au','1800 888 449','Unilever Australia  Level 17  2 Park Street  Sydney  NSW 2000  Australia','https://www.artie.net.au/wp-content/uploads/2015/03/streets_logo.jpg','asdfasdfasdfasd',2,'10wxg11jsabfnwt',1);

/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;


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
  `customer_contact` varchar(60) NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;

INSERT INTO `order` (`code`, `store_id`, `added_by`, `added_on`, `paid_on`, `customer_name`, `shipping_address`, `billing_address`, `customer_contact`, `status`)
VALUES
	('4hfIWZ-ZQ','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:09:26',NULL,'Nick Chen','Shipping address 123','Billing address 123','+65908290342',1),
	('9lG7IQn9O','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:13:23','2018-12-22 15:43:41','Nick Chen','Shipping address 1234','Billing address 123','0152',2),
	('bP5XzNaef','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:12:34',NULL,'Nick Chen','Shipping address 123','Billing address 123','+65908290342',1),
	('d20-JYZlJ','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 04:40:38',NULL,'Nick Chen','Shipping address 123','Billing address 123','+65908290342',1),
	('EckKm58z3','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:59:34',NULL,'teadsfads fads fads','adsf aszdf adsf','asdf adsf adsf','23423',1),
	('MeuiwM0-m','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:15:34',NULL,'teadsfads fads fads','adsf aszdf adsf','asdf adsf adsf','',1),
	('Odj-jfMkv','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:08:53',NULL,'teadsfads fads fads','adsf aszdf adsf','asdf adsf adsf','',1),
	('OKzhtPhtR','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 04:40:43',NULL,'Nick Chen','Shipping address 123','Billing address 123','+65908290342',1),
	('wZJ7Lq4JI','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:14:46',NULL,'teadsfads fads fads','adsf aszdf adsf','asdf adsf adsf','54745674',1),
	('Yfa6XZ-ZK','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-11 07:34:33',NULL,'asdf asdfasd fasdf sad f','asdf asdfads fasd','sadf adsf adsf asdf asd','',1),
	('z3ScJsFhh','asdfasdfasdfasd','10wxg11jsabfnwt','2019-01-12 05:10:28',NULL,'Nick Chen','Shipping address 123','Billing address 123','+65908290342',1);

/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_product`;

CREATE TABLE `order_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` varchar(60) NOT NULL DEFAULT '',
  `purchasing_price` decimal(10,2) NOT NULL,
  `order_id` varchar(60) NOT NULL DEFAULT '',
  `quantity` smallint(3) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;

INSERT INTO `order_product` (`id`, `product_id`, `purchasing_price`, `order_id`, `quantity`, `status`)
VALUES
	(2,'sARemw0Jf',100.00,'bP5XzNaef',3,1),
	(3,'MhIeXGwrS',30.00,'MeuiwM0-m',1,1),
	(4,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(5,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(6,'sARemw0Jf',100.00,'9lG7IQn9O',3,0),
	(7,'sARemw0Jf',100.00,'9lG7IQn9O',3,0),
	(8,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(9,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(10,'_toK6-HNE',100.00,'EckKm58z3',1,0),
	(11,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(12,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(13,'_toK6-HNE',100.00,'EckKm58z3',1,0),
	(14,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(15,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(16,'_toK6-HNE',100.00,'EckKm58z3',5,0),
	(17,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(18,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(19,'_toK6-HNE',100.00,'EckKm58z3',5,0),
	(20,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(21,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(22,'_toK6-HNE',100.00,'EckKm58z3',5,0),
	(23,'sARemw0Jf',100.00,'9lG7IQn9O',3,0),
	(24,'MhIeXGwrS',30.00,'9lG7IQn9O',1,0),
	(25,'sARemw0Jf',100.00,'9lG7IQn9O',3,0),
	(26,'MhIeXGwrS',30.00,'9lG7IQn9O',1,0),
	(27,'sARemw0Jf',100.00,'9lG7IQn9O',3,1),
	(28,'MhIeXGwrS',30.00,'9lG7IQn9O',1,1),
	(29,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(30,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(31,'_toK6-HNE',100.00,'EckKm58z3',5,0),
	(32,'MhIeXGwrS',30.00,'EckKm58z3',2,0),
	(33,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(34,'_toK6-HNE',100.00,'EckKm58z3',5,0),
	(35,'MhIeXGwrS',30.00,'EckKm58z3',24,0),
	(36,'9EUVNVqKb',99.99,'EckKm58z3',3,0),
	(37,'MhIeXGwrS',30.00,'EckKm58z3',24,1),
	(38,'9EUVNVqKb',99.99,'EckKm58z3',3,1);

/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table password_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `password_token`;

CREATE TABLE `password_token` (
  `token` varchar(200) NOT NULL,
  `added_on` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `password_token` WRITE;
/*!40000 ALTER TABLE `password_token` DISABLE KEYS */;

INSERT INTO `password_token` (`token`, `added_on`, `status`)
VALUES
	('23c63a80-3063-11e9-a2da-116c52c0f8c5','2019-02-14 14:16:37',1),
	('bpRxsMUCN','2019-02-14 14:07:29',1),
	('MFVKMbDms','2019-02-14 14:13:14',1),
	('QATkaRMuq','2019-02-14 14:09:44',1),
	('Yss2R623J','2019-02-14 14:11:01',1);

/*!40000 ALTER TABLE `password_token` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`code`, `name`, `store_id`, `category_id`, `sku`, `description`, `quantity`, `allow_quantity`, `added_on`, `added_by`, `unit_price`, `cost`, `cover_image`, `supplier_id`, `manufacturer_id`, `status`)
VALUES
	('7agCyPxkG','food','asdfasdfasdfasd','87KOs5gR3','123','',23,1,'2019-01-01 14:27:40','10wxg11jsabfnwt',123.00,1234.00,'','','',1),
	('9EUVNVqKb','Product 211','asdfasdfasdfasd','sTG5zFy2F','afdsafsd2342asdfasd','Test product 2\n\n\n123\n\n\nasdf aksdfjalsdj falsdjflas',200,1,'2019-01-03 02:20:42','10wxg11jsabfnwt',99.99,65.99,'https://www.sandisk.com/content/dam/sandisk-main/en_us/assets/about/media/product/retail/usb/cruzer_blade_usb_flash_drive/SDCZ50_angle_Large.jpg','','',1),
	('APMpjgFGh','food','asdfasdfasdfasd','87KOs5gR3','123','',23,1,'2018-12-29 05:43:26','10wxg11jsabfnwt',123.00,123.00,'','','',1),
	('ctRM9n7Di','food','asdfasdfasdfasd','87KOs5gR3','123','',23,1,'2019-01-01 14:18:29','10wxg11jsabfnwt',123.00,1234.00,'','','',1),
	('eeaVW3l7V','food','asdfasdfasdfasd','87KOs5gR3','123','',23,1,'2019-01-01 14:13:20','10wxg11jsabfnwt',123.00,123.00,'','','',1),
	('eMVJNDclC','food','asdfasdfasdfasd','87KOs5gR3','123','',0,1,'2018-12-29 05:43:05','10wxg11jsabfnwt',123.00,123.00,'','','',1),
	('ghZZ6pxYv','food','asdfasdfasdfasd','87KOs5gR3','123','',23,1,'2019-01-01 14:20:15','10wxg11jsabfnwt',123.00,1234.00,'','','',1),
	('MhIeXGwrS','Test product 1','asdfasdfasdfasd','OipvvH4dt','tp1-123456','<p>Test product 1</p>',991,1,'2019-01-03 01:57:16','10wxg11jsabfnwt',30.00,19.99,'','','',1),
	('sARemw0Jf','Product 2','asdfasdfasdfasd','cat123','afdsafsd2342asdfasd','Test product 2',100,1,'2019-01-03 02:11:37','10wxg11jsabfnwt',100.00,87.00,'https://www.sandisk.com/content/dam/sandisk-main/en_us/assets/about/media/product/retail/usb/cruzer_blade_usb_flash_drive/SDCZ50_angle_Large.jpg','','',1),
	('vQbkNKQWN','test product','asdfasdfasdfasd','DLjxRtfuV','lkk','test1',10,1,'2019-01-20 18:56:13','10wxg11jsabfnwt',9.00,9.00,'','Qw1DkfP_8','IiV9LcYYl',1),
	('_toK6-HNE','Product 2','asdfasdfasdfasd','cat123','afdsafsd2342asdfasd','<p>Test product 2</p>',100,1,'2019-01-03 02:11:03','10wxg11jsabfnwt',100.00,87.00,'https://www.sandisk.com/content/dam/sandisk-main/en_us/assets/about/media/product/retail/usb/cruzer_blade_usb_flash_drive/SDCZ50_angle_Large.jpg','','',1);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `product_attribute` WRITE;
/*!40000 ALTER TABLE `product_attribute` DISABLE KEYS */;

INSERT INTO `product_attribute` (`code`, `product_id`, `name`, `quantity`, `var_price`, `added_on`, `added_by`, `product_attribute_category_id`, `status`)
VALUES
	('1N5gV_1NOu','product-asdfasd23r2jk3hfads','Small-QF7SLl6DZh',10,23.00,'2019-02-05 12:50:10','10wxg11jsabfnwt',2,1),
	('DhIefGwaB','MhIeXGwrS','Large',100,0.00,'2019-01-01 00:00:00','10wxg11jsabfnwt',2,1),
	('gVwIkoEwT','MhIeXGwrS','Small',99,1.00,'2019-01-16 02:19:22','10wxg11jsabfnwt',2,1);

/*!40000 ALTER TABLE `product_attribute` ENABLE KEYS */;
UNLOCK TABLES;


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
	('asdfasdfasdfasd','Elf Commerce1','aabbcc','https://cdn.dribbble.com/users/1141152/screenshots/4450915/ecommerce-logo-1-dribbble.jpg','0000-00-00 00:00:00','10wxg11jsabfnwt',3,'en',3,'','',1);

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

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;

INSERT INTO `supplier` (`code`, `name`, `url`, `email`, `contact`, `address`, `logo`, `store_id`, `country_id`, `added_by`, `status`)
VALUES
	('daLe2JgJT','Razer (Asia Pacific) Pte. Ltd.','https://www.razer.com/sg-en','example@razer.com','6505 2188','514 Chai Chee Lane #07-05 469029 Singapore','https://cdn.joinhoney.com/images/lp/store-logos/razer-logo.png','asdfasdfasdfasd',3,'10wxg11jsabfnwt',1),
	('GJ-bjkoE4','T-Mobile US, Inc.','https://www.t-mobile.com','test@t-mobile.com','+1 505-998-3793','Bellevue, Washington, United States','https://www.t-mobile.com/content/dam/t-mobile/corporate/media-library/public/pictures/logos/T-Mobile%20logo%20single%20T%20magenta%20on%20white.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('HeZ51fHRt','asdfa','asdfa','asdfa','asdf','asfd dsf ads','','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('jwAjLePyr','OnePlus','https://www.oneplus.com','example@oneplus.com','+86 1231231123','Shenzhen, China','https://betanews.com/wp-content/uploads/2017/05/oneplus-logo-red.jpg','asdfasdfasdfasd',10,'10wxg11jsabfnwt',1),
	('Qw1DkfP_8','Nike','https://www.nike.com','example@nike.com','+123456789','Beaverton, Oregon, United States','https://i.ebayimg.com/images/g/5SIAAOSwJhdZiJYP/s-l300.jpg','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1),
	('XsTZ7E2fN','Under Armour','https://underarmour.tmall.com/view_shop.htm?spm=a220m.1000858.0.0.1d052c97x8ztrX&shop_id=108148339&r','example@underarmour.com','+1234567890','北京市海淀区复兴路69号北京卓展购物中心B1','https://darkfallproductions.tv/wp-content/uploads/2015/04/underarmour-1080x798.jpg','asdfasdfasdfasd',1,'10wxg11jsabfnwt',1);

/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;


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
  `role` tinyint(1) NOT NULL DEFAULT '2',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`code`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `name` (`name`),
  KEY `email` (`email`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`code`, `store_id`, `name`, `email`, `password`, `salt`, `joined_on`, `role`, `status`)
VALUES
	('10wxg11jsabfnwt','asdfasdfasdfasd','John Doe','test@test.com','4282e66f4b3970564cd3c4c2352ffe88','5qU3s6t97m6tNHjN1ESZCYarjHNWnKHh','2019-02-18 12:28:11',1,1),
	('2mpwk0a1jsfydkxn','asdfasdfasdfasd','hery','hery@gmail.com','16c67f5378f248f73699ee5a9ba9384f','r8ML4glfxgGe35a0Nsjx8bSZAFWlSmae','2019-02-22 11:09:16',1,1),
	

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
