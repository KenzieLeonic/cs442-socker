const express = require('express')
const PORT = 4000
const HOST = '0.0.0.0' //รายการของตัว code

const app = express() //สร้าง express
const http = require('http')
const server = http.createServer() //สร้าง server ส่ง app (express())
const { Server } = require('socket.io') //เรียก socket server
const io = new Server(server,{
    cors:{
        origin: ['http://localhost:3000']
    }
})
 // Server = class ของ io แล้วส่ง express ไป

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>') // send request
})

server.listen(PORT, HOST) //listen ที่ PORT และ HOST (localhost)
console.log(`App running on http://${HOST}:${PORT}`)

//SOCKET PART
// on the connection แล้วสร้าง socket ขึ้นมา
io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`)

    socket.on('hello.message', (data) => {
        console.log(`${socket.id} = ${data.sender_id}: ${data.message}`);
        socket.broadcast.emit('hello.reply',{
            sender_id: data.sender_id,
            message: data.message
        })
    })
    socket.on("rewards.create", (data) => {
        if (data.success) {
            socket.broadcast.emit('rewards.index', {
                refresh: true
            })
        }
    })
})