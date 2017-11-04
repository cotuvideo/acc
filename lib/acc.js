'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	'postgres://akuzo:hoge@localhost/hoge',
	{ logging: false });
const Acc = sequelize.define('acc', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	ip: Sequelize.STRING,
	title: Sequelize.STRING,
	url: Sequelize.STRING,
	user_id: Sequelize.STRING,
	mail: Sequelize.STRING,
	password: Sequelize.STRING,
	description: Sequelize.TEXT
}, {
	freezeTableName: true,
	timestamps: true
});

Acc.sync();
module.exports = Acc;
