const express = require('express')
const PORT = 4000
const HOST = '0.0.0.0'

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

server.listen(PORT, HOST)
console.log(`App running on http://${HOST}:${PORT}`)

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})