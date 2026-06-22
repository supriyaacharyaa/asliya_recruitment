// // backend/src/socket/socketServer.js
// // Complete Socket.io server implementation
// // Handles real-time communication between visitors, AI, and recruiters

// import Visitor from '../models/Visitor.js';
// import Conversation from '../models/Conversation.js';
// import Message from '../models/Message.js';
// import Recruiter from '../models/Recruiter.js';
// import { generateAIResponse } from '../services/aiService.js';

// /**
//  * Initialize Socket.io event handlers
//  * @param {Object} io - Socket.io instance
//  */
// export const initializeSocket = (io) => {
//   io.on('connection', (socket) => {
//     console.log(`🔌 Socket connected: ${socket.id}`);

//     // ─────────────────────────────────────────────
//     // VISITOR JOIN
//     // ─────────────────────────────────────────────
//     socket.on('visitor_join', async ({ visitorId, conversationId }) => {
//       try {
//         await Visitor.findByIdAndUpdate(visitorId, {
//           socketId: socket.id,
//           isOnline: true,
//           lastSeen: new Date(),
//         });

//         socket.join(`conversation_${conversationId}`);
//         socket.visitorId = visitorId;
//         socket.conversationId = conversationId;
//         socket.role = 'visitor';

//         io.to('admin_room').emit('visitor_online', {
//           visitorId,
//           conversationId,
//           socketId: socket.id,
//         });
//       } catch (error) {
//         console.error('visitor_join error:', error.message);
//         socket.emit('error', { message: 'Failed to join conversation' });
//       }
//     });

//     // ─────────────────────────────────────────────
//     // VISITOR MESSAGE
//     // ─────────────────────────────────────────────
//     socket.on('visitor_message', async ({ conversationId, visitorId, message }) => {
//       try {
//         const visitorMsg = await Message.create({
//           conversationId,
//           senderType: 'visitor',
//           senderId: visitorId,
//           message: message.trim(),
//         });

//         await Conversation.findByIdAndUpdate(conversationId, {
//           lastMessage: message.trim(),
//           lastMessageAt: new Date(),
//           $inc: { unreadCount: 1 },
//         });

//         // To the visitor (and anyone else already in this conversation room)
//         io.to(`conversation_${conversationId}`).emit('new_message', {
//           ...visitorMsg.toObject(),
//           isNew: true,
//         });

//         // Renamed from `new_visitor_message` -> `visitor_message_to_admin`,
//         // flattened so `data.message` is the text string the dashboard expects.
//         io.to('admin_room').emit('visitor_message_to_admin', {
//           conversationId,
//           _id: visitorMsg._id,
//           message: visitorMsg.message,
//           createdAt: visitorMsg.createdAt,
//         });

//         // AI RESPONSE FLOW
//         const conversation = await Conversation.findById(conversationId);

//         if (conversation?.status === 'AI') {
//           io.to(`conversation_${conversationId}`).emit('ai_typing', {
//             conversationId,
//             isTyping: true,
//           });

//           const recentMessages = await Message.find({ conversationId })
//             .sort({ createdAt: -1 })
//             .limit(10)
//             .lean();

//           const history = recentMessages.reverse();

//           const delay = Math.min(1000 + message.length * 30, 3000);

//           setTimeout(async () => {
//             try {
//               const aiText = await generateAIResponse(history);

//               const aiMsg = await Message.create({
//                 conversationId,
//                 senderType: 'ai',
//                 senderId: null,
//                 message: aiText,
//               });

//               await Conversation.findByIdAndUpdate(conversationId, {
//                 lastMessage: aiText,
//                 lastMessageAt: new Date(),
//               });

//               io.to(`conversation_${conversationId}`).emit('ai_typing', {
//                 conversationId,
//                 isTyping: false,
//               });

//               io.to(`conversation_${conversationId}`).emit('new_message', {
//                 ...aiMsg.toObject(),
//                 isNew: true,
//               });

