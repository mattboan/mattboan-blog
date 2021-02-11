CREATE USER 'mattboan-blog'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
GRANT ALL PRIVILEGES ON * . * TO 'mattboan-blog'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE blog_dev;

CREATE TABLE `Users` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL UNIQUE, 
	`password` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Projects` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(350) NOT NULL DEFAULT 'Unnamed Project',
	`image` TEXT,
	`description` TEXT FULLTEXT,
    `post` TEXT,
	`updated_ts` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `creation_ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Projects` ADD FULLTEXT(name, description);

CREATE TABLE `Tags` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`text` VARCHAR(100) NOT NULL UNIQUE,
	`color` VARCHAR(8) NOT NULL DEFAULT '#FFFFFF',
	PRIMARY KEY (`id`)
);

CREATE TABLE `ProjectsTags` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `project_id` INT unsigned NOT NULL,
    `tag_id` INT unsigned NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`project_id`) REFERENCES Projects(id) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES Tags(id) ON DELETE CASCADE,
    UNIQUE KEY `unique_key` (`project_id`,`tag_id`)
);