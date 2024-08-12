import { UserRole } from "./user-role";

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  emailVerified: boolean;

  updatedAt?: Date;
  emailVerificationToken?: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    role: UserRole,
    createdAt: Date,
    emailVerified: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.emailVerified = emailVerified;
  }
}
