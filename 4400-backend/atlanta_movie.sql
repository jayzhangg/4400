CREATE SCHEMA `AtlantaMovie`;
USE  `AtlantaMovie`;

/* Table Structure for User */ 
CREATE TABLE `user` (
  `user_name` varchar(45) NOT NULL,
  `user_status` enum('ALL','PENDING','DECLINED','APPROVED') DEFAULT NULL,
  `user_password` varchar(45) DEFAULT NULL,
  `user_firstname` varchar(45) DEFAULT NULL,
  `user_lastname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
);

/* Table Structure for Customer */
CREATE TABLE `customer` (
  `customer_name` varchar(45) NOT NULL,
  PRIMARY KEY (`customer_name`),
  CONSTRAINT `customer_name` FOREIGN KEY (`customer_name`) REFERENCES `user` (`user_name`)
);

/* Table Structure for CreditCard */
CREATE TABLE `creditcard` (
  `creditcard_num` char(16) NOT NULL,
  `creditcard_owner` varchar(45) NOT NULL,
  PRIMARY KEY (`creditcard_num`),
  KEY `creditcard_owner_idx` (`creditcard_owner`),
  CONSTRAINT `creditcard_owner` FOREIGN KEY (`creditcard_owner`) REFERENCES `customer` (`customer_name`)
);

/* Table Structure for Admin */
CREATE TABLE `admin` (
  `admin_name` varchar(45) NOT NULL,
  PRIMARY KEY (`admin_name`),
  CONSTRAINT `admin_name` FOREIGN KEY (`admin_name`) REFERENCES `user` (`user_name`)
);

/* Table Structure for Company */
CREATE TABLE `company` (
  `companyName` varchar(45) NOT NULL,
  PRIMARY KEY (`companyName`)
);

/* Table Structure for Manager */
CREATE TABLE `manager` (
  `manager_name` varchar(45) NOT NULL,
  `manager_street` varchar(45) DEFAULT NULL,
  `manager_city` varchar(45) DEFAULT NULL,
  `manager_zipcode` char(5) DEFAULT NULL,
  `manager_state` enum('AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 
  'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 
  'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 
  'VI', 'VT', 'WA', 'WI', 'WV', 'WY') DEFAULT 'WA',
  `manager_works_in` varchar(45) NOT NULL,
  PRIMARY KEY (`manager_name`),
  UNIQUE KEY `manager_address_UNIQUE` (`manager_street`,`manager_city`,`manager_zipcode`,`manager_state`),
  CONSTRAINT `manager_name` FOREIGN KEY (`manager_name`) REFERENCES `user` (`user_name`),
  CONSTRAINT `manager_works_in` FOREIGN KEY (`manager_works_in`) REFERENCES `company` (`companyName`)
);

/* Table Structure for Theater */
CREATE TABLE `theater` (
  `theater_owned_by` varchar(45) NOT NULL,
  `theater_name` varchar(45) NOT NULL,
  `theater_street` varchar(45) DEFAULT NULL,
  `theater_city` varchar(45) DEFAULT NULL,
  `theater_state` enum('AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 
  'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 
  'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 
  'VI', 'VT', 'WA', 'WI', 'WV', 'WY') DEFAULT 'WA',
  `theater_zipcode` char(5) DEFAULT NULL,
  `theater_capacity` int DEFAULT NULL,
  `theater_managed_by` varchar(45) NOT NULL,
  PRIMARY KEY (`theater_owned_by`,`theater_name`),
  UNIQUE KEY `theater_name_owned_by_UNIQUE` (`theater_name`,`theater_owned_by`),
  KEY `theater_managed_by_idx` (`theater_managed_by`),
  CONSTRAINT `theater_managed_by` FOREIGN KEY (`theater_managed_by`) REFERENCES `manager` (`manager_name`),
  CONSTRAINT `theater_owned_by` FOREIGN KEY (`theater_owned_by`) REFERENCES `company` (`companyName`)
);

/* Table Structure for Movie */
CREATE TABLE `movie` (
  `movie_name` varchar(45) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_duration` int DEFAULT NULL,
  PRIMARY KEY (`movie_name`,`movie_release_date`),
  UNIQUE KEY `movie_name_release_date_UNIQUE` (`movie_name`,`movie_release_date`),
  KEY `movie_release_date_idx` (`movie_release_date`)
); 

