import { Request, Response } from 'express';
import { updateUserRole } from '../repositories/user.repository';
import { UpdateUserDto } from '../endpoints/v1/dto/update-user.dto';
import { UserRole } from '../repositories/data/user-role';

export const getUserInfo = async (req: Request, res: Response) => {
  res.json(req.user);
};

export const changeUserRole = async (req: Request, res: Response) => {
  const { id, role } = req.params;
  const dto: UpdateUserDto = { id: parseInt(id), role: parseInt(role) };

  if (typeof role !== 'number') {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const user = await updateUserRole(dto);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user role' });
  }
};
