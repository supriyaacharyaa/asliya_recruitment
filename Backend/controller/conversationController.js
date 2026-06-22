// import Conversation from '../models/Conversation.js';
// import Message from '../models/Message.js';

// /**
//  * @desc Get all conversations
//  */
// export const getAllConversations = async (req, res, next) => {
//   try {
//     const { status, search, page = 1, limit = 20 } = req.query;
//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const filter = {};
//     if (status) filter.status = status;

//     let query = Conversation.find(filter)
//       .populate('visitorId', 'name email isOnline lastSeen')
//       .populate('assignedRecruiter', 'name email')
//       .sort({ lastMessageAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const conversations = await query;
//     const total = await Conversation.countDocuments(filter);

//     let filtered = conversations;

//     if (search) {
//       const s = search.toLowerCase();
//       filtered = conversations.filter(
//         (c) =>
//           c.visitorId?.name?.toLowerCase().includes(s) ||
//           c.visitorId?.email?.toLowerCase().includes(s)
//       );
//     }

//     res.json({
//       success: true,
//       conversations: filtered,
//       pagination: {
//         page: parseInt(page),
//         limit: parseInt(limit),
//         total,
//         pages: Math.ceil(total / parseInt(limit)),
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc Get single conversation with messages
//  */
// export const getConversation = async (req, res, next) => {
//   try {
//     const conversation = await Conversation.findById(req.params.id)
//       .populate('visitorId', 'name email isOnline lastSeen')
//       .populate('assignedRecruiter', 'name email');

//     if (!conversation) {
//       return res.status(404).json({ error: 'Conversation not found' });
//     }

//     const messages = await Message.find({ conversationId: conversation._id })
//       .sort({ createdAt: 1 });

//     await Conversation.findByIdAndUpdate(req.params.id, { unreadCount: 0 });

//     res.json({ success: true, conversation, messages });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc Visitor messages (FIXED PARAMS)
//  */
// export const getVisitorMessages = async (req, res, next) => {
//   try {
//     const { id } = req.params; // conversationId is :id

//     const conversation = await Conversation.findById(id);

//     if (!conversation) {
//       return res.status(403).json({ error: 'Unauthorized' });
//     }

//     const messages = await Message.find({ conversationId: id })
//       .sort({ createdAt: 1 });

//     res.json({ success: true, messages, conversation });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc Assign recruiter
//  */
// export const assignRecruiter = async (req, res, next) => {
//   try {
//     const { recruiterId } = req.body;

//     const conversation = await Conversation.findByIdAndUpdate(
//       req.params.id,
//       {
//         assignedRecruiter: recruiterId,
//         status: 'HUMAN',
//         recruiterJoinedAt: new Date(),
//       },
//       { new: true }
//     ).populate('assignedRecruiter', 'name email');

//     if (!conversation) {
//       return res.status(404).json({ error: 'Conversation not found' });
//     }

//     const io = req.app.get('io');
//     io.to(`conversation_${conversation._id}`).emit('conversation_assigned', {
//       conversationId: conversation._id,
//       recruiter: conversation.assignedRecruiter,
//     });

//     res.json({ success: true, conversation });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * @desc Close conversation
//  */
// export const closeConversation = async (req, res, next) => {
//   try {
//     const conversation = await Conversation.findByIdAndUpdate(
//       req.params.id,
//       { status: 'CLOSED', closedAt: new Date() },
//       { new: true }
//     );

//     if (!conversation) {
//       return res.status(404).json({ error: 'Conversation not found' });
//     }

//     res.json({ success: true, conversation });
//   } catch (error) {
//     next(error);
//   }
// };

import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

/**
 * @desc Get all conversations
 */
export const getAllConversations = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {};
    if (status) filter.status = status;

    let query = Conversation.find(filter)
      .populate('visitorId', 'name email isOnline lastSeen')
      .populate('assignedRecruiter', 'name email')
      .sort({ lastMessageAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const conversations = await query;
    const total = await Conversation.countDocuments(filter);

    let filtered = conversations;

    if (search) {
      const s = search.toLowerCase();
      filtered = conversations.filter(
        (c) =>
          c.visitorId?.name?.toLowerCase().includes(s) ||
          c.visitorId?.email?.toLowerCase().includes(s)
      );
    }

    res.json({
      success: true,
      conversations: filtered,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get single conversation with messages
 */
export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('visitorId', 'name email isOnline lastSeen')
      .populate('assignedRecruiter', 'name email');

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const messages = await Message.find({ conversationId: conversation._id })
      .sort({ createdAt: 1 });

    await Conversation.findByIdAndUpdate(req.params.id, { unreadCount: 0 });

    res.json({ success: true, conversation, messages });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Visitor messages (FIXED PARAMS)
 */
export const getVisitorMessages = async (req, res, next) => {
  try {
    const { id } = req.params; // conversationId is :id

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const messages = await Message.find({ conversationId: id })
      .sort({ createdAt: 1 });

    res.json({ success: true, messages, conversation });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Assign recruiter
 */
export const assignRecruiter = async (req, res, next) => {
  try {
    const { recruiterId } = req.body;

    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      {
        assignedRecruiter: recruiterId,
        status: 'HUMAN',
        recruiterJoinedAt: new Date(),
      },
      { new: true }
    ).populate('assignedRecruiter', 'name email');

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Was emitting `conversation_assigned` to the conversation room, which
    // nothing listens for. Dashboard listens for `conversation_status_update`
    // on `admin_room`.
    const io = req.app.get('io');
    io.to('admin_room').emit('conversation_status_update', {
      conversationId: conversation._id,
      status: 'HUMAN',
      recruiterId: conversation.assignedRecruiter?._id,
      recruiterName: conversation.assignedRecruiter?.name,
    });

    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Close conversation
 */
export const closeConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { status: 'CLOSED', closedAt: new Date() },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Previously emitted nothing — visitor never found out their chat was
    // closed, and no other open dashboard tab got notified either.
    const systemMsg = await Message.create({
      conversationId: conversation._id,
      senderType: 'system',
      message: 'This conversation has been closed. Thank you for contacting Asliya Recruitment!',
    });

    const io = req.app.get('io');

    // To the visitor — ChatContext.jsx listens for this exact event name.
    io.to(`conversation_${conversation._id}`).emit('conversation_closed', {
      conversationId: conversation._id,
      systemMessage: systemMsg.toObject(),
    });

    // To the dashboard(s).
    io.to('admin_room').emit('conversation_status_update', {
      conversationId: conversation._id,
      status: 'CLOSED',
    });

    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};