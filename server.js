const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { getCurrentUser, userDisconnect, joinUser } = require("./dummyuser");



app.use(express());

const port = 8000;

app.use(cors());

let server = app.listen(
    port,
    console.log(
        `Server is running on port #: ${port}`.green
    )
)


const io = socket(server);

io.on("connection", (socket) => {
    socket.on("joinRoom", ({username, roomname }) => {
        const pUser = joinUser(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(pUser.room);


        socket.emit("message", {
            userId: pUser.id,
            username: pUser.username,
            text: `Welcome ${pUser.username}.`,
        });

        socket.broadcast.to(pUser.room).emit("message", {
            userId: pUser.id,
            username: pUser.username,
            text: `${pUser.username} has joined the chat.`,
        });


        socket.on("chat", (text) => {
            const pUser = getCurrentUser(socket.id);

            io.to(pUser.room).emit("message", {
                userId: pUser.id,
                username: pUser.username,
                text: text
            });
        });

        socket.on("disconnect", () => {
            const pUser = joinUser(socket.id, username, roomname);

            if (pUser) {
                io.to(pUser.room).emit("message", {
                    userId: pUser.id,
                    username: pUser.username,
                    text: `${pUser.username} has left the room`,
                })
            }
        })
    })
})