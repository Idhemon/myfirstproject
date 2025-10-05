-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--

--

-- --------------------------------------------------------

--
-- Structure de la table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `street` varchar(150) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `city` varchar(50) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `addresses`
--

INSERT INTO `addresses` (`id`, `number`, `street`, `zip_code`, `city`, `users_id`) VALUES
(2, '18', 'rue soeur', '10000', 'Loin', 4),
(4, '10', 'avenue lacroix', '25000', 'Besançon', 6),
(5, '117', 'rue de la chance', '12000', 'Lol', 14),
(6, '12', 'rue de la lavande', '12345', 'Jeannot', 15),
(7, '21', 'rue du terminal', '01001', 'Apocalypse', 16),
(8, '21', 'rue la sauvette', '21000', 'Dijon', 17),
(9, '12', 'rue de la soif', '12000', 'Quelque part', 18),
(10, '1', 'rue du président', '01000', 'Ain', 19),
(11, '1bis', 'rue de traverse', '12000', 'poudlard', 20),
(12, '1', 'rue', '12345', 'bob', 21),
(13, 'a', 'a', '12345', 'a', 22),
(14, '21', 'rue du chemin', '10000', 'poudlard', 23),
(15, 'a', 'a', '12345', 'a', 24),
(16, 'a', 'a', '12345', 'a', 25),
(17, 'r', 'A', '11111', 'a', 26),
(18, '23', 'rue', '12000', '555', 27),
(19, '12', 'fdd', '12345', 'fdsfd', 28);

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `email` varchar(90) NOT NULL,
  `object` varchar(20) NOT NULL,
  `messages` text NOT NULL,
  `receipt_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `nameEx` varchar(60) NOT NULL,
  `descriptionEx` text NOT NULL,
  `sets` int(11) NOT NULL,
  `repetitions` int(11) NOT NULL,
  `pictureEx` varchar(60) NOT NULL,
  `altEx` tinytext NOT NULL,
  `duration` varchar(30) NOT NULL,
  `programs_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `exercises`
--

