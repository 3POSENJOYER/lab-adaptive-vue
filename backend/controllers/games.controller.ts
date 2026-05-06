import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { Game } from "../models/Game";

@Controller("games")
export class GamesController {
  @Get()
  async findAll(): Promise<Game[]> {
    return Game.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Game | null> {
    return Game.findByPk(+id);
  }

  @Post()
  async create(@Body() gameData: Partial<Game>): Promise<Game> {
    return Game.create(gameData);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() gameData: Partial<Game>,
  ): Promise<Game> {
    const game = await Game.findByPk(+id);
    if (game) {
      await game.update(gameData);
      return game;
    }
    throw new Error("Game not found");
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    const game = await Game.findByPk(+id);
    if (game) {
      await game.destroy();
    }
  }
}
