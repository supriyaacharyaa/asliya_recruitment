// import React, { useState, useEffect } from "react";
// import { MessageSquare, Send } from "lucide-react";
// import api from "../api/axios"; // adjust path if needed 

// export default function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false); 

//     useEffect(() => {           
//     const fetchMessages = async () => {

//         try {
//             const response = await api.get("/chat/messages"); // Adjust endpoint as needed
//             setMessages(response.data);
//         }


//         catch (error) {
//             console.error("Error fetching messages:", error);
//         }
//     };

//     fetchMessages();
// }, []);

//   const handleSend = async () => {
//     if (!input.trim()) return;  
//     setIsLoading(true);

//     try {




//         const response = await api.post("/chat/send", { message: input }); // Adjust endpoint as needed 

//         setMessages((prev) => [...prev, response.data]);
//         setInput("");
//     } catch (error) {
//         console.error("Error sending message:", error);
//     } finally {
//         setIsLoading(false);
//     }                       
//     };




//     return (    

//         <div className="flex flex-col h-full">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => (
//                     <div    
//                         key={index}
//                         className={`flex items-start space-x-3 ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
//                     >       
//                         <div
//                             className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === "admin" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"}`}
//                         >
//                             {msg.text}      
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="p-4 border-t">
//                 <div className="flex items-center space-x-3">
//                     <input
//                         type="text"
//                         className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"    
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 e.preventDefault();
//                                 handleSend();
//                             }
//                         }}
//                     />
//                     <button
//                         onClick={handleSend}
//                         className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                         disabled={isLoading}
//                     >
//                         <Send className="w-5 h-5" />
//                     </button>   
//                 </div>
//             </div>
//         </div>
//     );
// }