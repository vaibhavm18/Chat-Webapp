import {axiosInstance} from './base';

// auth
type login = {
  username: string;
  password: string;
};

type signup = {
  email: string;
  username: string;
  password: string;
};

export const login = async (data: login) =>
  await axiosInstance.post('/auth/login', data);

export const signup = async (data: signup) =>
  await axiosInstance.post('/auth/login', data);

export const authenticate = async () =>
  await axiosInstance.get('/auth/authenticate');

// user
export const profile = async () => await axiosInstance.get('/user/profile');
export const notification = async () =>
  await axiosInstance.get('/user/notification');

// personal
export const allFriends = async () => await axiosInstance.get('/personal');

export const friendRequest = async (id: string) =>
  await axiosInstance.post('/personal/create', {friendId: id});

export const acceptFriendRequest = async (id: string) =>
  await axiosInstance.post(`/personal/accept/${id}`);

export const declineFriendRequest = async (id: string) =>
  await axiosInstance.delete(`/personal/decline/${id}`);

export const sendMessage = async (id: string, message: string) =>
  await axiosInstance.put(`/personal/chat/${id}`, {message});

export const getChats = async (id: string) =>
  await axiosInstance.get(`/personal/chat/${id}`);

export const removeFriend = async (id: string) =>
  await axiosInstance.delete(`/personal/remove/${id}`);

// group

type group = {
  group_name: string;
  category: string;
};

export const allGroups = async () => await axiosInstance.get(`/group`);

export const createGroup = async (group: group) =>
  await axiosInstance.post(`/group/create`, group);

export const getSingleGroup = async (id: string) =>
  await axiosInstance.post(`/group/${id}`);

export const joinGroup = async (id: string) =>
  await axiosInstance.put(`/group/join/${id}`);

export const removeGroupMember = async (groupId: string, userId: string) =>
  await axiosInstance.post(`/group/remove/${groupId}`, {userId});

export const deleteGroupMember = async (id: string) =>
  await axiosInstance.post(`/group/delete/${id}`);

export const leaveGroupMember = async (id: string) =>
  await axiosInstance.post(`/group/leave/${id}`);

export const sendGroupMessage = async (id: string, message: string) =>
  await axiosInstance.put(`/group/chats/${id}`, {message});

export const getGroupMessage = async (id: string) =>
  await axiosInstance.get(`/group/chats/${id}`);
