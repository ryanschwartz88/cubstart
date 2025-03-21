const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
	msg: { type: String },
	nickname: { type: String },
	timestamp: { type: Date },
});
const messageModel = mongoose.model("message", messageSchema);

const nicknameSchema = new Schema({
	nickname: { type: String },
	timestamp: { type: Date },
});
const nicknameModel = mongoose.model("nickname", nicknameSchema);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	socket.on("chat message", ({ msg, nickname }) => {
		const message = new messageModel({
			msg: msg,
			nickname: nickname,
			timestamp: new Date(),
		});
		message.save().then((m) => {
			io.emit("chat message", msg, nickname);
		});
	});

	socket.on("set nickname", (nickname) => {
		const nicknameEntry = new nicknameModel({
			nickname: nickname,
			timestamp: new Date(),
		});
		nicknameEntry.save().then((n) => {
			io.emit("set nickname", nickname);
		});
	});

	// get all messages from the database
	messageModel.find().then((messages) => {
    console.log('--------------------');
		console.log("messages: " + messages);
	});

	// get all nicknames from the database
	nicknameModel.find().then((nicknames) => {
		console.log("nicknames: " + nicknames);
	});
});

server.listen(3000, async () => {
	await mongoose.connect(
		"mongodb+srv://ryanschwartz:b2kRf3q45U3Bg3ei@cluster0.gt5my.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	);
	console.log("listening on *:3000");
});
