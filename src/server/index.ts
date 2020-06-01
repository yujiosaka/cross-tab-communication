import * as http from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';

const PORT = 8080;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));

io.on('connection', socket => {
  const ip = socket.handshake.address;
  console.log(`joined ${ip}`);
  socket.join(ip);

  socket.on('message', message => {
    io.to(ip).emit('message', message);
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
