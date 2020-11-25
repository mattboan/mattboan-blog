CREATE USER 'mattboan-blog'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

CREATE DATABASE blog_dev;

CREATE TABLE `Projects` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(350) NOT NULL DEFAULT 'Unnamed Project',
	`image` TEXT,
	`description` TEXT,
	`updated_ts` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `creation_ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);