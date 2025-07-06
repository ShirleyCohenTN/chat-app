## Real-Time Chat App (Frontend Only)

A lightweight frontend-only real-time chat simulation built with React + TypeScript.\
Includes login/registration and logout, chat room selection + creation, and real-time message syncing across browser tabs using the BroadcastChannel API.\
(ESLint + Prettier setup)
## Getting started

1. clone the repo: https://github.com/ShirleyCohenTN/chat-app.git 
2. cd chat-app 
3. npm install 
4. npm start (will run on localhost 3005)
5. (open multiple tabs to simulate multi-user chat)
- for running prettier: npm run format
- for running eslint: npm run lint


## Screenshots of the project:

### AuthPage: (login mode)
![image](https://github.com/user-attachments/assets/cd870d28-124d-4bdd-aa76-2740414fde96)

### ChatRoomSelectionPage:
![image](https://github.com/user-attachments/assets/baa535a9-b64d-44ab-9155-7884887b08b6)

after creating a new room:\
![image](https://github.com/user-attachments/assets/f14769e0-e613-4a7c-bcb1-0a4e134a67b9)

entering the chat room:\
User - Shirley (first tab):
![image](https://github.com/user-attachments/assets/b2775aa7-98cb-455f-b1ed-a83ee1605ab7)

User - Moti (second tab):\
![image](https://github.com/user-attachments/assets/02a51355-2862-443e-a4f8-5caa356ca9fd)

you can leave the room, and then enter any other room or create a new one

## Answers to the Theoretical Questions

### Real-Time Communicatin:
If a backend were available, I would implement real-time messaging using WebSocket (with Socket.IO) . 
(I had 2 small personal projects where i tried to play with Socket.IO, a Video Chat app, and a collaborative Drawing App, but i haven’t used it in production at work)
Socket.IO would be a great fit for this chat app project because:
1. It supports real-time, full-duplex communication, allowing instant message delivery between users.
2. It includes built-in support for rooms and broadcasting, which makes it easy to implement separate chat rooms
- socket.join(room);
- io.to(room).emit("message", data);

On the frontend, I would use the Socket.IO client to emit and listen to message events.\
On the backend (Node.js + Express), I’d set up a Socket.IO server to manage connections, handle chat rooms, and relay messages between users.






