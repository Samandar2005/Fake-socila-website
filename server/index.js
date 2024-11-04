import { Server } from "socket.io";

const onlineUsers = [];

const addNewUser = (newUser) => {
  const existingUser = onlineUsers.find(
    (user) => user.userName === newUser.userName 
  );

  if(!existingUser) {
    onlineUsers.push({
       socketId: newUser.socketId, 
       userName: newUser.userName,
      });
  }
}

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("newUser", (payload) => {
    addNewUser({ socketId: socket.id, userName: payload.userName });

    console.log(onlineUsers);
  });
});

io.listen(3001);
