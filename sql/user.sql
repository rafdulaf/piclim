drop table if exists Users;
CREATE TABLE Users (
  `login` varchar(64) PRIMARY KEY NOT NULL,
  `password` varchar(128)  NOT NULL,
  `salt` varchar(64) NOT NULL,
  `fullname` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL
)ENGINE=innodb;
