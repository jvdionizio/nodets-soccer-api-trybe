import UserService from '../services/UserService';

const getUsers = async () => {
  const users = await UserService.list();
  return users;
};

export default getUsers;
