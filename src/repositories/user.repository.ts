import { CreateUserDto } from '../endpoints/v1/dto/create-user.dto';
import { UpdateUserDto } from '../endpoints/v1/dto/update-user.dto';
import prisma from '../prisma/client';
import { User } from '@prisma/client';

export const createUser = async (data: CreateUserDto): Promise<User> => {
  return prisma.user.create({
    data,
  });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUserRole = async (dto: UpdateUserDto): Promise<User> => {
  return prisma.user.update({
    where: { id: dto.id },
    data: {
      role: dto.role,
    },
  });
};
