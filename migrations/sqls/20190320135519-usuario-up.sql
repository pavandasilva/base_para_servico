CREATE TABLE `pessoas` (
  `pessoa_id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `aniversario` date NOT NULL,
  `ativo` varchar(1) DEFAULT 'S',
  `foto` varchar(255) DEFAULT NULL,
  `dt_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `e_admin` varchar(1) DEFAULT 'N',
  `celular` varchar(45) NOT NULL,
  PRIMARY KEY (`pessoa_id`),
  UNIQUE KEY `celular_UNIQUE` (`celular`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;