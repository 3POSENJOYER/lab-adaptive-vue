import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { User } from "../models/User";

@Injectable()
export class AuthService {
  async register(name: string, email: string, password: string): Promise<User> {
    if (!name || !email || !password) {
      throw new BadRequestException("Будь ласка, заповніть всі поля");
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException("Email вже зареєстровано");
    }
    const hashed = await bcrypt.hash(password, 10);
    return User.create({ name, email, password: hashed });
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }
    return user;
  }
}
