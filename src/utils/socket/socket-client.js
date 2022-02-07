import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_SERVER_URL;

// autoconnect false until the user logs int then, we set the TODO socket.auth to userName and DONE connect with socket.connect , all this in chatpage : )
const socket = io(URL, { autoConnect: false });
// catch all listener ny event received by the client will be printed in the console.
socket.onAny((event, ...args) => {
	console.log(event, args);
});
export default socket;
