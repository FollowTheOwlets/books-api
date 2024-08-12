import { UserRole } from '../../../repositories/data/user-role';

export interface UpdateUserDto {
  id: number;
  role: UserRole;
}
