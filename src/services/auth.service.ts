import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import { createUser } from '../repositories/user.repository';
import { sendMail } from '../smtp/smtp.service';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const verificationToken = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = createUser({
    username,
    email,
    password: hashedPassword,
    emailVerificationToken: verificationToken,
  });

  sendMail(email, verificationToken);
  return user;
};

const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  if (!user.emailVerified) {
    throw new Error('Not verified email');
  }
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

export const confirmEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
