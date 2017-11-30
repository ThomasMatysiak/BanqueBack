-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 30 Novembre 2017 à 14:48
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `banquedb`
--
CREATE DATABASE IF NOT EXISTS `banquedb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `banquedb`;

-- --------------------------------------------------------

--
-- Structure de la table `cartecredit`
--

DROP TABLE IF EXISTS `cartecredit`;
CREATE TABLE IF NOT EXISTS `cartecredit` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idUtilisateur` int(10) NOT NULL,
  `numero` int(20) NOT NULL,
  `crypto` int(3) NOT NULL,
  `expiration` varchar(10) NOT NULL,
  `libelle` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `depense`
--

DROP TABLE IF EXISTS `depense`;
CREATE TABLE IF NOT EXISTS `depense` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idEvenement` int(10) NOT NULL,
  `idPayeur` int(10) NOT NULL,
  `libelle` varchar(35) NOT NULL,
  `date` varchar(10) NOT NULL,
  `montantDepense` double DEFAULT NULL,
  `payeurInclus` tinyint(4) DEFAULT NULL,
  `participants` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `depense`
--

INSERT INTO `depense` (`id`, `idEvenement`, `idPayeur`, `libelle`, `date`, `montantDepense`, `payeurInclus`, `participants`) VALUES
(1, 15, 1, 'premiere depense', '20/11/2017', 50, 1, 'Gildasftw/1%Gildasftw2/2%Gildasftw3/3'),
(6, 18, 4, 'Course', '29/11/2017', 50, 1, 'Gildasftw/1'),
(3, 5, 1, 'deuxieme', '29/11/2017', 12, 1, 'Gildasftw2/2%Gildasftw3/3'),
(5, 5, 1, 'Course', '29/11/2017', 12.5, 1, 'Gildasftw3/3'),
(7, 20, 1, 'Fastfood', '30/11/2017', 30, 1, 'Gildasftw2/2%Gildasftw3/3'),
(8, 20, 2, 'Supermarché', '30/11/2017', 33, 1, 'Gildasftw/1%Gildasftw3/3'),
(9, 20, 3, 'Musée', '30/11/2017', 24, 1, 'Gildasftw/1%Gildasftw2/2');

-- --------------------------------------------------------

--
-- Structure de la table `evenement`
--

DROP TABLE IF EXISTS `evenement`;
CREATE TABLE IF NOT EXISTS `evenement` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idCreateur` int(10) NOT NULL,
  `titre` varchar(35) NOT NULL,
  `dateDebut` varchar(10) NOT NULL,
  `dateFin` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `evenement`
--

INSERT INTO `evenement` (`id`, `idCreateur`, `titre`, `dateDebut`, `dateFin`) VALUES
(1, 1, 'Evenement', '', ''),
(2, 1, 'Evenement', '', ''),
(3, 1, 'lastevent', '', ''),
(4, 1, 'theevent', '11/02/2017', '12/02/2017'),
(5, 1, 'Hello test', '11/12/2017', '13/12/2017'),
(6, 1, 'Hello test', '11/12/2017', '13/12/2017'),
(7, 1, 'Hello test', '11/12/2017', '13/12/2017'),
(8, 1, 'MyEvent', '11/12/2017', '12/12/2017'),
(9, 1, 'testagain', '12/12/2017', '12/12/2017'),
(10, 1, 'ahahahha', '12/12/2017', '12/12/2017'),
(11, 1, 'againtitle', '12/12/1212', '12/12/1212'),
(12, 1, 'uhuhuhu', '12/12/1212', '12/12/1212'),
(13, 1, 'sdhshdshd', '21/02/2017', '20/10/2017'),
(14, 1, 'againtestla', '12/12/1212', '12/12/1212'),
(15, 1, 'ceci est un test', '23/02/2017', '24/03/2017'),
(16, 1, 'MyEvent', '29/11/2017', '30/11/2017'),
(17, 1, 'Thetest', '29/11/2017', '30/11/2017'),
(18, 4, 'Vacances', '29/11/2017', '05/12/2017'),
(19, 1, 'Colloc', '20/09/2017', '30/05/2018'),
(20, 1, 'TestBalance', '30/11/2017', '21/02/2017');

-- --------------------------------------------------------

--
-- Structure de la table `historique_transaction`
--

DROP TABLE IF EXISTS `historique_transaction`;
CREATE TABLE IF NOT EXISTS `historique_transaction` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idpayeur` int(10) NOT NULL,
  `idreceveur` int(10) NOT NULL,
  `montant` double NOT NULL,
  `date` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

DROP TABLE IF EXISTS `invitation`;
CREATE TABLE IF NOT EXISTS `invitation` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idUtilisateur` int(10) NOT NULL,
  `idEvenement` int(10) NOT NULL,
  `nomHote` varchar(35) NOT NULL,
  `titreEvenement` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `membre_evenement`
--

DROP TABLE IF EXISTS `membre_evenement`;
CREATE TABLE IF NOT EXISTS `membre_evenement` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idEvenement` int(10) NOT NULL,
  `idUtilisateur` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `membre_evenement`
--

INSERT INTO `membre_evenement` (`id`, `idEvenement`, `idUtilisateur`) VALUES
(1, 5, 1),
(2, 6, 1),
(3, 7, 1),
(4, 8, 1),
(5, 9, 1),
(6, 10, 1),
(7, 11, 1),
(8, 12, 1),
(9, 13, 1),
(10, 14, 1),
(11, 15, 1),
(12, 5, 2),
(13, 5, 3),
(14, 6, 2),
(15, 10, 2),
(16, 10, 3),
(17, 11, 3),
(18, 16, 1),
(19, 16, 3),
(20, 17, 1),
(21, 17, 2),
(22, 18, 4),
(23, 19, 1),
(24, 19, 4),
(25, 18, 1),
(26, 18, 2),
(27, 20, 1),
(28, 20, 2),
(29, 20, 3);

-- --------------------------------------------------------

--
-- Structure de la table `participant_depense`
--

DROP TABLE IF EXISTS `participant_depense`;
CREATE TABLE IF NOT EXISTS `participant_depense` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idDepense` int(10) NOT NULL,
  `idParticipants` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `participant_depense`
--

INSERT INTO `participant_depense` (`id`, `idDepense`, `idParticipants`) VALUES
(1, 1, 1),
(2, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `iban` varchar(35) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `username`, `password`, `iban`) VALUES
(1, 'Gildasftw', 'azeazeaze', NULL),
(2, 'Gildasftw2', 'azeazeaze', NULL),
(3, 'Gildasftw3', 'azeazeaze', NULL),
(4, 'UserTest', 'azeazeaze', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
