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