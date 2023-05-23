const io = require("socket.io")(8900, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

let users = [];

const addUser = (userId, socketId)  => {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId})
}
const removeUser = (socketId) => {
    console.log(socketId)
    users = users.filter((user) => user.socketId !== socketId);
}
const removeit = (userId) => {
    users = users.filter((user) => user.userId !== userId);
}
const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on("connection", (socket) => {
    //when ceonnect
    //take userId and socketId from user
    //console.log("a user connected.");
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
        console.log("a user connected.");
        console.log(users)
    })

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text}) => {
        const user = getUser(receiverId);
        if(user==null){

        }
        else{
            console.log(users)
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        })
        }
        
    })

    socket.on("disconnect", () => { 
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })

    
    socket.on("disconnected", (id) => { 
        console.log("a user disconnected");
        removeit(id);
        console.log(users)
        io.emit("getUsers", users);
    })
})