//               // Renamed from `new_ai_message` -> `ai_response_to_admin`, flattened.
//               io.to('admin_room').emit('ai_response_to_admin', {
//                 conversationId,
//                 _id: aiMsg._id,
//                 message: aiMsg.message,
//                 createdAt: aiMsg.createdAt,
//               });
//             } catch (err) {
//               console.error('AI error:', err.message);

//               io.to(`conversation_${conversationId}`).emit('ai_typing', {
//                 conversationId,
//                 isTyping: false,
//               });
//             }
//           }, delay);
//         }
//       } catch (error) {
//         console.error('visitor_message error:', error.message);
//         socket.emit('error', { message: 'Failed to send message' });
//       }
//     });

//     // ─────────────────────────────────────────────
//     // RECRUITER JOIN ADMIN
//     // ─────────────────────────────────────────────
//     // Renamed from `recruiter_join_admin` -> `recruiter_connect` to match
//     // what Chat/index.jsx actually emits on mount. This was the root cause —
//     // the admin socket was never joining `admin_room`, so every broadcast
//     // above was going to an empty room.
//     socket.on('recruiter_connect', async ({ recruiterId }) => {
//       try {
//         await Recruiter.findByIdAndUpdate(recruiterId, {
//           socketId: socket.id,
//           isOnline: true,
//           lastSeen: new Date(),
//         });

//         socket.join('admin_room');
//         socket.role = 'recruiter';
//         socket.recruiterId = recruiterId;

//         console.log(`👔 Recruiter ${recruiterId} joined admin room`);

//         socket.emit('admin_joined', { message: 'Connected to admin room' });
//       } catch (error) {
//         console.error('recruiter_connect error:', error.message);
//       }
//     });

//     // ─────────────────────────────────────────────
//     // RECRUITER JOIN CONVERSATION
//     // ─────────────────────────────────────────────
//     socket.on('recruiter_join_conversation', async ({ recruiterId, conversationId }) => {
//       try {
//         const recruiter = await Recruiter.findById(recruiterId);
//         if (!recruiter) return;

//         await Conversation.findByIdAndUpdate(conversationId, {
//           status: 'HUMAN',
//           assignedRecruiter: recruiterId,
//           recruiterJoinedAt: new Date(),
//           unreadCount: 0,
//         });

//         socket.join(`conversation_${conversationId}`);

//         const systemMsg = await Message.create({
//           conversationId,
//           senderType: 'system',
//           message: `${recruiter.name} has joined the conversation.`,
//         });

//         io.to(`conversation_${conversationId}`).emit('recruiter_joined', {
//           recruiter,
//           recruiterName: recruiter.name,
//           systemMessage: systemMsg.toObject(),
//         });

//         // Renamed from `conversation_assigned` -> `conversation_status_update`
//         // with `{ conversationId, status }` to match the dashboard's listener.
//         io.to('admin_room').emit('conversation_status_update', {
//           conversationId,
//           status: 'HUMAN',
//           recruiterId,
//           recruiterName: recruiter.name,
//         });
//       } catch (error) {
//         console.error('recruiter_join_conversation error:', error.message);
//       }
//     });

//     // ─────────────────────────────────────────────
//     // RECRUITER MESSAGE
//     // ─────────────────────────────────────────────
//     socket.on('recruiter_message', async ({ conversationId, recruiterId, message }) => {
//       try {
//         const recruiter = await Recruiter.findById(recruiterId);
//         if (!recruiter) return;

//         const msg = await Message.create({
//           conversationId,
//           senderType: 'recruiter',
//           senderId: recruiterId,
//           message: message.trim(),
//         });

//         await Conversation.findByIdAndUpdate(conversationId, {
//           lastMessage: message.trim(),
//           lastMessageAt: new Date(),
//         });

//         io.to(`conversation_${conversationId}`).emit('new_message', {
//           ...msg.toObject(),
//           recruiterName: recruiter.name,
//         });
//       } catch (error) {
//         console.error('recruiter_message error:', error.message);
//       }
//     });

