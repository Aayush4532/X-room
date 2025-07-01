require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { customAlphabet, nanoid } = require('nanoid');
const HrMiddleware = require('./src/middleware/HrMiddleware');
const connectDb = require('./src/config/db');
const User = require('./src/models/userSchema');


const PORT = process.env.PORT || 8000;
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();
app.use(cors({
    origin: ORIGIN
    , credentials: true,
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: ORIGIN }
});



app.post('/checkUser', async (req, res) => {
    const { clerkId } = req.body;
    if (!clerkId) {
        return res.status(400).json({ error: 'Clerk ID is required' });
    }
    try {
        const user = await User.findOne({ clerkId });
        if (user) { 
            return res.status(200).json({ exists: true, user });
        }
        return res.status(200).json({ exists: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.post('/createSchedule',HrMiddleware, (req, res) => {
    const NanoId = customAlphabet('0123456789abcdef1234567890ghijklmnopqrstuvwxyz', 7);
    const roomId = NanoId();
    res.status(201).send({ roomId: roomId });
});


app.post('/signup', async (req, res) => {
    const { clerkId, email, role, age } = req.body;
    if (!clerkId || !email || !role || !age) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const user = new User({ clerkId, email, role, age });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});


const usersInRoom = (roomId) =>
    Array.from(io.sockets.adapter.rooms.get(roomId) || []);


io.on('connection', socket => {
    console.log('Socket connected:', socket.id);
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.emit('all-users', usersInRoom(roomId).filter(id => id !== socket.id));
        socket.to(roomId).emit('user-connected', socket.id);

        console.log(`👤 ${socket.id} joined ${roomId}`);
    });
    socket.on('send-offer', ({ targetId, offer }) =>
        io.to(targetId).emit('receive-offer', { from: socket.id, offer }));

    socket.on('send-answer', ({ targetId, answer }) =>
        io.to(targetId).emit('receive-answer', { from: socket.id, answer }));

    socket.on('send-ice', ({ targetId, candidate }) =>
        io.to(targetId).emit('receive-ice', { from: socket.id, candidate }));
    const cleanUp = () => {
        for (const roomId of socket.rooms) {
            if (roomId === socket.id) continue;
            socket.to(roomId).emit('user-disconnected', socket.id);
        }
    };

    socket.on('disconnecting', cleanUp);
    socket.on('leave-room', cleanUp);

    socket.on('disconnect', () => console.log(' Socket disconnected:', socket.id));
});



app.get('/', (_, res) => res.send('Signalling server running'));


connectDb().then(() => {
    server.listen(PORT, () => console.log(`Server listening on ${PORT}`));

}).catch((error) => {
    console.log("db connection failed");
    process.exit(1);
})