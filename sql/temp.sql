drop table if exists Temperatures;
CREATE TABLE Temperatures (
  `date` TIMESTAMP,
  `temperature_1` smallint,
  `temperature_2` smallint,
  `temperature_3` smallint,
  `temperature_4` smallint,
  `temperature_5` smallint
)ENGINE=innodb;