//     // ─────────────────────────────────────────────
//     // CLOSE CONVERSATION (socket path)
//     // ─────────────────────────────────────────────
//     socket.on('close_conversation', async ({ conversationId }) => {
//       try {
//         await Conversation.findByIdAndUpdate(conversationId, {
//           status: 'CLOSED',
//           closedAt: new Date(),
//         });

//         const systemMsg = await Message.create({
//           conversationId,
//           senderType: 'system',
//           message: 'This conversation has been closed. Thank you for contacting Asliya Recruitment!',
//         });

//         // To the visitor — ChatContext listens for this exact name, unchanged.
//         io.to(`conversation_${conversationId}`).emit('conversation_closed', {
//           conversationId,
//           systemMessage: systemMsg.toObject(),
//         });

//         // Dashboard listens for `conversation_status_update`, not `conversation_closed`.
//         io.to('admin_room').emit('conversation_status_update', {
//           conversationId,
//           status: 'CLOSED',
//         });
//       } catch (error) {
//         console.error('close_conversation error:', error.message);
//       }
//     });

//     // ─────────────────────────────────────────────
//     // TYPING
//     // ─────────────────────────────────────────────
//     // ChatContext.jsx listens for `recruiter_typing` / `recruiter_stop_typing`
//     // specifically, so we emit those directly when the sender is a recruiter.
//     socket.on('typing', ({ conversationId, senderType }) => {
//       if (senderType === 'recruiter') {
//         socket.to(`conversation_${conversationId}`).emit('recruiter_typing');
//       } else {
//         socket.to(`conversation_${conversationId}`).emit('typing', { senderType, isTyping: true });
//       }
//     });

//     socket.on('stop_typing', ({ conversationId, senderType }) => {
//       if (senderType === 'recruiter') {
//         socket.to(`conversation_${conversationId}`).emit('recruiter_stop_typing');
//       } else {
//         socket.to(`conversation_${conversationId}`).emit('typing', { senderType, isTyping: false });
//       }
//     });

//     // ─────────────────────────────────────────────
//     // DISCONNECT
//     // ─────────────────────────────────────────────
//     socket.on('disconnect', async () => {
//       console.log(`🔌 Disconnected: ${socket.id}`);

//       try {
//         if (socket.visitorId) {
//           await Visitor.findByIdAndUpdate(socket.visitorId, {
//             isOnline: false,
//             lastSeen: new Date(),
//           });

//           io.to('admin_room').emit('visitor_offline', {
//             visitorId: socket.visitorId,
//             conversationId: socket.conversationId,
//           });
//         }

//         if (socket.recruiterId) {
//           await Recruiter.findByIdAndUpdate(socket.recruiterId, {
//             isOnline: false,
//             lastSeen: new Date(),
//           });
//         }
//       } catch (err) {
//         console.error('disconnect error:', err.message);
//       }
//     });
//   });
// };

// backend/src/socket/socketServer.js

// backend/src/socket/socketServer.js

import Visitor from '../models/Visitor.js';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Recruiter from '../models/Recruiter.js';
import Admin from '../models/Adminuser.js';
import { generateAIResponse } from '../services/aiService.js';

