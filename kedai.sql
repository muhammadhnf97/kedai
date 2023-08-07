-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 07, 2023 at 02:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kedai`
--

-- --------------------------------------------------------

--
-- Table structure for table `barang`
--

CREATE TABLE `barang` (
  `idBarang` varchar(10) NOT NULL,
  `namaBarang` varchar(30) NOT NULL,
  `stok` int(11) NOT NULL,
  `modalBeli` int(11) NOT NULL,
  `hargaJual` int(11) NOT NULL,
  `idSatuan` int(11) NOT NULL,
  `idKategori` int(11) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barang`
--

INSERT INTO `barang` (`idBarang`, `namaBarang`, `stok`, `modalBeli`, `hargaJual`, `idSatuan`, `idKategori`, `dateCreated`) VALUES
('9999001001', 'Coffemix', 20, 1200, 1500, 1, 1, '2023-08-04 10:57:10'),
('9999001002', 'Good Day Cappucino', 15, 1500, 2000, 1, 1, '2023-08-04 10:57:10'),
('9999001003', 'Luwak White Coffe', 25, 1300, 1500, 1, 1, '2023-08-04 10:57:10'),
('9999001004', 'Toracaffe Milk Latte', 3, 1100, 1500, 1, 1, '2023-08-04 10:57:10'),
('9999001005', 'asd', 123, 123, 123, 2, 1, '2023-08-07 07:52:35'),
('9999002001', 'Frutamin', 30, 800, 1000, 1, 2, '2023-08-04 10:57:10'),
('9999002002', 'Teh Gelas', 20, 900, 1000, 1, 2, '2023-08-04 10:57:10'),
('9999002003', 'Cocobit Leci', 30, 800, 1000, 1, 2, '2023-08-04 10:57:10'),
('9999002004', 'Cocobit Kelapa', 28, 800, 1000, 1, 2, '2023-08-04 10:57:10'),
('9999002005', 'Torpedo', 30, 900, 1000, 1, 2, '2023-08-04 10:57:10'),
('9999002006', 'Mountea', 15, 1000, 1500, 1, 2, '2023-08-04 10:57:10'),
('9999003001', 'Coca Cola', 6, 3200, 4000, 1, 3, '2023-08-04 10:57:10'),
('9999003002', 'Sprite', 7, 3100, 4000, 1, 3, '2023-08-04 10:57:10'),
('9999003003', 'Teh Pucuk', 12, 3500, 4000, 1, 3, '2023-08-04 10:57:10'),
('9999003004', 'Fanta', 10, 3500, 4000, 1, 3, '2023-08-05 08:27:58'),
('9999004001', 'Coca Cola', 10, 5000, 6000, 1, 4, '2023-08-04 10:57:10');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `idKategori` int(11) NOT NULL,
  `nmKategori` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`idKategori`, `nmKategori`) VALUES
(1, 'MINUMAN SACHET'),
(2, 'MINUMAN GELAS'),
(3, 'MINUMAN BOTOL'),
(4, 'MINUMAN KALENG');

-- --------------------------------------------------------

--
-- Table structure for table `pegawai`
--

CREATE TABLE `pegawai` (
  `idPegawai` char(7) NOT NULL,
  `nmPegawai` varchar(30) NOT NULL,
  `alamat` varchar(30) NOT NULL,
  `noTelp` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pegawai`
--

INSERT INTO `pegawai` (`idPegawai`, `nmPegawai`, `alamat`, `noTelp`) VALUES
('PEG-001', 'Bocchi', 'Jl. Dahlia', '082323232323'),
('PEG-002', 'Pegawai', 'Jl. Melati', '082323231313'),
('PEG-003', 'Pegawai 2', 'Jl. Mawar', '082364646464');

-- --------------------------------------------------------

--
-- Table structure for table `satuan`
--

CREATE TABLE `satuan` (
  `idSatuan` int(11) NOT NULL,
  `namaSatuan` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satuan`
--

INSERT INTO `satuan` (`idSatuan`, `namaSatuan`) VALUES
(1, 'pcs'),
(2, 'kg'),
(3, 'g'),
(4, 'ons'),
(5, 'dus'),
(6, 'liter');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `status` enum('administrator','pimpinan','pegawai','') NOT NULL,
  `idPegawai` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `username`, `password`, `status`, `idPegawai`) VALUES
(1, 'bocchi', 'bocchi', 'administrator', 'PEG-001'),
(2, 'boss', 'boss', 'pimpinan', 'PEG-002'),
(3, 'pegawai', 'pegawai', 'pegawai', 'PEG-003');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`idBarang`),
  ADD KEY `idSatuan` (`idSatuan`),
  ADD KEY `idKategori` (`idKategori`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`idKategori`);

--
-- Indexes for table `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`idPegawai`);

--
-- Indexes for table `satuan`
--
ALTER TABLE `satuan`
  ADD PRIMARY KEY (`idSatuan`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `idPegawai` (`idPegawai`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `barang`
--
ALTER TABLE `barang`
  ADD CONSTRAINT `barang_ibfk_2` FOREIGN KEY (`idSatuan`) REFERENCES `satuan` (`idSatuan`),
  ADD CONSTRAINT `barang_ibfk_3` FOREIGN KEY (`idKategori`) REFERENCES `kategori` (`idKategori`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idPegawai`) REFERENCES `pegawai` (`idPegawai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
