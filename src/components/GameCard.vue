<script setup lang="ts">
import type { Game } from "../types/game";

defineProps<{ game: Game }>();

const getScoreColor = (score: number) => {
  if (score >= 80) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
};
</script>

<template>
  <div class="game-card">
    <div class="cover">
      <img :src="game.cover" :alt="game.title" />
      <div class="platform-badge" :class="game.platform.toLowerCase()">
        {{ game.platform }}
      </div>
    </div>

    <div class="info">
      <h3>{{ game.title }}</h3>

      <div class="performance-metric">
        <div class="metric-header">
          <span>Сумісність</span>
          <span :style="{ color: getScoreColor(game.performanceScore) }">
            {{ game.performanceScore }}%
          </span>
        </div>
        <div class="progress-bar">
          <div
            class="fill"
            :style="{
              width: game.performanceScore + '%',
              backgroundColor: getScoreColor(game.performanceScore),
            }"
          ></div>
        </div>
      </div>

      <div class="fps-prediction">
        Прогноз: <strong>{{ game.expectedFps }} FPS</strong>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.game-card {
  background: $bg-card;
  border-radius: $border-radius;
  overflow: hidden;
  transition: $transition;
  border: 1px solid rgba($white, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    border-color: rgba($primary, 0.4);
  }

  .cover {
    height: 160px;
    position: relative;
    background: #000;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
    }

    .platform-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: bold;
      &.steam {
        background: #00adee;
        color: white;
      }
      &.epic {
        background: white;
        color: black;
      }
      &.gog {
        background: #6b21a8;
        color: white;
      }
    }
  }

  .info {
    padding: 1.2rem;
    h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .performance-metric {
      margin-bottom: 1rem;
      .metric-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        margin-bottom: 5px;
      }
      .progress-bar {
        height: 6px;
        background: rgba($white, 0.1);
        border-radius: 3px;
        .fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease-out;
        }
      }
    }

    .fps-prediction {
      font-size: 0.85rem;
      color: $text-muted;
      strong {
        color: $primary;
      }
    }
  }
}
</style>
