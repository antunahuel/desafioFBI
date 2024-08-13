CREATE TABLE users (
id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(125) NOT NULL UNIQUE,
	password VARCHAR(20) NOT NULL,
	profile_img VARCHAR(20) DEFAULT 'img_default.jpeg'
);

SELECT * FROM users order by id;

ALTER TABLE users ADD COLUMN admin BOOLEAN DEFAULT false;

UPDATE users SET profile_img = 'img_user3.jpg' WHERE id = 3;