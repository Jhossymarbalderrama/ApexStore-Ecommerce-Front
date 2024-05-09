-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2024 a las 05:55:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-commerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delivery`
--

CREATE TABLE `delivery` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `delivery`
--

INSERT INTO `delivery` (`id`, `description`, `img`, `name`, `price`) VALUES
(1, '3 - 5 Días hábiles.', '../../../../../../assets/img/payment-form/corroeArg.webp', 'Correo Argentino', 2000),
(2, '2 - 4 Días.', '../../../../../../assets/img/payment-form/correoAndreani.webp', 'Correo Privado', 4500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `delivery_seq`
--

CREATE TABLE `delivery_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `delivery_seq`
--

INSERT INTO `delivery_seq` (`next_val`) VALUES
(101);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `cp` bigint(20) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id_user` bigint(20) DEFAULT NULL,
  `method` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `subtotal` double DEFAULT NULL,
  `total` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`id`, `address`, `cp`, `date`, `email`, `id_user`, `method`, `name`, `state`, `subtotal`, `total`) VALUES
(1, 'Combatientes de malvinas 1326', 1871, '26/03/2024 13:57:53', 'jhossymarbalderrama@gmail.com', 2, 1, 'jhossymar balderrama rocha', 4, 128977.5, 130977.5),
(2, 'Calle Falsa 123', 1844, '24/01/2024 16:26:40', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 1, 31777.5, 36277.5),
(3, 'Calle Falsa 123', 1844, '24/01/2024 16:29:30', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 2, 948680, 953180),
(4, 'Calle Falsa 123', 1844, '03/04/2024 16:16:13', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 4, 163200, 167700),
(5, 'Calle Falsa 123', 1844, '24/03/2024 16:30:30', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 0, 128977.5, 133477.5),
(6, 'Calle Falsa 123', 1844, '24/03/2024 16:50:30', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 0, 76762.5, 78762.5),
(52, 'Calle Falsa 123', 1844, '25/03/2024 13:50:15', 'josemaria@gmail.com', 3, 1, 'Jose Maria Ramos', 0, 303905, 308405),
(102, 'Combatientes de malvinas 1326', 1871, '27/03/2024 11:10:21', 'jhossymarbalderrama@gmail.com', 2, 1, 'jhossymar balderrama rocha', 4, 770000, 774500),
(152, 'Combatientes 1555', 1555, '10/04/2024 23:55:43', 'jhossymarbalderrama@gmail.com', 2, 1, 'jhossymar balderrama rocha', 4, 97200, 101700),
(202, 'Florida 4255', 1755, '06/05/2024 15:46:40', 'testQA@gmail.com', 259, 1, 'Tester QA', 4, 1281860, 1286360),
(252, 'Florida 4255', 1574, '06/05/2024 15:50:39', 'testQA@gmail.com', 259, 1, 'Tester QA', 4, 333180, 337680),
(302, 'Florida 4255', 1145, '06/05/2024 15:51:44', 'testQA@gmail.com', 259, 1, 'Test QA', 2, 333180, 337680),
(352, 'Florida 4255', 1941, '06/05/2024 15:58:11', 'testQA@gmail.com', 259, 1, 'Tester QA', 0, 1313760, 1315760);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_productos`
--

