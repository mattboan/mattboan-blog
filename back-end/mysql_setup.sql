CREATE USER 'mattboan-blog'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
GRANT ALL PRIVILEGES ON * . * TO 'mattboan-blog'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE blog_dev;

CREATE TABLE `Projects` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(350) NOT NULL DEFAULT 'Unnamed Project',
	`image` TEXT,
	`description` TEXT,
    `post` TEXT,
	`updated_ts` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `creation_ts` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Projects` ADD FULLTEXT(name, description);

INSERT INTO Projects (name, image, description) VALUES (
    "Raspberry Pi Spy Car",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCaCObdap38GDLPqKFBihSkRpVWcZxpO9ew&usqp=CAU",
    "Built a little spy car using a raspberry pi 3 and various smaller modules..."
);

INSERT INTO Projects (name, image, description) VALUES (
    "MyPlants",
    "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "MyPlants is a React Native application that works in conjunction with an ESP32..."
);

INSERT INTO Projects (name, image, description) VALUES (
    "Galtron",
    "https://i.ytimg.com/vi/adBrMzfKTG8/maxresdefault.jpg",
    "Galaga Clone implemented using pygame."
);

INSERT INTO Projects (name, image, description) VALUES (
    "Javascript Basics",
    "https://miro.medium.com/max/3600/1*6ahbWjp_g9hqhaTDSJOL1Q.png",
    "Getting back to basics, working with JavaScript to grasp a deeper understanding,"
);

CREATE TABLE `Tags` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`text` VARCHAR(100) NOT NULL,
	`color` VARCHAR(8) NOT NULL DEFAULT '#FFFFFF',
	PRIMARY KEY (`id`)
);

INSERT INTO Tags (text, color) VALUES (
    "Python",
    "#306998"
), (
    "PyGame",
    "#6aee28"
), (
    "React Native",
    "#61dafb"
), (
    "ESP32",
    "#e7352c"
), (
    "Raspberry Pi",
    "#bd2b1e"
), (
    "C++",
    "#1b8ac2"
);

INSERT INTO Tags (text, color) VALUES (
    "JavaScript",
    "#f0db4f"
);
INSERT INTO ProjectsTags(project_id, tag_id) VALUES (4, 7);

CREATE TABLE `ProjectsTags` (
    `id` INT unsigned NOT NULL AUTO_INCREMENT,
    `project_id` INT unsigned NOT NULL,
    `tag_id` INT unsigned NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`project_id`) REFERENCES Projects(id) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES Tags(id) ON DELETE CASCADE
);

/* Note that the ids of the foreign keys will need to be different */
INSERT INTO ProjectsTags(project_id, tag_id) VALUES 
    (1, 5),
    (1, 6),
    (2, 3),
    (2, 4),
    (3, 1),
    (3, 2);


SELECT text, color FROM Tags WHERE id =
(SELECT tag_id FROM ProjectsTags WHERE project_id = 1);

SELECT Tags.text, Tags.color FROM Tags INNER JOIN ProjectsTags ON  ProjectsTags.tag_id = Tags.id WHERE ProjectsTags.project_id = 1;