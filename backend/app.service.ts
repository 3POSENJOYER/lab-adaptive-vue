import { Injectable, OnModuleInit } from "@nestjs/common";
import { User } from "./models/User";
import { Post } from "./models/Post";
import { Game } from "./models/Game";
import { HardwareProfile } from "./models/HardwareProfile";
import { sequelize } from "./config/database";

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    (User as any).hasMany(Post, { foreignKey: "userId" });
    (Post as any).belongsTo(User, { foreignKey: "userId" });
    (User as any).hasOne(HardwareProfile, { foreignKey: "userId" });
    (HardwareProfile as any).belongsTo(User, { foreignKey: "userId" });

    await sequelize.sync({ force: true });
    console.log("Tables created");

    await this.createInitialGames();
  }

  async createInitialGames() {
    const gamesData = [
      {
        title: "Elden Ring",
        platform: "Steam" as const,
        performanceScore: 95,
        expectedFps: 120,
        cover:
          "/src/assets/lab1/elden-ring-nightreign-2025-otzyv_1749390116150800931.jpg",
      },
      {
        title: "Cyberpunk 2077",
        platform: "GOG" as const,
        performanceScore: 68,
        expectedFps: 55,
        cover: "/src/assets/lab1/Cyberpunk_2077_box_art.jpg",
      },
      {
        title: "Lords of the Fallen",
        platform: "Epic" as const,
        performanceScore: 82,
        expectedFps: 85,
        cover: "/src/assets/lab1/lordOfTheFallen.avif",
      },
    ];

    for (const gameData of gamesData) {
      await (Game as any).create(gameData);
    }
    console.log("Initial games created");
  }
}
