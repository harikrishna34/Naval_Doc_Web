import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserFormData, dummyUsers } from './types';
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
  users: User[];
  addUser: (userData: UserFormData) => void;
  updateUser: (id: string, userData: UserFormData) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(dummyUsers);

  const addUser = (userData: UserFormData): void => {
    const newUser = {
      id: uuidv4(),
      ...userData
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, userData: UserFormData): void => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: string): void => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};