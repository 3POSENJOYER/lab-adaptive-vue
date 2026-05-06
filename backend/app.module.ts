import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { Game } from "./models/Game";
import { HardwareProfile } from "./models/HardwareProfile";
import { GamesController } from "./controllers/games.controller";
import { AuthController } from "./controllers/auth.controller";
import { HardwareController } from "./controllers/hardware.controller";
import { PredictionController } from "./controllers/prediction.controller";
import { AuthService } from "./services/auth.service";
import { HardwareService } from "./services/hardware.service";
import { PredictionService } from "./services/prediction.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "web_backend_lab",
      models: [User as any, Post as any, Game as any, HardwareProfile as any],
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([
      User as any,
      Post as any,
      Game as any,
      HardwareProfile as any,
    ]),
  ],
  controllers: [
    GamesController,
    AuthController,
    HardwareController,
    PredictionController,
  ],
  providers: [AppService, AuthService, HardwareService, PredictionService],
})
export class AppModule {}
