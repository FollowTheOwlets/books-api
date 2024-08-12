export interface CreateUserDto {
    username: string;
    password: string;
    email: string;
    emailVerificationToken: string;
}