INSERT INTO `exercises` (`id`, `nameEx`, `descriptionEx`, `sets`, `repetitions`, `pictureEx`, `altEx`, `duration`, `programs_id`) VALUES
(16, 'Développer couché', 'Allongé(e) sur le banc, tu te tiens droit, les omoplates serrés, avant de prendre la barre. Plus la position des mains sur la barre est espacée, plus tu cibleras les pectoraux et inversement pour les triceps', 3, 10, 'dieu-grec-bench-press.jpg', 'Dieu Grec faisant du développer couché allongé sur un banc', '2minutes', 21),
(17, 'Développer couché incliné', 'Assis(e) sur un banc incliné à 45°, tu te tiens droit, les omoplates serrés, avant de prendre la barre. Plus la position des mains sur la barre est espacée, plus tu cibleras le haut des pectoraux', 3, 10, 'dieu-grec-developper-incline.jpg', 'Dieu Grec entrain de faire du développer incliné sur un banc', '2minutes', 21),
(18, 'Développer militaire', 'Assis(e) sur un banc avec un dossier en angle droit, tu te tiens droit avec les haltères ou la barre à hauteur d\'épaules. Tu vas ensuite lever verticalement jusqu\'au dessus de ta tête et redescendre lentement', 3, 8, 'dieu-grec-developper-militaire.jpg', 'Dieu Grec entrain de faire du développer militaire sur un banc', '1minute30', 21),
(19, 'Tractions', 'Suspends-toi à la barre avec les bras tendus et les épaules relâchées. Tes pieds peuvent être croisés ou légèrement écartés. Tu vas ensuite tirer avec tes bras vers le haut en pliant le coude et en gardant les abdominaux contractés', 3, 10, 'dieu-grec-tractions.jpg', 'Dieu Grec entrain de faire des tractions à la barre', '1minute45', 21),
(20, 'Squats', 'En position debout, avec les pieds écartés à largeur d\'épaules et la barre posée sur ces mêmes épaules, tu vas te tenir droit, avec la poitrine ouverte. Tu vas ensuite descendre lentement en pliant tes genoux et en poussant les hanches derrière toi', 4, 8, 'dieu-grec-squats.jpg', 'Dieu Grec entrain de faire des squats avec une barre', '2minutes', 21),
(21, 'Fentes', 'Même position de départ que les squats, excepté qu\'à la place d\'avoir une barre sur les épaules, tu vas tenir des haltères le long de ton corps. Tu vas ensuite avancer une jambe devant toi tout en fléchissant le genou. Une fois en position basse, tu vas ramener ta jambe en poussant dans le talon avant et enchainer avec ton autre jambe', 4, 12, 'dieu-grec-fentes.jpg', 'Dieu Grec entrain de faire des fentes avec des haltères', '2minutes', 21),
(22, 'Abdos', 'Assis-toi sur le siège, le dos bien appuyé contre le dossier. tu vas ensuite contracter tes muscles abdominaux pour rapprocher ta poitrine de tes genoux. Le mouvement doit être lent et contrôlé.', 4, 15, 'dieu-grec-abdos-machine.jpg', 'Dieu Grec entrain de faire des abdos sur une machine', '1minute', 21),
(23, 'Pompes', 'Allonges-toi face contre terre, les mains posées à plat sur le sol, légèrement plus larges que la largeur des épaules. Puis tends tes bras pour soulever ton corps du sol, en gardant celui-ci droit comme une planche. Plies les coudes pour abaisser ton corps vers le sol, en gardant les coudes près du corps. Ta poitrine doit quasiment toucher le sol. Puis tu remontes en position haute. Il faudra faire au minimum 20 répétitions mais tu iras jusqu\'à l\'échec.', 4, 20, 'dieu-grec-pompes.jpg', 'Dieu Grec entrain de faire des pompes à l\'extérieur', '1minute', 22),
(24, 'Abdos sans matériel', 'Allonges-toi sur le dos, les genoux pliés et les pieds à plat sur le sol, à la largeur des hanches. Contractes tes muscles abdominaux pour soulever tes épaules et ta tête du sol, tout en gardant le menton légèrement rentré pour éviter de tirer sur le cou. Montes jusqu\'à toucher tes genoux et contrôles la descente.', 4, 25, 'dieu-grec-abdos-ext.jpg', 'Dieu Grec entrain de faire des abdos à l\'extérieur', '1minute30', 22),
(25, 'Tractions', 'Saisis la barre ou le support de ton choix avec tes mains (prise en pronation ou supination). Tires ton corps vers le haut en pliant les coudes et en rapprochant tes omoplates. Contrôles la descente.', 4, 10, 'dieu-grec-tractions.jpg', 'Dieu Grec faisant des tractions', '1minute30', 22),
(26, 'Squats', 'Tiens-toi debout, les pieds écartés à la largeur des épaules, les orteils légèrement tournés vers l\'extérieur. Gardes le dos droit puis plies les genoux et pousses les hanches vers l\'arrière, comme si tu voulais t\'asseoir. Tu peux placer tes bras le long du corps, les croiser sur ta poitrine ou les tendre devant toi pour plus d\'équilibre. Pousses avec tes talons pour revenir à la position de départ, en contractant tes fessiers et tes quadriceps.', 4, 20, 'dieu-grec-squats-ext.jpg', 'Dieu Grec faisant des squats dehors', '1minute', 22),
(27, 'Fentes', 'Tiens-toi debout, les pieds écartés à la largeur des hanches, le dos droit et regardes devant toi. Tu peux placer tes mains sur les hanches, les croiser ou les laisser pendre le long de ton corps. Avances une jambe tout en fléchissant le genou jusqu\'à ce qu\'il forme un angle de 90 degré et que celui arrière touche presque le sol. Tiens cette position 3 secondes avant de revenir à la position de départ en poussant dans le talon. Tu avanceras ensuite l\'autre jambe et vice versa.', 4, 20, 'dieu-grec-fentes-ext.jpg', 'Dieu Grec faisant des fentes dehors', '1minute', 22),
(28, 'Burpees', 'Tiens-toi debout, les pieds écartés à la largeur des hanches. Accroupis-toi en pliant les genoux et en posant tes mains à plat sur le sol devant toi, légèrement plus larges que la largeur des épaules. Sautes en arrière avec tes pieds pour te mettre en position de planche, en gardant ton corps droit. Effectues une pompe puis ramener les pieds et fais un saut vertical explosif en poussant dans les pieds. Répètes le mouvement.', 4, 15, 'dieu-grec-burpees-ext.jpg', 'Dieu Grec faisant des burpees dehors', '1minute30', 22),
(29, 'Pompes épaules', 'Commences en position de planche, les mains posées à plat sur le sol, légèrement plus larges que la largeur des épaules, et les pieds écartés à la largeur des hanches. En gardant les jambes tendues, soulèves tes hanches vers le plafond pour former un V inversé avec ton corps. Tes épaules doivent rester alignées avec tes poignets. Maintiens la position haute pendant 2 secondes puis abaisses lentement tes hanches pour revenir à la position de planche, en gardant le contrôle du mouvement.', 4, 12, 'dieu-grec-epaules-ext.jpg', 'Dieu Grec faisant des pompes épaules dehors', '1minute30', 22),
(41, 'Abaa', 'jdtdr', 10, 12, 'dieu-grec-abdos-ext.jpg', 'no pict', '1min30', 21);