export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // ── VISITOR JOIN ──────────────────────────────────────────────────────────
    socket.on('visitor_join', async ({ visitorId, conversationId }) => {
      try {
        await Visitor.findByIdAndUpdate(visitorId, {
          socketId: socket.id, isOnline: true, lastSeen: new Date(),
        });
        socket.join(`conversation_${conversationId}`);
        socket.visitorId      = visitorId;
        socket.conversationId = conversationId;
        socket.role           = 'visitor';
        io.to('admin_room').emit('visitor_online', { visitorId, conversationId, socketId: socket.id });
      } catch (error) {
        console.error('visitor_join error:', error.message);
        socket.emit('error', { message: 'Failed to join conversation' });
      }
    });

    // ── VISITOR MESSAGE ───────────────────────────────────────────────────────
    socket.on('visitor_message', async ({ conversationId, visitorId, message }) => {
      try {
        const visitorMsg = await Message.create({
          conversationId, senderType: 'visitor', senderId: visitorId, message: message.trim(),
        });
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message.trim(), lastMessageAt: new Date(), $inc: { unreadCount: 1 },
        });
        io.to(`conversation_${conversationId}`).emit('new_message', {
          ...visitorMsg.toObject(), isNew: true,
        });
        io.to('admin_room').emit('visitor_message_to_admin', {
          conversationId, _id: visitorMsg._id, message: visitorMsg.message, createdAt: visitorMsg.createdAt,
        });

        const conversation = await Conversation.findById(conversationId);
        if (conversation?.status === 'AI') {
          io.to(`conversation_${conversationId}`).emit('ai_typing', { conversationId, isTyping: true });
          const recentMessages = await Message.find({ conversationId }).sort({ createdAt: -1 }).limit(10).lean();
          const history = recentMessages.reverse();
          const delay   = Math.min(1000 + message.length * 30, 3000);
          setTimeout(async () => {
            try {
              const aiText = await generateAIResponse(history);
              const aiMsg  = await Message.create({
                conversationId, senderType: 'ai', senderId: null, message: aiText,
              });
              await Conversation.findByIdAndUpdate(conversationId, {
                lastMessage: aiText, lastMessageAt: new Date(),
              });
              io.to(`conversation_${conversationId}`).emit('ai_typing', { conversationId, isTyping: false });
              io.to(`conversation_${conversationId}`).emit('new_message', { ...aiMsg.toObject(), isNew: true });
              io.to('admin_room').emit('ai_response_to_admin', {
                conversationId, _id: aiMsg._id, message: aiMsg.message, createdAt: aiMsg.createdAt,
              });
            } catch (err) {
              console.error('AI error:', err.message);
              io.to(`conversation_${conversationId}`).emit('ai_typing', { conversationId, isTyping: false });
            }
          }, delay);
        }
      } catch (error) {
        console.error('visitor_message error:', error.message);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // ── RECRUITER CONNECT ─────────────────────────────────────────────────────
    // FIX: also re-join any active HUMAN conversations this recruiter is assigned to
    // so that after a dashboard refresh, recruiter_message still reaches the visitor
    socket.on('recruiter_connect', async ({ recruiterId }) => {
      try {
        // Try Recruiter model first, fall back to Admin
        let agent = await Recruiter.findByIdAndUpdate(
          recruiterId,
          { socketId: socket.id, isOnline: true, lastSeen: new Date() },
          { new: true }
        );
        if (!agent) {
          agent = await Admin.findByIdAndUpdate(
            recruiterId,
            { socketId: socket.id, isOnline: true, lastSeen: new Date() },
            { new: true }
          );
        }

        socket.join('admin_room');
        socket.role        = 'recruiter';
        socket.recruiterId = recruiterId;

        // Re-join all active conversations assigned to this recruiter
        // so new_message events reach the visitor room after a refresh
        const activeConvs = await Conversation.find({
          assignedRecruiter: recruiterId,
          status: 'HUMAN',
        }).select('_id');

        for (const conv of activeConvs) {
          socket.join(`conversation_${conv._id}`);
          console.log(`👔 Recruiter ${recruiterId} re-joined conversation_${conv._id}`);
        }

        console.log(`👔 Recruiter/Admin ${recruiterId} joined admin_room`);
        socket.emit('admin_joined', { message: 'Connected to admin room' });
      } catch (error) {
        console.error('recruiter_connect error:', error.message);
      }
    });

    // ── RECRUITER JOIN CONVERSATION ───────────────────────────────────────────
    socket.on('recruiter_join_conversation', async ({ recruiterId, conversationId }) => {
      try {
        let recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) recruiter = await Admin.findById(recruiterId);
        if (!recruiter) return;

        await Conversation.findByIdAndUpdate(conversationId, {
          status: 'HUMAN', assignedRecruiter: recruiterId,
          recruiterJoinedAt: new Date(), unreadCount: 0,
        });

        socket.join(`conversation_${conversationId}`);

        const systemMsg = await Message.create({
          conversationId, senderType: 'system',
          message: `${recruiter.name} has joined the conversation.`,
        });

        io.to(`conversation_${conversationId}`).emit('recruiter_joined', {
          recruiter, recruiterName: recruiter.name, systemMessage: systemMsg.toObject(),
        });
        io.to('admin_room').emit('conversation_status_update', {
          conversationId, status: 'HUMAN', recruiterId, recruiterName: recruiter.name,
        });
      } catch (error) {
        console.error('recruiter_join_conversation error:', error.message);
      }
    });

    // ── RECRUITER MESSAGE ─────────────────────────────────────────────────────
    socket.on('recruiter_message', async ({ conversationId, recruiterId, message }) => {
      try {
        let recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) recruiter = await Admin.findById(recruiterId);
        if (!recruiter) return;

        const msg = await Message.create({
          conversationId,
          senderType: 'recruiter',
          senderId:   recruiterId,
          senderName: recruiter.name,   // persisted so refresh works
          message:    message.trim(),
        });

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message.trim(), lastMessageAt: new Date(),
        });

        // FIX: make sure this socket is in the conversation room before emitting
        // (guards against edge case where join was missed)
        socket.join(`conversation_${conversationId}`);

        // emit to the full room — visitor + any other dashboard tabs
        io.to(`conversation_${conversationId}`).emit('new_message', {
          ...msg.toObject(),
          senderName:    recruiter.name,
          recruiterName: recruiter.name,
        });

        // update conversation list in dashboard
        io.to('admin_room').emit('visitor_message_to_admin', {
          conversationId, _id: msg._id, message: msg.message, createdAt: msg.createdAt,
        });
      } catch (error) {
        console.error('recruiter_message error:', error.message);
      }
    });

    // ── CLOSE CONVERSATION ────────────────────────────────────────────────────
    socket.on('close_conversation', async ({ conversationId }) => {
      try {
        await Conversation.findByIdAndUpdate(conversationId, { status: 'CLOSED', closedAt: new Date() });
        const systemMsg = await Message.create({
          conversationId, senderType: 'system',
          message: 'This conversation has been closed. Thank you for contacting Asliya Recruitment!',
        });
        io.to(`conversation_${conversationId}`).emit('conversation_closed', {
          conversationId, systemMessage: systemMsg.toObject(),
        });
        io.to('admin_room').emit('conversation_status_update', { conversationId, status: 'CLOSED' });
      } catch (error) {
        console.error('close_conversation error:', error.message);
      }
    });

    // ── TYPING ────────────────────────────────────────────────────────────────
    socket.on('typing', ({ conversationId, senderType }) => {
      if (senderType === 'recruiter') {
        socket.to(`conversation_${conversationId}`).emit('recruiter_typing');
      } else {
        socket.to(`conversation_${conversationId}`).emit('typing', { senderType, isTyping: true });
      }
    });
    socket.on('stop_typing', ({ conversationId, senderType }) => {
      if (senderType === 'recruiter') {
        socket.to(`conversation_${conversationId}`).emit('recruiter_stop_typing');
      } else {
        socket.to(`conversation_${conversationId}`).emit('typing', { senderType, isTyping: false });
      }
    });

    // ── DISCONNECT ────────────────────────────────────────────────────────────
    socket.on('disconnect', async () => {
      console.log(`🔌 Disconnected: ${socket.id}`);
      try {
        if (socket.visitorId) {
          await Visitor.findByIdAndUpdate(socket.visitorId, { isOnline: false, lastSeen: new Date() });
          io.to('admin_room').emit('visitor_offline', {
            visitorId: socket.visitorId, conversationId: socket.conversationId,
          });
        }
        if (socket.recruiterId) {
          const updated = await Recruiter.findByIdAndUpdate(
            socket.recruiterId, { isOnline: false, lastSeen: new Date() }
          );
          if (!updated) {
            await Admin.findByIdAndUpdate(socket.recruiterId, { isOnline: false, lastSeen: new Date() });
          }
        }
      } catch (err) {
        console.error('disconnect error:', err.message);
      }
    });
  });
};