/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : big_data

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 08/07/2021 19:32:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chinatotal
-- ----------------------------
DROP TABLE IF EXISTS `chinatotal`;
CREATE TABLE `chinatotal`  (
  `id` int NOT NULL,
  `today_confirm` int NULL DEFAULT NULL,
  `today_suspect` int NULL DEFAULT NULL,
  `today_heal` int NULL DEFAULT NULL,
  `today_dead` int NULL DEFAULT NULL,
  `today_severe` int NULL DEFAULT NULL,
  `today_storeConfirm` int NULL DEFAULT NULL,
  `today_input` int NULL DEFAULT NULL,
  `total_suspect` int NULL DEFAULT NULL,
  `total_heal` int NULL DEFAULT NULL,
  `total_dead` int NULL DEFAULT NULL,
  `total_severe` int NULL DEFAULT NULL,
  `total_input` int NULL DEFAULT NULL,
  `extData_noSymptom` int NULL DEFAULT NULL,
  `extData_incrNoSymptom` int NULL DEFAULT NULL,
  `data` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chinatotal
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
