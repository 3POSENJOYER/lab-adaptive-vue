import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(201)
  async register(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    try {
      const user = await this.authService.register(name, email, password);
      return { success: true, user };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message:
            error instanceof Error ? error.message : "Помилка реєстрації",
        },
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const user = await this.authService.login(email, password);
    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }
    return { success: true, user };
  }
}
