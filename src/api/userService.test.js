import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as userService from './userService';
import api from './axiosInstance';

// Mock the axios instance methods
vi.mock('./axiosInstance', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('calls the /users endpoint', async () => {
      const mockResponse = { data: [{ id: 1, name: 'John' }] };
      api.get.mockResolvedValueOnce(mockResponse);

      const response = await userService.getUsers();
      expect(api.get).toHaveBeenCalledWith('/users');
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getUserById', () => {
    it('calls the /users/:id endpoint', async () => {
      api.get.mockResolvedValueOnce({ data: { id: 1 } });
      await userService.getUserById(1);
      expect(api.get).toHaveBeenCalledWith('/users/1');
    });
  });

  describe('createUser', () => {
    it('posts to the /users endpoint with data', async () => {
      const userData = { name: 'John', email: 'john@test.com' };
      api.post.mockResolvedValueOnce({ data: { id: 11, ...userData } });
      
      await userService.createUser(userData);
      expect(api.post).toHaveBeenCalledWith('/users', userData);
    });
  });

  describe('updateUser', () => {
    it('puts to the /users/:id endpoint with data', async () => {
      const userData = { name: 'John Updated' };
      api.put.mockResolvedValueOnce({ data: { id: 1, ...userData } });
      
      await userService.updateUser(1, userData);
      expect(api.put).toHaveBeenCalledWith('/users/1', userData);
    });
  });

  describe('deleteUser', () => {
    it('deletes from the /users/:id endpoint', async () => {
      api.delete.mockResolvedValueOnce({ status: 200 });
      
      await userService.deleteUser(1);
      expect(api.delete).toHaveBeenCalledWith('/users/1');
    });
  });
});