CREATE TABLE `facturas_productos` (
  `id` bigint(20) NOT NULL,
  `id_factura` bigint(20) DEFAULT NULL,
  `id_producto` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas_productos`
--

INSERT INTO `facturas_productos` (`id`, `id_factura`, `id_producto`) VALUES
(1, 1, 8),
(2, 1, 11),
(52, 2, 11),
(53, 3, 20),
(54, 3, 18),
(55, 4, 10),
(56, 5, 8),
(57, 5, 11),
(58, 6, 16),
(102, 52, 23),
(152, 102, 15),
(202, 152, 8),
(252, 202, 302),
(253, 202, 20),
(254, 202, 18),
(302, 252, 302),
(352, 302, 302),
(402, 352, 302),
(403, 352, 18),
(404, 352, 20),
(405, 352, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_productos_seq`
--

CREATE TABLE `facturas_productos_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturas_productos_seq`
--

INSERT INTO `facturas_productos_seq` (`next_val`) VALUES
(501);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_seq`
--

CREATE TABLE `factura_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_seq`
--

INSERT INTO `factura_seq` (`next_val`) VALUES
(451);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` bigint(20) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discharge_date` varchar(255) DEFAULT NULL,
  `discount` bigint(20) DEFAULT NULL,
  `img` mediumblob DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `stock` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `category`, `description`, `discharge_date`, `discount`, `img`, `name`, `price`, `state`, `stock`) VALUES
(8, 'Audiculares', 'Auriculares HyperX Cloud Flight Black Wireless', '2024-04-02', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a268747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3134353831315f312e6a70673f616c743d6d6564696126746f6b656e3d34323638333035332d643962352d346432302d393363662d6664663961316432333830337400a268747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3134353831315f332e6a70673f616c743d6d6564696126746f6b656e3d61323930613862362d306334312d346137362d396461662d3965653164323264653563307400a268747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3134353831315f322e6a70673f616c743d6d6564696126746f6b656e3d63373866613766302d303938382d346164662d626136372d343839346531363135646562, 'Auriculares HyperX Cloud Flight ', 108000, 'Nuevo', 198),
(10, 'Placa de Video', 'Placa de video RADEON RX 6400 4GB GIGABYTE EAGLE\n', '2024-01-27', 15, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135303334365f7278312e6a70673f616c743d6d6564696126746f6b656e3d39626337333631332d386564332d343838312d613761652d6532343738366130383837337400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135303334365f7278322e6a70673f616c743d6d6564696126746f6b656e3d32373564353838372d313939362d343337372d393234632d6436363832323365306130337400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135303334365f7278332e6a70673f616c743d6d6564696126746f6b656e3d65306163663639612d633136312d343361632d623034622d636233343130393335333433, 'RADEON RX 6400 4GB GIGABYTE EAGLE', 192000, 'Nuevo', 50),
(11, 'Teclado Mecanico', 'Teclado Mecanico Redragon Kumara K552-KR Rainbow Outemu RED ESP', '2024-01-10', 5, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135313531395f7264312e6a70673f616c743d6d6564696126746f6b656e3d61636364616366352d616262392d343163652d393264612d3163626364363863323636647400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135313531395f7264322e6a70673f616c743d6d6564696126746f6b656e3d36663538356237312d313266312d346331362d623039352d3831316465656362656131317400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135313531395f7264332e6a70673f616c743d6d6564696126746f6b656e3d64323831323565332d623332622d343966382d613933362d663837376431663939376261, 'Redragon Kumara K552-KR Rainbow Outemu RED ESP', 33450, 'Nuevo', 138),
(12, 'Teclado Mecanico', 'Teclado Mecanico Redragon Fizz Pro K616-RGB 60% White/Pink Wireless', '2024-02-18', 5, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135313732345f726477312e6a70673f616c743d6d6564696126746f6b656e3d36643463313832392d336366662d346364382d386335312d3965613966616638396138357400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135313732345f726477322e6a70673f616c743d6d6564696126746f6b656e3d37393062386235392d333739392d343737362d626233392d656264346564346134636533, 'Redragon Fizz Pro K616-RGB 60% White/Pink Wireless', 46600, 'Nuevo', 120),
(13, 'Procesador', 'Procesador AMD Ryzen 5 5600X 4.6GHz Turbo AM4 + Wraith Stealth Cooler', '2024-03-22', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323131335f7072312e6a70673f616c743d6d6564696126746f6b656e3d34383465356638622d633061622d346135662d393264332d6532623965373939643738347400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323131335f7072322e6a70673f616c743d6d6564696126746f6b656e3d63356465326533662d623238362d343334322d393139352d366331393266666262613133, 'AMD Ryzen 5 5600X 4.6GHz Turbo AM4', 255000, 'Nuevo', 100),
(14, 'Procesador', 'Procesador AMD Ryzen 7 5800X 4.7GHz Turbo AM4 - No incluye Cooler', '2024-03-05', 5, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323234325f707237322e6a70673f616c743d6d6564696126746f6b656e3d36396162306438302d373536622d343463352d386139662d3039373438323837333036617400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323234325f707237312e6a70673f616c743d6d6564696126746f6b656e3d31393635393432662d343033302d343163632d393664612d643465323961313731336638, 'AMD Ryzen 7 5800X 4.7GHz Turbo AM4', 360000, 'Nuevo', 60),
(15, 'Procesador', 'Procesador AMD Ryzen 9 5950X 4.9GHz Turbo AM4 - No incluye Cooler', '2024-03-17', 0, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323335375f707239312e6a70673f616c743d6d6564696126746f6b656e3d33613935373739662d366331312d346535332d383439642d3565363335633830303538657400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323335375f707239322e6a70673f616c743d6d6564696126746f6b656e3d61376532626363632d656336312d346138362d386565612d366631623635663231323362, 'AMD Ryzen 9 5950X 4.9GHz Turbo AM4 - No incluye Cooler', 770000, 'Nuevo', 20),
(16, 'Fuente', 'Fuente de poder Gigabyte 650W 80 Plus Bronze P650B', '2024-03-21', 25, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a368747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323533335f66332e6a70673f616c743d6d6564696126746f6b656e3d62613830326261612d636163302d346636362d613933372d6233336531633863613562337400a368747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323533335f66312e6a70673f616c743d6d6564696126746f6b656e3d66663032323462382d373733382d343635392d396464392d6131313431323136363661347400a368747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323533335f66322e6a70673f616c743d6d6564696126746f6b656e3d33343562616234662d613530362d343763612d393063312d353830326330336461376532, 'Fuente Gigabyte 650W 80 Plus Bronze P650B', 102350, 'Nuevo', 39),
(17, 'Procesador', 'Procesador Intel Core i5 10400F 4.3GHz Turbo 1200 Comet Lake', '2024-04-02', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000017400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323731335f706935312e6a70673f616c743d6d6564696126746f6b656e3d63353930363436652d653736372d343963332d613130382d356134613833376631383031, 'Intel Core i5 10400F 4.3GHz Turbo 1200 Comet Lake', 136900, 'Nuevo', 80),
(18, 'Procesador', 'Procesador Intel Core i7 12700 4.9GHz Turbo Socket 1700 Alder Lake', '2024-05-11', 5, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000017400a568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135323734355f706937312e6a70673f616c743d6d6564696126746f6b656e3d36346434383431322d623235322d343863662d616566622d343039383261393339636636, 'Intel Core i7 12700 4.9GHz Turbo Socket 1700 Alder Lake', 439900, 'Nuevo', 28),
(19, 'Motherboard', 'Mother ASUS TUF GAMING B550M-PLUS WIFI II AM4', '2024-05-13', 12, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333031345f6d62332e6a70673f616c743d6d6564696126746f6b656e3d64343338343866622d326333392d346165302d613532302d3833363730356262303337367400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333031345f6d62312e6a70673f616c743d6d6564696126746f6b656e3d62333134373763322d366330372d346238652d386535382d3832383966356337396461667400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333031345f6d62322e6a70673f616c743d6d6564696126746f6b656e3d31623631636431352d366261622d343861372d623261642d623733323462646431653938, 'Mother ASUS TUF GAMING B550M-PLUS WIFI II AM4', 240000, 'Nuevo', 50),
(20, 'Motherboard', 'ASUS ROG STRIX Z790-E GAMING WIFI Intel 12/13th Gen LGA1700 DDR5', '2024-06-20', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333230315f6d62342e6a70673f616c743d6d6564696126746f6b656e3d64323664386138392d323762372d343936612d626138642d6465306137653665343164327400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333230315f6d62352e6a70673f616c743d6d6564696126746f6b656e3d30616331303738362d333664352d346539642d386666622d3631623862353961666234397400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333230315f6d62362e6a70673f616c743d6d6564696126746f6b656e3d65373937616266372d613265612d343339622d623865342d336238353039656537636637, 'ASUS ROG STRIX Z790-E GAMING WIFI Intel 12/13th Gen LGA1700 DDR5', 589750, 'Nuevo', 38),
(21, 'Ram', 'Memoria Kingston DDR4 8GB 3200MHz Fury Beast CL16', '2024-06-08', 0, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333332335f7261322e6a70673f616c743d6d6564696126746f6b656e3d32316231626364352d313866332d346435362d613638352d3063353331646538623866657400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333332335f7261312e6a70673f616c743d6d6564696126746f6b656e3d35653933353565312d383963622d343737332d383866332d653837323338633166356461, 'Memoria Kingston DDR4 8GB 3200MHz Fury Beast CL16', 31900, 'Nuevo', 99),
(22, 'Ram', 'Memoria Team DDR5 64GB (2x32GB) 5600MHz T-Force Delta RGB CL36 White ', '2024-06-29', 0, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000017400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333432345f7261332e6a70673f616c743d6d6564696126746f6b656e3d66333831646536362d323265612d346465632d393230382d656262396135653265396539, 'Memoria Team DDR5 64GB (2x32GB) 5600MHz T-Force Delta RGB CL36 White ', 303699, 'Nuevo', 20),
(23, 'Gabinete', 'Corsair Crystal 680X RGB TG Smart Black', '2024-07-04', 5, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000037400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333534395f6762312e6a70673f616c743d6d6564696126746f6b656e3d34613931623933662d313964352d343862332d396439382d3734653363373661643432377400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333534395f6762322e6a70673f616c743d6d6564696126746f6b656e3d63653137326638642d343036662d343764642d386630612d3261396137303630313361667400a468747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303330345f3135333534395f6762332e6a70673f616c743d6d6564696126746f6b656e3d37653138623863312d383438662d346338662d386632312d613765306538396532326164, 'Corsair Crystal 680X RGB TG Smart Black', 319900, 'Nuevo', 24),
(302, 'Monitor', 'Monitor de Gaming ASUS VG278Q: 27\", FullHD, 1ms, 144Hz, Adaptive-Sync', '2024-05-06', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000017400d568747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303530365f3134333431355f6d6f6e69746f722d67616d65722d32372d617375732d7667323738712d313434687a2d316d732d6668642d68646d692d64702d302e6a70673f616c743d6d6564696126746f6b656e3d38643765323466322d336239622d343364332d613532652d653961313637303830656566, 'ASUS VG278Q 144HZ', 370200, 'Nuevo', 18),
(304, 'Placa de Video', 'VIDEO GEFORCE RTX 4090 24GB PNY GDDR6 TRIPLE FAN\n', '2024-05-06', 10, 0xaced0005757200135b4c6a6176612e6c616e672e537472696e673badd256e7e91d7b470200007870000000027400d368747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303530365f3135313331315f766964656f2d6765666f7263652d7274782d343039302d323467622d706e792d67646472362d747269706c652d66616e2d302e6a70673f616c743d6d6564696126746f6b656e3d33313035383765342d653132662d343764352d386564342d6530623861333864353465397400d368747470733a2f2f666972656261736573746f726167652e676f6f676c65617069732e636f6d2f76302f622f652d636f6d6d657263652d61633239312e61707073706f742e636f6d2f6f2f696d61676573253246696d675f32303234303530365f3135313331315f766964656f2d6765666f7263652d7274782d343039302d323467622d706e792d67646472362d747269706c652d66616e2d312e6a70673f616c743d6d6564696126746f6b656e3d33346333393962622d633736362d343965342d393239642d333130663839303830633466, 'GEFORCE RTX 4090', 3695510, 'Nuevo', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_seq`
--

CREATE TABLE `product_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `product_seq`
--

INSERT INTO `product_seq` (`next_val`) VALUES
(401);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `state` enum('ACTIVADO','DESHABILITADO') DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `password`, `role`, `state`, `username`, `img`) VALUES
(1, 'admin', 'admin', '$2a$10$YsGSpPxG2Ge1iq9eNFp3B.fMgnJ6GCnla0po5u8bEFE6Lu4..zs.y', 'ADMIN', 'ACTIVADO', 'root@gmail.com', NULL),
(2, 'Jhossy', 'Balderrama Rocha', '$2a$10$17KQzbnoLS833/5uvCqDWuPhEO6mvI8JnqaETXp9a.hUTm612hN/W', 'ADMIN', 'ACTIVADO', 'jhossy@gmail.com', 'https://firebasestorage.googleapis.com/v0/b/e-commerce-ac291.appspot.com/o/images%2Fprofiles%2Fimg_20240506_124411_profile.jpg?alt=media&token=60fab1c5-30bb-498f-a751-d92a7e0a5639'),
(3, 'jose', 'maria', '$2a$10$mRguIcxKDmmKxAciKATppeIhapfmJI7s9h9H763G6AqJqVML.D1TW', 'USER', 'ACTIVADO', 'josemaria@gmail.com', NULL),
(259, 'Tester', 'QA S.A', '$2a$10$GpOsHb8oYxxSb4tY767ptOBlKnTebAwh6PCI2RgkBmgCMU5SkmhXK', 'USER', 'ACTIVADO', 'testQA@gmail.com', 'https://firebasestorage.googleapis.com/v0/b/e-commerce-ac291.appspot.com/o/images%2Fprofiles%2Fimg_20240506_142205_profile-discord-1.jpg?alt=media&token=a7714795-b1c5-4ba5-b642-1db8f222290a'),
(302, 'Thaddeus', 'Fadel', '$2a$10$sFGaI8nzMS.ixKRurxuGSeCoj.umQuLp7QTruN1q.NHaWigDoPv/G', 'USER', 'ACTIVADO', 'Ernest_Will84@hotmail.com', NULL),
(303, 'Juwan', 'Kilback', '$2a$10$Cs0WRFsNHoG.46oklHBc4.MaAipxoYGTfICNh1dTaDkKj2KCSQuue', 'USER', 'ACTIVADO', 'Laisha33@hotmail.com', NULL),
(304, 'Wilburn', 'Kovacek', '$2a$10$pm.IacTnLRx.xLrKwWocyelsEPrbyo3obnkOzgAAl9zUXJdfDQ9Ia', 'USER', 'ACTIVADO', 'Palma_Walter@hotmail.com', NULL),
(305, 'Bettie', 'Keeling', '$2a$10$eAeVriNVg.s/7cCyIygDj.ip5D9RBeiiWInVlG0R3VrxQf78fUCKq', 'USER', 'ACTIVADO', 'Eloisa11@yahoo.com', NULL),
(306, 'Dewitt', 'Wuckert', '$2a$10$p4yOR9LzO4wArhsoVyX.HuX7a9S1BPpkNUbkAmYKDPOQkDq8xZ6.G', 'USER', 'ACTIVADO', 'Carmella91@hotmail.com', NULL),
(307, 'Elaina', 'Stracke DVM', '$2a$10$l5IAa3kqpdlD4PH4KM3Qt.okxiw1tRSBPhuNl/ker/uge5KqaAtLS', 'USER', 'ACTIVADO', 'Curt42@yahoo.com', NULL),
(308, 'Jarvis', 'Tremblay', '$2a$10$HzPbTS.6F.TRH40CNdkRnuHq.iDhfvZFc8FUzmtyaajSeIyzo2RMW', 'USER', 'ACTIVADO', 'Aileen.Russel@hotmail.com', NULL),
(309, 'Kyleigh', 'Osinski', '$2a$10$mU/EDxe5CGqakpigGUsIuOcqIC/3xQtsL3vlIK9K0j4UW24.5znS.', 'USER', 'ACTIVADO', 'June87@yahoo.com', NULL),
(310, 'Emory', 'Schultz', '$2a$10$ReLh2fbSUkNHPQXOmEYw3Or1fu0XrX4Mu.RkZrVGIanzDoXzun/yO', 'USER', 'ACTIVADO', 'Lydia_Labadie@gmail.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_seq`
--

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_seq`
--

INSERT INTO `user_seq` (`next_val`) VALUES
(351);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `facturas_productos`
--
ALTER TABLE `facturas_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
