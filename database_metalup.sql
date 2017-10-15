-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Feb 21, 2015 alle 12:20
-- Versione del server: 5.5.40-0ubuntu0.14.04.1
-- Versione PHP: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `metalup`
--
CREATE DATABASE IF NOT EXISTS `metalup` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `metalup`;

-- --------------------------------------------------------

--
-- Struttura della tabella `score`
-- * userId è la chiave esterna della tabella e fa riferimento alla tabella user.
-- * points è il punteggio ottenuto dall'utente.
-- * date è la data in cui il punteggio è stato ottenuto.
-- la chiave primaria è userid, points, date poichè vogliamo mantenere traccia di ogni punteggio ottenuto da ogni utente
-- in ogni data. nel caso si ottenesse il solito punteggio nello stesso giorno dallo stesso utente non ci interessa mantenere una copia
-- e quindi la query fallisce per duplicato. Per ovviare a questo, se volessimo mantenere ogni punteggio anche duplicato
-- basterebbe utilizzare il tipo DATE_TIME e salvarsi il timestamp corrente.
--

CREATE TABLE IF NOT EXISTS `score` (
  `userId` int(10) NOT NULL,
  `points` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`userId`,`points`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `score`
-- I punteggi sono completamente a caso, ottenuti giocando e non
--

INSERT INTO `score` (`userId`, `points`, `date`) VALUES
(15, 0, '2015-01-15'),
(15, 50, '2014-12-24'),
(15, 186, '2015-02-19'),
(15, 190, '2015-01-15'),
(15, 200, '2014-12-25'),
(15, 242, '2015-01-15'),
(15, 256, '2015-02-19'),
(15, 278, '2015-02-19'),
(15, 351, '2015-01-15'),
(15, 367, '2015-02-19'),
(15, 396, '2015-01-16'),
(15, 453, '2015-01-16'),
(15, 473, '2015-02-15'),
(15, 531, '2015-02-10'),
(15, 607, '2015-01-15'),
(15, 650, '2015-02-19'),
(15, 738, '2015-02-19'),
(15, 1168, '2015-02-16'),
(15, 1224, '2015-02-16'),
(15, 5358, '2015-02-21'),
(24, 100, '2014-12-22'),
(24, 1000, '2015-01-09'),
(26, 2000, '2015-01-16'),
(26, 5000, '2014-12-21'),
(35, 5771, '2015-02-07'),
(36, 557, '2015-02-08'),
(41, 3810, '2015-02-11'),
(42, 2268, '2015-02-11');

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
-- * userId è l'id univoco di un utente all'interno del sito. Non può essere NULL ed è stato scelto per semplicità AUTO_INCREMENT.
-- * username è il nome o soprannome di ogni giocatore, è limitato a 10 caratteri.
-- * email contiene l'email di ogni giocatore che viene utilizzata anche per effettuare il login
-- * password è la parola segreta utilizzata per accedere al proprio account, criptata in MD5, un buon compromesso tra sicurezza e semplicità.
-- * bio contiene una piccola biografia di ogni utente, che potrà essere utilizzata in futuro per una pagina utente ecc
-- * first_access è un booleano che indica il primo accesso o meno dopo un cambiamento di password
--

CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `bio` text,
  `first_access` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UC_EMAIL` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;


--
-- Dump dei dati per la tabella `user`
-- Gli utenti inseriti nella tabella sono completamente random
--

INSERT INTO `user` (`userId`, `username`, `email`, `password`, `bio`, `first_access`) VALUES
(15, 'Gabriele', 'gabriele_serra@hotmail.it', '5f4dcc3b5aa765d61d8327deb882cf99', 'Ok, sono un bravo ragazzo!', 0),
(24, 'Gabri', 'gabria@lol.it', '4124bc0a9335c27f086f24ba207a4912', 'Gabri Ara', 0),
(26, 'Edo', 'edo@lol.it', '3a288b748ead249e7eb1377e897aa761', 'Hei man!', 1),
(27, 'Babbo', 'babbo@lol.it', '3b2285b348e95774cb556cb36e583106', 'LLLLLL', 0),
(28, 'edoardo', 'edoardo@bimbominkia.it', 'c97b59dddd747bb9eb2b416d227f867c', '', 0),
(29, 'Gabri', 'aaa@lol.it', '9dfcefd24cd6bab7d870f1c75828e12b', '', 1),
(30, 'Nedoneeeee', 'nedo@lol.it', '118ae41862ccee88117fb21c67291f51', 'Spacco!', 0),
(31, 'Nedoooooo', 'mok@lol.it', '7815696ecbf1c96e6894b779456d330e', '', 0),
(32, 'edoardo', 'lollone@live.it', '5f4dcc3b5aa765d61d8327deb882cf99', '', 0),
(33, 'EdoardoB', 'lol@abc.it', '9cdfb439c7876e703e307864c9167a15', '', 0),
(34, 'Daniele', 'dani@lol.it', '38ce872c916dd47b3031665acb4bb015', 'LOL', 0),
(35, 'Daniele', 'dani@lollone.it', 'a029d0df84eb5549c641e04a9ef389e5', 'I''m nice', 0),
(36, 'Gavino', 'gavino@abc.it', '5f4dcc3b5aa765d61d8327deb882cf99', 'ABC', 0),
(37, 'Nedo', 'nedo@live.it', '900150983cd24fb0d6963f7d28e17f72', '', 0),
(38, 'Gabriele2', 'gabriele_serraa@hotmail.it', '5f4dcc3b5aa765d61d8327deb882cf99', 'LOL', 0),
(39, 'Marco', 'marco@yopmail.com', '37a6259cc0c1dae299a7866489dff0bd', 'Sono una '''''''''' prova apice singolo e doppio ""', 0),
(40, 'Pippo', 'pippo@yopmail.com', '5bb696c82aedce9e961781e457253a64', 'Varie prova SELECT * FROM', 1),
(41, 'Serenaaaaa', 'serena@hotmail.it', '5f4dcc3b5aa765d61d8327deb882cf99', 'Prova Tag ', 0),
(42, 'Checco', 'checco@live.it', '47bce5c74f589f4867dbd57e9ca9f808', '', 0),
(43, 'aa', 'gabriele_serra@hottttmail.it', '9cdfb439c7876e703e307864c9167a15', '', 0),
(44, 'ABC', 'gab@lollone.it', '5f4dcc3b5aa765d61d8327deb882cf99', '', 0),
(45, 'Marco Ross', 'lollone@yopmail.com', '900150983cd24fb0d6963f7d28e17f72', 'AAA', 0);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `FK_ID` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;