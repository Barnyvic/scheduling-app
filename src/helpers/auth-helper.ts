import { hash, compare } from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return compare(password, hash);
};

export { hashPassword, verifyPassword };
