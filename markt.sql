/*
Navicat MySQL Data Transfer

Source Server         : e
Source Server Version : 50096
Source Host           : localhost:3306
Source Database       : markt

Target Server Type    : MYSQL
Target Server Version : 50096
File Encoding         : 65001

Date: 2018-10-18 11:14:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(255) NOT NULL auto_increment,
  `src` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', 'imgs/index/sjhd2.jpg', '盖乐世 Note9', '￥6999.00');
INSERT INTO `goods` VALUES ('2', 'imgs/index/sjhd3.jpg', '盖乐世 A9', '￥5999.00');
INSERT INTO `goods` VALUES ('3', 'imgs/index/sjhd4.jpg', '盖乐世 Note9 Star', '￥7999.00');
INSERT INTO `goods` VALUES ('4', 'imgs/index/sjhy2.jpg', 'ipad 5', '￥3999.00');
INSERT INTO `goods` VALUES ('5', 'imgs/index/sjhy3.jpg', '盖乐世 S8', '￥7999.00');
INSERT INTO `goods` VALUES ('6', 'imgs/index/sjhs1.jpg', '盖乐世 S7', '￥6999.00');
INSERT INTO `goods` VALUES ('7', 'imgs/index/sjhy4.jpg', '盖乐世 S6', '￥6999.00');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `number` varchar(50) NOT NULL,
  `id` int(255) NOT NULL auto_increment,
  `password` varchar(50) NOT NULL default '',
  `bz` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('15985183703', '1', '123456yu', null);
INSERT INTO `user` VALUES ('15885280772', '4', '123456yu', null);
