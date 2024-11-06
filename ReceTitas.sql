-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-11-2024 a las 01:49:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ReceTitas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

CREATE TABLE `recetas` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `ingredients` varchar(900) NOT NULL,
  `preparation` varchar(9000) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `name`, `ingredients`, `preparation`, `user_id`) VALUES
(6, 'sfsf', 'fsfs', 'sffsf', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(9000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `password`) VALUES
(3, 'dago', '$2a$08$M6TuVKPcdMffxwim2u4L5OMzA.G7Tp3e.zypjROYRNJ3KVBGzqX9K'),
(4, 'redju', '$2a$08$4CLRqxl6Ou1tBesA1Vw2cOlynVxuTeixcEbr3aYrc02gNMT2h1c.a'),
(5, 'adrian', '$2a$08$gGiykdOO4cVVXeN2VXNExOtxqgu0vNntO0hJ3MKKG2M0/O5EvrqM2'),
(8, 'admin', '$2a$08$OdNFY4Nd/rohBeg/80qy4up29I0JXFcGps2s4rEiK7dzOLbgHt83C'),
(9, 'lachispa', '$2a$08$YgnCoUQdSaR2z7.aY7fv5.30UfXDD8hgNirB5HRPqQtnUtvL/1x.m'),
(10, 'fazio', '$2a$08$ja1AT1JB/SgEv4xmk7ztRONxMmPrrSGISt9KGdQ.RGCMjApQr6nOq'),
(11, 'rodri', '$2a$08$kT/RCrVStSH1aXlrkzwiQeO6ymFfKk2N6SwGNWxwKPVyuipG5z2E2'),
(12, 'mesa', '$2a$08$XpKtNCzvvn0yuQZCgWwPz.4hHnz5H7KZiQ7TyvEu./7gSEe/BobYS'),
(13, 'nike', '$2a$08$KG1UmxHKhnxb10a.lyi3/.GWb3cEFxA36UyIcq0/eCijIzEqdnvne'),
(14, 'silla', '$2a$08$oIIZ9imFSopO3paeG2Jgeet.qtNDWKrJq76J/Kn6MQl3c5CGSat72'),
(15, 'termo', '$2a$08$2FJ.4QjqupNQiV8vjA8mv.CjqhDqph5yZSZsrCWDUe0f565SRfgey'),
(16, 'nashe', '$2a$08$rt4zuTjwELDz30AhZfuaruZPax3tt/Meu7GZJkNVTfXcDp0LVk3gS'),
(17, 'nashe', '$2a$08$WK.6Mit/NnKeeDa/yo8vF.xy9xiKgAtP1E2b7yAnFHXTc.L9iu8oa'),
(18, 'hoja', '$2a$08$96P5HG3gG9NN2Y8zW3mfp.BpTlQhMu4KxxMcbvwDkamsCA/2M8PgW'),
(19, 'admin', '$2a$08$dsAESLfEsAXJjv4fQxhvlucSWQxv6Rbprg0qjiqeGt.S/cx0em8qG'),
(20, 'chicle', '$2a$08$KA8mKivDf0/xubDKwkZhj.CTmSehqlolT9vaZPaVmt87O89fhqO0q'),
(21, 'fazio', '$2a$08$RKdACi0GY.L3ZWGp6gWLvuFlDh76zyXBkESfVZ4ejtWq/o1hpBcjK');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `recetas`
--
ALTER TABLE `recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
