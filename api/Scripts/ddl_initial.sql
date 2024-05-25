CREATE DATABASE api;

use api;

CREATE TABLE Contacts (
	id uniqueidentifier DEFAULT newid() NOT NULL,
	first_name nvarchar(100),
	last_name nvarchar(100),
	email nvarchar(100),
	phone varchar(100),
	CONSTRAINT PK__Users__3214EC2758B25B51 PRIMARY KEY (id),
	CONSTRAINT UQ__Users__A9D10534BD77172E UNIQUE (email)
);

INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Jason', 'Zahn', 'smedge@gmail.com', '5126500383');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Alexis', 'Svehla', 'alexis@email.com', '5121234567');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Kyle', 'Zahn', 'kzahn@email.com', '5127654321');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Cathy', 'Zahn', 'czahn@email.com', '3187656903');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Bob', 'Zahn', 'bzahn@email.com', '3187654321');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Ross', 'Zahn', 'rzahn@email.com', '3187654321');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Heather', 'Zahn', 'hzahn@email.com', '3187654321');
INSERT INTO Contacts (first_name, last_name, email, phone) VALUES ('Richard', 'Hollier', 'rhollier@email.com', '3187654321');