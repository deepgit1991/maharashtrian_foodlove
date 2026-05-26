-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2026 at 07:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `status`, `created_at`) VALUES
(1, 'Veg', 'Active', '2026-05-18 15:22:32'),
(2, 'nonveg', 'Active', '2026-05-18 15:22:47'),
(3, 'Starter', 'Active', '2026-05-18 15:22:52'),
(4, 'Biryani', 'Active', '2026-05-18 15:23:05'),
(5, 'sweet-dish', 'Active', '2026-05-18 15:23:18'),
(7, 'Juice-IceCream', 'Active', '2026-05-19 08:05:42');

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tag` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `name`, `price`, `category`, `tag`, `description`, `image`, `created_at`) VALUES
(1, 'Puran Poli', 120.00, 'sweet-dish', 'all', 'Traditional Maharashtrian sweet stuffed with jaggery and lentils.', '1779181152686-Puran-Poli-2-3.jpg', '2026-05-19 07:39:13'),
(2, 'Misal Pav', 80.00, 'Veg', 'Popular', 'Spicy Maharashtrian curry served with pav and farsan.', '1779181334354-Misal-Pav-Recipe.jpg', '2026-05-19 07:39:13'),
(3, 'Sabudana Vada', 60.00, 'Starter', 'all', 'Crispy fritters made from sabudana, peanuts, and potatoes.', '1779181359686-sabudana-wada.jpeg', '2026-05-19 07:39:13'),
(4, 'Chicken Kolhapuri', 220.00, 'nonveg', 'New Arrival', 'Spicy and flavorful Kolhapuri-style chicken curry.', '1779181417681-prawn-biryani.jpeg', '2026-05-19 07:39:13'),
(5, 'Mutton Rassa', 280.00, 'nonveg', 'New Arrival', 'Rich and spicy Maharashtrian mutton curry gravy.', '1779181486844-prawns-curry.jpg', '2026-05-19 07:39:13'),
(6, 'Bombil Fry', 180.00, 'nonveg', 'Best Selle', 'Crispy fried Bombay duck fish coated with spices.', '1779181511268-bombil-fry.jpeg', '2026-05-19 07:39:13'),
(7, 'Sole Kadhi', 60.00, 'Juice-IceCream', 'all', 'Refreshing kokum and coconut-based digestive drink.', '1779181527089-saolekadhi.jpeg', '2026-05-19 07:39:13'),
(8, 'Cold Drink', 40.00, 'Juice-IceCream', 'all', 'Chilled carbonated soft drink.', '1779181544129-refreshing-summer-drinks-with-ice-mint.jpg', '2026-05-19 07:39:13'),
(9, 'Ice Cream', 40.00, 'Juice-IceCream', 'all', 'Creamy frozen dessert available in multiple flavors.', '1779181569614-ice-creame.jpg', '2026-05-19 07:39:13'),
(10, 'Masala Papad', 25.00, 'Starter', 'all', 'Crispy papad topped with onions, tomatoes, and spices.', '1779181595819-Masala-papad.jpg', '2026-05-19 07:39:13'),
(11, 'Paneer Chilli', 60.00, 'Veg', 'all', 'Indo-Chinese spicy stir-fried paneer dish.', '1779181620973-paneer-chilli.jpeg', '2026-05-19 07:39:13'),
(12, 'Gulab Jamun', 60.00, 'sweet-dish', 'all', 'Soft milk-solid balls soaked in sugar syrup.', '1779181656988-gulab-jaam.jpeg', '2026-05-19 07:39:13'),
(13, 'Modak', 60.00, 'sweet-dish', 'all', 'Steamed sweet dumpling filled with coconut and jaggery.', '1779181678377-modak.jpeg', '2026-05-19 07:39:13'),
(14, 'Paneer Butter Masala', 150.00, 'Veg', 'Best Selle', 'Creamy tomato-based paneer curry rich in butter and spices.', '1779181723233-paneer-butter-masala.jpg', '2026-05-19 07:39:13'),
(15, 'Chole Masala', 150.00, 'Veg', 'New Arrival', 'Spiced chickpea curry served with roti or rice.', '1779181757358-Chole-Masala-Marathi-Recipe.jpg', '2026-05-19 07:39:13'),
(16, 'Dal Tadka', 150.00, 'Veg', 'Popular', 'Yellow lentils tempered with garlic and spices.', '1779181906534-Dal-Tadka-1-2.jpg', '2026-05-19 07:39:13'),
(17, 'Veg Kolhapuri', 150.00, 'Veg', 'New Arrival', 'Spicy mixed vegetable curry in Kolhapuri style.', '1779181880900-Veg-Kolhapuri-4.jpg', '2026-05-19 07:39:13'),
(18, 'Prawns Curry', 280.00, 'Non veg', 'Best Selle', 'Coastal-style spicy prawn curry cooked in coconut gravy.', '1779181859455-prawns-curry.jpg', '2026-05-19 07:39:13'),
(19, 'Chicken Biryani', 280.00, 'Biryani', 'Popular', 'Fragrant basmati rice cooked with spiced chicken.', '1779181783673-chicken-biryani.jpg', '2026-05-19 07:39:13'),
(20, 'Mutton Biryani', 280.00, 'Biryani', 'New Arrival', 'Slow-cooked mutton layered with aromatic rice.', '1779181816258-mutton-biryani.jpg', '2026-05-19 07:39:13'),
(21, 'Prawns Biryani', 280.00, 'Biryani', 'New Arrival', 'Flavorful biryani made with fresh prawns and spices.', '1779181931133-prawn-biryani.jpeg', '2026-05-19 07:39:13');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `dishes` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'deepika', 'deepika@gmail.com', '$2b$10$AB5OWfqeSG3BtukGJL.tl..wr6mXd.bCXBUlqEWV76BJM4WspPWMS', '2026-05-18 14:37:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
