import {configureStore} from '@reduxjs/toolkit';
import authRedcer from '../features/auth/authSlice';
import groupChatSlice from '../features/group/chatSlice';
import groupListSlice from '../features/group/groupListSlice';
import groupSlice from '../features/group/groupSlice';
import notificationSlice from '../features/notification/notificationSlice';
import personalChatSlice from '../features/user/chatSlice';
import userListSlice from '../features/user/userListSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authRedcer,
    personal: userSlice,
    personalChats: personalChatSlice,
    userList: userListSlice,
    group: groupSlice,
    groupChats: groupChatSlice,
    groupList: groupListSlice,
    notification: notificationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