-- --------------------------------------------------------

--
-- Structure de la table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `programs_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `orders_id`, `unit_price`, `programs_id`) VALUES
(1, 2, 150, 21),
(2, 11, 150, NULL),
(3, 12, 150, 21),
(4, 13, 150, 21),
(5, 14, 150, 21),
(6, 15, 150, 21),
(7, 16, 150, 21),
(8, 17, 150, 21),
(9, 18, 150, 21),
(10, 19, 150, 21),
(11, 20, 150, 21),
(12, 21, 150, 21),
(13, 22, 150, 21),
(14, 23, 150, 21),
(15, 24, 150, 21),
(16, 25, 150, 21),
(17, 26, 150, 21),
(18, 27, 150, 21),
(19, 28, 150, 21),
(20, 29, 150, 21),
(21, 30, 150, 21),
(22, 31, 150, 21),
(23, 32, 150, 21),
(24, 33, 150, 21),
(25, 34, 150, 21),
(26, 35, 150, 21),
(27, 36, 150, 21),
(28, 37, 150, 21),
(29, 38, 150, 21),
(30, 39, 150, 21),
(31, 40, 150, 21),
(32, 41, 100, 22),
(33, 42, 150, 21),
(34, 43, 150, 21),
(35, 44, 150, 21),
(36, 45, 150, 21),
(37, 46, 150, 21),
(38, 47, 150, 21),
(39, 48, 150, 21),
(40, 49, 150, 21),
(41, 50, 150, 21),
(42, 51, 150, 21),
(43, 52, 100, 22),
(44, 53, 150, 21),
(45, 53, 100, 22),
(46, 54, 150, 21),
(47, 55, 150, 21),
(48, 56, 150, 21),
(49, 57, 100, 22),
(50, 58, 100, 22),
(51, 59, 150, 21),
(52, 60, 150, 21),
(53, 61, 150, 21),
(54, 62, 150, 21),
(55, 63, 150, 21),
(56, 64, 150, 21),
(57, 65, 150, 21),
(58, 66, 150, 21),
(59, 67, 150, 21),
(60, 68, 150, 21),
(61, 69, 150, 21),
(62, 70, 150, 21),
(63, 71, 150, 21),
(64, 72, 150, 21),
(65, 73, 150, 21),
(66, 74, 150, 21),
(67, 75, 150, 21),
(68, 76, 150, 21),
(69, 77, 150, 21),
(70, 78, 150, 21),
(71, 79, 150, 21),
(72, 80, 150, 21),
(73, 81, 150, 21),
(74, 82, 150, 21),
(75, 83, 150, 21),
(76, 84, 150, 21),
(77, 85, 150, 21),
(78, 86, 150, 21),
(79, 87, 150, 21),
(80, 88, 150, 21),
(81, 89, 150, 21),
(82, 90, 150, 21),
(83, 91, 150, 21),
(84, 92, 150, 21),
(85, 93, 150, 21),
(86, 94, 150, 21),
(87, 95, 150, 21),
(88, 96, 150, 21),
(89, 97, 100, 22),
(90, 98, 150, 21),
(91, 99, 150, 21),
(92, 100, 150, 21),
(93, 101, 150, 21),
(94, 102, 150, 21),
(95, 103, 150, 21),
(96, 104, 150, 21),
(97, 105, 150, 21),
(98, 106, 150, 21),
(99, 107, 150, 21),
(100, 108, 150, 21),
(101, 109, 150, 21),
(102, 110, 150, 21),
(103, 111, 150, 21),
(104, 112, 150, 21),
(105, 113, 150, 21),
(106, 114, 150, 21),
(107, 115, 150, 21),
(108, 116, 150, 21),
(109, 117, 100, 22),
(110, 118, 150, 21),
(111, 119, 150, 21),
(112, 120, 150, 21),
(113, 121, 150, 21),
(114, 122, 150, 21),
(115, 123, 150, 21),
(116, 124, 150, 21),
(117, 125, 150, 21),
(118, 126, 150, 21),
(119, 127, 150, 21),
(120, 128, 100, 22),
(121, 129, 100, 22),
(122, 130, 100, 22),
(123, 131, 100, 22),
(124, 132, 100, 22),
(125, 133, 100, 22),
(126, 134, 100, 22),
(127, 135, 100, 22),
(128, 136, 100, 22),
(129, 137, 100, 22),
(130, 138, 100, 22),
(132, 140, 150, 21),
(133, 141, 150, 21),
(134, 142, 150, 21),
(135, 143, 150, 21),
(136, 144, 150, 21),
(137, 145, 150, 21),
(138, 146, 150, 21),
(139, 147, 150, 21),
(140, 148, 150, 21),
(141, 149, 100, 22),
(142, 150, 150, 21);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `users_id` int(11) DEFAULT NULL,
  `total_price` float NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('payé','non payé','annulé') NOT NULL DEFAULT 'non payé'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `users_id`, `total_price`, `created_at`, `status`) VALUES
(1, 16, 120, '2025-06-20 08:10:23', 'non payé'),
(2, 16, 150, '2025-06-20 08:46:22', 'payé'),
(3, 16, 150, '2025-06-20 08:46:25', 'non payé'),
(4, 16, 150, '2025-06-20 08:46:28', 'non payé'),
(5, 16, 150, '2025-06-20 08:48:03', 'non payé'),
(6, 16, 150, '2025-06-20 09:00:21', 'non payé'),
(7, 16, 150, '2025-06-23 13:17:54', 'non payé'),
(8, 16, 150, '2025-06-23 13:30:23', 'non payé'),
(9, 16, 150, '2025-06-23 13:37:26', 'non payé'),
(10, 16, 150, '2025-06-23 13:38:57', 'non payé'),
(11, 16, 150, '2025-06-23 13:48:49', 'non payé'),
(12, 16, 150, '2025-06-23 13:55:31', 'non payé'),
(13, 16, 150, '2025-06-23 13:57:49', 'non payé'),
(14, 16, 150, '2025-06-24 13:25:59', 'non payé'),
(15, 16, 150, '2025-06-24 13:40:57', 'non payé'),
(16, 16, 150, '2025-06-24 13:49:01', 'non payé'),
(17, 16, 150, '2025-06-24 13:52:22', 'non payé'),
(18, 16, 150, '2025-06-24 13:55:55', 'non payé'),
(19, 16, 150, '2025-06-24 13:56:09', 'non payé'),
(20, 16, 150, '2025-06-24 14:49:45', 'non payé'),
(21, 16, 150, '2025-06-24 15:01:48', 'non payé'),
(22, 16, 150, '2025-06-24 15:02:11', 'non payé'),
(23, 16, 150, '2025-06-24 15:03:13', 'non payé'),
(24, 16, 150, '2025-06-24 15:07:08', 'non payé'),
(25, 16, 150, '2025-06-24 15:07:52', 'non payé'),
(26, 16, 150, '2025-06-24 15:11:13', 'non payé'),
(27, 16, 150, '2025-06-24 15:21:56', 'non payé'),
(28, 16, 150, '2025-06-24 15:28:37', 'non payé'),
(29, 16, 150, '2025-06-24 15:41:01', 'non payé'),
(30, 16, 150, '2025-06-24 15:42:38', 'non payé'),
(31, 16, 150, '2025-06-24 15:49:01', 'non payé'),
(32, 16, 150, '2025-06-24 15:53:41', 'non payé'),
(33, 16, 150, '2025-06-24 16:01:52', 'non payé'),
(34, 16, 150, '2025-06-24 16:13:28', 'non payé'),
(35, 16, 150, '2025-06-25 12:47:12', 'non payé'),
(36, 16, 150, '2025-06-25 12:54:28', 'non payé'),
(37, 16, 150, '2025-06-25 13:03:42', 'non payé'),
(38, 16, 150, '2025-06-25 13:10:58', 'non payé'),
(39, 16, 150, '2025-06-25 13:16:31', 'non payé'),
(40, 16, 150, '2025-06-25 13:20:23', 'non payé'),
(41, 16, 100, '2025-06-25 13:25:28', 'non payé'),
(42, 16, 150, '2025-06-25 13:31:39', 'non payé'),
(43, 16, 150, '2025-06-25 13:38:31', 'payé'),
(44, 16, 150, '2025-06-25 13:43:18', 'payé'),
(45, 16, 150, '2025-06-25 14:45:09', 'payé'),
(46, 16, 150, '2025-06-25 14:53:52', 'payé'),
(47, 16, 150, '2025-06-25 14:55:02', 'payé'),
(48, 16, 150, '2025-06-25 15:16:30', 'payé'),
(49, 16, 150, '2025-06-25 15:30:49', 'payé'),
(50, 16, 150, '2025-06-25 15:34:02', 'payé'),
(51, 16, 150, '2025-06-26 13:12:31', 'payé'),
(52, 16, 100, '2025-06-26 13:22:30', 'payé'),
(53, 16, 250, '2025-06-26 13:23:44', 'payé'),
(54, 16, 150, '2025-06-26 13:24:59', 'payé'),
(55, 16, 150, '2025-06-26 13:32:14', 'payé'),
(56, 16, 150, '2025-06-26 13:34:25', 'payé'),
(57, 16, 100, '2025-06-26 13:50:22', 'payé'),
(58, 16, 100, '2025-06-26 13:52:23', 'non payé'),
(59, 16, 150, '2025-06-26 14:08:07', 'payé'),
(60, 16, 150, '2025-06-26 14:09:25', 'payé'),
(61, 16, 150, '2025-06-26 14:34:53', 'payé'),
(62, 16, 150, '2025-06-26 14:38:26', 'payé'),
(63, 16, 150, '2025-06-26 14:44:01', 'payé'),
(64, 16, 150, '2025-06-26 14:55:22', 'payé'),
(65, 16, 150, '2025-06-26 15:06:15', 'payé'),
(66, 16, 150, '2025-06-26 15:16:31', 'payé'),
(67, 16, 150, '2025-06-26 15:21:58', 'payé'),
(68, 16, 150, '2025-06-26 15:26:34', 'payé'),
(69, 16, 150, '2025-06-27 07:57:25', 'payé'),
(70, 15, 150, '2025-06-27 08:09:25', 'payé'),
(71, 15, 150, '2025-06-27 08:45:46', 'non payé'),
(72, 15, 150, '2025-06-27 08:46:33', 'non payé'),
(73, 16, 150, '2025-06-27 08:48:35', 'non payé'),
(74, 16, 150, '2025-06-27 08:50:43', 'payé'),
(75, 16, 150, '2025-06-27 08:55:31', 'payé'),
(76, 16, 150, '2025-06-27 09:01:04', 'payé'),
(77, 16, 150, '2025-06-27 09:06:52', 'payé'),
(78, 16, 150, '2025-06-27 09:14:49', 'payé'),
(79, 16, 150, '2025-06-27 09:38:41', 'payé'),
(80, 16, 150, '2025-06-27 09:46:29', 'payé'),
(81, 16, 150, '2025-06-27 09:51:46', 'payé'),
(82, 16, 150, '2025-06-27 09:55:55', 'non payé'),
(83, 16, 150, '2025-06-27 09:57:13', 'payé'),
(84, 16, 150, '2025-06-28 13:15:15', 'payé'),
(85, 16, 150, '2025-06-28 13:37:28', 'payé'),
(86, 16, 150, '2025-06-28 13:49:03', 'payé'),
(87, 16, 150, '2025-06-28 14:53:20', 'payé'),
(88, 16, 150, '2025-06-28 15:01:52', 'payé'),
(89, 16, 150, '2025-06-28 15:10:38', 'payé'),
(90, 16, 150, '2025-06-28 15:17:45', 'payé'),
(91, 16, 150, '2025-06-28 15:46:35', 'payé'),
(92, 16, 150, '2025-06-28 16:43:12', 'payé'),
(93, 16, 150, '2025-06-28 16:54:49', 'payé'),
(94, 15, 150, '2025-06-28 17:05:11', 'payé'),
(95, 15, 150, '2025-06-28 17:15:13', 'non payé'),
(96, 15, 150, '2025-06-28 17:18:42', 'non payé'),
(97, 16, 100, '2025-06-28 17:20:31', 'payé'),
(98, 16, 150, '2025-06-30 09:11:53', 'payé'),
(99, 16, 150, '2025-06-30 09:19:12', 'payé'),
(100, 16, 150, '2025-06-30 09:29:55', 'payé'),
(101, 16, 150, '2025-06-30 09:53:15', 'payé'),
(102, 16, 150, '2025-06-30 09:59:53', 'payé'),
(103, 16, 150, '2025-06-30 10:25:24', 'payé'),
(104, 16, 150, '2025-06-30 13:41:35', 'payé'),
(105, 16, 150, '2025-06-30 13:43:27', 'non payé'),
(106, 16, 150, '2025-06-30 13:54:42', 'payé'),
(107, 16, 150, '2025-06-30 13:59:09', 'payé'),
(108, 16, 150, '2025-06-30 14:06:27', 'payé'),
(109, 16, 150, '2025-06-30 14:23:15', 'payé'),
(110, 15, 150, '2025-06-30 16:31:00', 'non payé'),
(111, 15, 150, '2025-06-30 16:38:58', 'non payé'),
(112, 15, 150, '2025-06-30 17:57:44', 'non payé'),
(113, 16, 150, '2025-06-30 17:58:41', 'payé'),
(114, 16, 150, '2025-07-01 11:04:59', 'payé'),
(115, 16, 150, '2025-07-01 13:59:47', 'payé'),
(116, 16, 150, '2025-07-01 14:25:04', 'payé'),
(117, 16, 100, '2025-07-01 15:05:22', 'payé'),
(118, 16, 150, '2025-07-01 15:32:10', 'payé'),
(119, 16, 150, '2025-07-01 15:40:29', 'payé'),
(120, 16, 150, '2025-07-01 16:56:40', 'payé'),
(121, 16, 150, '2025-07-01 17:12:10', 'payé'),
(122, 16, 150, '2025-07-02 12:58:21', 'payé'),
(123, 16, 150, '2025-07-02 13:44:57', 'payé'),
(124, 16, 150, '2025-07-02 15:12:12', 'non payé'),
(125, 16, 150, '2025-07-02 15:14:50', 'payé'),
(126, 16, 150, '2025-07-02 15:23:59', 'payé'),
(127, 16, 150, '2025-07-02 18:07:28', 'payé'),
(128, 15, 100, '2025-07-03 12:12:48', 'non payé'),
(129, 15, 100, '2025-07-03 12:14:22', 'non payé'),
(130, 15, 100, '2025-07-03 12:38:18', 'non payé'),
(131, 15, 100, '2025-07-03 13:01:48', 'payé'),
(132, 15, 100, '2025-07-03 13:43:41', 'non payé'),
(133, 15, 100, '2025-07-03 14:08:32', 'non payé'),
(134, 15, 100, '2025-07-03 14:09:26', 'non payé'),
(135, 15, 100, '2025-07-03 14:10:54', 'non payé'),
(136, 15, 100, '2025-07-03 14:20:12', 'non payé'),
(137, 15, 100, '2025-07-03 14:22:40', 'non payé'),
(138, 15, 100, '2025-07-04 13:06:04', 'payé'),
(140, 15, 150, '2025-07-04 14:19:12', 'payé'),
(141, 19, 150, '2025-07-04 16:51:16', 'non payé'),
(142, 19, 150, '2025-07-06 18:58:40', 'non payé'),
(143, 19, 150, '2025-07-06 18:59:31', 'non payé'),
(144, 19, 150, '2025-07-06 19:07:09', 'non payé'),
(145, 19, 150, '2025-07-06 19:11:50', 'non payé'),
(146, 19, 150, '2025-07-07 19:00:42', 'payé'),
(147, 23, 150, '2025-07-10 08:56:56', 'non payé'),
(148, 23, 150, '2025-07-10 08:57:55', 'non payé'),
(149, 19, 100, '2025-08-27 14:15:26', 'payé'),
(150, 27, 150, '2025-08-28 14:09:01', 'payé');

-- --------------------------------------------------------

--
-- Structure de la table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `picture` varchar(30) NOT NULL,
  `alt` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `programs`
--

INSERT INTO `programs` (`id`, `name`, `description`, `price`, `picture`, `alt`) VALUES
(21, 'Programme à la salle/avec de l\'équipement', 'Deviens un véritable Greek God avec ce programme fait sur-mesure', 150, 'programme-salle.jpg', 'Dieu grec s\'entrainant à la salle'),
(22, 'Programme sans matériel', 'Vous voulez entamer une transformation physique sans matériel ? Ce programme est fait pour vous et vous permettra d\'atteindre vos objectifs! Vous allez changer et devenir un dieu Grec !', 100, 'programme-outside.jpg', 'Des dieux grecs s\'entrainant au poids du corps à l\'extérieur');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` char(60) NOT NULL,
  `roles` enum('user','coach','admin') NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_connection` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `phone`, `email`, `password`, `roles`, `created_at`, `last_connection`) VALUES
(4, 'Jean', 'Lang', '0606320210', 'gm@mail.com', '$2b$10$.3iAqt5baUrYtdx1fgh77utXilUgqdu.rvycqZTEFX3fHSK8dMXha', 'user', '2025-04-14 09:37:33', '2025-04-14 09:37:33'),
(6, 'John', 'Doe', '0706320225', 'gmk@mail.com', '$2b$10$yEN1.LxmeYnTcD24mmmjEek9OEOM13BDDum6/9MwRrh911F5FhDl6', 'admin', '2025-04-14 09:44:46', '2025-04-14 09:44:46'),
(8, 'Hannibal', 'Lecter', '0620202015', 'lecanibal@mail.com', '$2b$10$d.r.ieT.7E.SMCbJyBY7e.KfGnLO.5pWk1j0rg5Vx97ZuQbi87.n2', 'user', '2025-04-29 14:35:22', '2025-04-29 14:35:22'),
(9, 'Hannibal', 'Lecter', '0620202015', 'lecanibal@mail.com', '$2b$10$GN/sW8BRg6mc3Qf2u.vFJ.ytDsq1EqlgsY6RhXGMWYJHRp5cGyjpm', 'user', '2025-04-29 14:37:26', '2025-04-29 14:37:26'),
(10, 'Hannibal', 'Lecter', '0620202015', 'lecanibal@mail.com', '$2b$10$WfwgC6niL3vBZsDWoSnPdOQX6zA1xVBdtUa.BTtUDtqmZ8TLbDyem', 'user', '2025-04-29 14:39:07', '2025-04-29 14:39:07'),
(11, 'Lecter', 'Hannibal', '0606210202', 'lecanibal@mail.com', '$2b$10$jVaMaHHUO2PW8cl8sAOj/u9La4XghcIl1YBEqwOlogbzbpSXSnvmC', 'user', '2025-04-29 14:47:18', '2025-04-29 14:47:18'),
(12, 'Lecter', 'Hannibal', '0606210202', 'lecanibal@mail.com', '$2b$10$ONqSNcI8Sa7rHaAA9p/tJOS9iy8eKoqHKgMRGfr1O3Gnn75A4jY9.', 'user', '2025-04-29 14:48:41', '2025-04-29 14:48:41'),
(13, 'Jean', 'Dujardin', '0102030504', 'jean@dujardin.fr', '$2b$10$q7S32/y9JM6Dew8jiWxinu21v5RQIJ/mTbs/gwzjyedxcs2Hl2PCi', 'user', '2025-04-29 14:59:05', '2025-04-29 14:59:05'),
(14, 'Jean', 'Dujardin', '0102030504', 'jean@dujardin.fr', '$2b$10$3bgWrZvcuQdH6mreSbuRVe8jgN7uJl8JCmB7gDPjreXAQwuFCyUVK', 'user', '2025-04-29 15:06:21', '2025-04-29 15:06:21'),
(15, 'Allo', 'Aluile', '0124240103', 'Alllo@mail.com', '$2b$10$N2w1fBKD1cirR/T9GUDeb.4GhSmfEu/st8B0pJip9uHYthmAPLWui', 'user', '2025-04-29 15:08:37', '2025-04-29 15:08:37'),
(16, 'Sarah', 'Connor', '123456780', 'sarahconnor@mail.com', '$2b$10$uHcZJqW.u9BCDT1vTMpdA.d.e9RhgceHpQ7Y5Gi5aRFPTxrWf15OO', 'admin', '2025-05-05 09:34:34', '2025-05-05 09:34:34'),
(17, 'Jean', 'Ferdinand', '0601020304', 'jeanF@mail.com', '$2b$10$1J4cKuFaBEkzG3KraTLZ5.vOXDpd7CN9VURQ73THLz5O4Yku6IlJ6', 'user', '2025-05-06 08:38:21', '2025-05-06 08:38:21'),
(18, 'Jean', 'Michel', '0302010405', 'ddjdmm@mail.com', '$2b$10$2LCmCLUdCBPHq/UnBrge4uA7i4UYJI6mEbdnEJgKrLuM3UxnCp1Bm', 'user', '2025-05-12 13:05:08', '2025-05-12 13:05:08'),
(19, 'Léon', 'Bérard', '0102030405', 'leonberard@mail.com', '$2b$10$gqrYLq/bVI/38zMtJIGqhuX2fCY/zzyy.yq3GiqyR2wzMkEQ3kKmm', 'user', '2025-07-04 16:50:05', '2025-07-04 16:50:05'),
(20, 'Tom', 'Jedusor', '0101010101', 'voldemort@mail.com', '$2b$10$lGeARBaFM0uMrK0YNFSinOwiuxetMJGTQlcynRSOGWhyU7vyjcck2', 'user', '2025-07-10 07:29:11', '2025-07-10 07:29:11'),
(21, 'bob', 'bobby', '0123456789', 'bob@bobby.me', '$2b$10$JTM2OZyVDQFVliXkmEmlUuxi0k0tdlAD.IS0EL5dh0W9itU9cGzy.', 'user', '2025-07-10 08:44:05', '2025-07-10 08:44:05'),
(22, 'plip', 'plop', '0123456789', 'plop@plop.plop', '$2b$10$K8nTTeoouBW4.QzWQ4sm9uXkt4WMzXojiWOy8I8aGKI2U5bPQgqmS', 'user', '2025-07-10 08:44:37', '2025-07-10 08:44:37'),
(23, 'Harry', 'Potter', '0102030405', 'harry@mail.com', '$2b$10$bvSg9sJ2Sa3/Q/aJKd6UAe25vyWNFalEek4G3fIhhwEAMZYGPGp3a', 'user', '2025-07-10 08:54:49', '2025-07-10 08:54:49'),
(24, 'plip', 'plap', '0123456789', 'plop@plop.plop', '$2b$10$CQFKvbPSi9e9GIjyW0D8ie89L.BIHF2XzOv1mCFG6b91aVxHuc3YS', 'user', '2025-07-10 09:00:39', '2025-07-10 09:00:39'),
(25, 'plip', 'plap', '0123456789', 'toto@toto.fr', '$2b$10$6e4wN24F.f7/G.jPXgCJ4.0ngxgzJ7/VFpy0A1KDyMyGfS3aDQnyO', 'user', '2025-07-10 09:06:14', '2025-07-10 09:06:14'),
(26, 'r', 'r', '0123456789', 'rrrrr@r.rr', '$2b$10$YUygLaOeiT1fbUH1xL.hV.hL.VX3H17XkvZqjrjlL5zAH.bM/bvgC', 'user', '2025-08-28 13:51:26', '2025-08-28 13:51:26'),
(27, 'Jules', 'Verne', '0606060606', 'juju@mail.com', '$2b$10$kTElIWGpDkHqeG3IvFdVAOlJqI.4Z30FuWa8UiY0w0zdeA6qvjleS', 'user', '2025-08-28 13:59:12', '2025-08-28 13:59:12'),
(28, 'Cécile', 'Vilport', '0645124512', 'cecile@gmail.com', '$2b$10$JWNUo3EtmCKiXsqybBwcPOvtPtqcBLEa66XNgRlWG07rsLAX4B.YC', 'user', '2025-08-28 14:04:02', '2025-08-28 14:04:02');

-- --------------------------------------------------------

--
-- Structure de la table `user_programs`
--

CREATE TABLE `user_programs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `owned` enum('false','true') NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user_programs`
--

INSERT INTO `user_programs` (`id`, `user_id`, `program_id`, `owned`) VALUES
(1, 13, 21, 'true'),
(2, 16, 21, 'true'),
(3, 16, 22, 'true'),
(4, 11, 21, 'true'),
(6, 15, 22, 'true'),
(7, 16, 21, 'true'),
(8, 15, 21, 'true'),
(9, 19, 21, 'true'),
(10, 19, 22, 'true'),
(11, 27, 21, 'true');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_key` (`users_id`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exercises_ibfk_1` (`programs_id`);

--
-- Index pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_id` (`orders_id`),
  ADD KEY `programs_id` (`programs_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_key` (`users_id`);

--
-- Index pour la table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_programs`
--
ALTER TABLE `user_programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_key` (`user_id`),
  ADD KEY `program_key` (`program_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT pour la table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `user_programs`
--
ALTER TABLE `user_programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_key` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`programs_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`programs_id`) REFERENCES `programs` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_key` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `user_programs`
--
ALTER TABLE `user_programs`
  ADD CONSTRAINT `program_key` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`),
  ADD CONSTRAINT `user_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