/* Table Structure for MoviePlay */
CREATE TABLE `movieplay` (
  `play_theater_name` varchar(45) NOT NULL,
  `play_movie_name` varchar(45) NOT NULL,
  `play_release_date` date NOT NULL,
  `play_date` date NOT NULL,
  `play_owning_company_name` varchar(45) NOT NULL,
  PRIMARY KEY (`play_theater_name`,`play_movie_name`,`play_release_date`,`play_date`,`play_owning_company_name`),
  UNIQUE KEY `play_tn_mn_rd_pd_ocn_UNIQUE` (`play_theater_name`,`play_movie_name`,`play_release_date`,`play_date`,`play_owning_company_name`),
  KEY `play_movie_name_idx` (`play_movie_name`),
  KEY `play_release_date_idx` (`play_release_date`),
  KEY `play_theater_name_idx` (`play_theater_name`,`play_owning_company_name`),
  KEY `play_owning_company_name_idx` (`play_owning_company_name`),
  CONSTRAINT `play_movie_name` FOREIGN KEY (`play_movie_name`) REFERENCES `movie` (`movie_name`),
  CONSTRAINT `play_owning_company_name` FOREIGN KEY (`play_owning_company_name`) REFERENCES `theater` (`theater_owned_by`),
  CONSTRAINT `play_release_date` FOREIGN KEY (`play_release_date`) REFERENCES `movie` (`movie_release_date`),
  CONSTRAINT `play_theater_name` FOREIGN KEY (`play_movie_name`) REFERENCES `theater` (`theater_name`)
);

/* Table Structure for CreditCardUsage */
CREATE TABLE `creditcardUsage` (
  `used_creditcard_num` char(16) NOT NULL,
  `used_owning_company_name` varchar(45) NOT NULL,
  `used_theater_name` varchar(45) NOT NULL,
  `used_movie_name` varchar(45) NOT NULL,
  `used_release_date` date NOT NULL,
  `used_play_date` date NOT NULL,
  PRIMARY KEY (`used_creditcard_num`,`used_owning_company_name`,`used_theater_name`,`used_movie_name`,`used_release_date`,`used_play_date`),
  KEY `used_owning_company_name_idx` (`used_owning_company_name`),
  KEY `used_theater_name_idx` (`used_theater_name`),
  KEY `used_movie_name_idx` (`used_movie_name`),
  KEY `used_release_date_idx` (`used_release_date`),
  KEY `used_play_date_idx` (`used_play_date`),
  CONSTRAINT `used_creditcard_num` FOREIGN KEY (`used_creditcard_num`) REFERENCES `creditcard` (`creditcard_num`),
  CONSTRAINT `used_movie_name` FOREIGN KEY (`used_movie_name`) REFERENCES `movieplay` (`play_movie_name`),
  CONSTRAINT `used_owning_company_name` FOREIGN KEY (`used_owning_company_name`) REFERENCES `movieplay` (`play_owning_company_name`),
  CONSTRAINT `used_play_date` FOREIGN KEY (`used_play_date`) REFERENCES `movieplay` (`play_release_date`),
  CONSTRAINT `used_release_date` FOREIGN KEY (`used_release_date`) REFERENCES `movieplay` (`play_release_date`),
  CONSTRAINT `used_theater_name` FOREIGN KEY (`used_theater_name`) REFERENCES `movieplay` (`play_theater_name`)
); 

/* Table Structure for VisitHistory */
CREATE TABLE `visit` (
  `visit_id` int NOT NULL AUTO_INCREMENT,
  `visit_date` date DEFAULT NULL,
  `visit_company` varchar(45) NOT NULL,
  `visit_theater` varchar(45) NOT NULL,
  `visit_username` varchar(45) NOT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `visit_username_idx` (`visit_username`),
  KEY `visit_theater_idx` (`visit_theater`),
  KEY `visit_company_idx` (`visit_company`),
  CONSTRAINT `visit_company` FOREIGN KEY (`visit_company`) REFERENCES `theater` (`theater_owned_by`),
  CONSTRAINT `visit_theater` FOREIGN KEY (`visit_theater`) REFERENCES `theater` (`theater_name`),
  CONSTRAINT `visit_username` FOREIGN KEY (`visit_username`) REFERENCES `user` (`user_name`)
);
