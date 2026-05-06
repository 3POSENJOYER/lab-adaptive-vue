<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { Game } from "./types/game";
import GameCard from "./components/GameCard.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";

const games = ref<Game[]>([]);
const currentUser = ref<{ id: number; name: string; email: string } | null>(
  null,
);
const authMode = ref<"register" | "login">("register");
const registerData = reactive({ name: "", email: "", password: "" });
const hardware = reactive({
  cpu: "Ryzen 7 5800X",
  gpu: "RTX 4070",
  ram: 16,
  vram: 12,
  resolution: "1440p",
});
const selectedGameId = ref<number | null>(null);
const prediction = ref<{
  predictedFps: number;
  gameTitle: string;
  baseFps: number;
} | null>(null);
const message = ref("");

const fetchGames = async () => {
  try {
    const response = await fetch("http://localhost:3000/games");
    const data = await response.json();
    games.value = data;
    selectedGameId.value = data[0]?.id ?? null;
  } catch (error) {
    console.error("Error fetching games:", error);
    games.value = [
      {
        id: 1,
        title: "Elden Ring",
        platform: "Steam",
        performanceScore: 95,
        expectedFps: 120,
        cover:
          "../src/assets/lab1/elden-ring-nightreign-2025-otzyv_1749390116150800931.jpg",
      },
      {
        id: 2,
        title: "Cyberpunk 2077",
        platform: "GOG",
        performanceScore: 68,
        expectedFps: 55,
        cover: "../src/assets/lab1/Cyberpunk_2077_box_art.jpg",
      },
      {
        id: 3,
        title: "Lords of the Fallen",
        platform: "Epic",
        performanceScore: 82,
        expectedFps: 85,
        cover: "../src/assets/lab1/lordOfTheFallen.avif",
      },
    ];
    selectedGameId.value = games.value[0]?.id ?? null;
  }
};

const register = async () => {
  message.value = "";
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    const result = await response.json();
    if (!response.ok) {
      message.value = result?.message || "Помилка реєстрації";
      return;
    }
    if (result.success) {
      currentUser.value = result.user;
      message.value = "Реєстрація успішна";
    } else {
      message.value = result.message || "Помилка реєстрації";
    }
  } catch (error) {
    message.value = "Помилка реєстрації";
  }
};

const login = async () => {
  message.value = "";
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      message.value = result?.message || "Помилка входу";
      return;
    }
    if (result.success) {
      currentUser.value = result.user;
      message.value = "Успішний вхід";
    } else {
      message.value = result.message || "Помилка входу";
    }
  } catch (error) {
    message.value = "Помилка входу";
  }
};

const saveHardware = async () => {
  if (!currentUser.value) {
    message.value = "Увійдіть або зареєструйтесь перед збереженням профілю";
    return;
  }
  try {
    const response = await fetch("http://localhost:3000/hardware", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.value.id, ...hardware }),
    });
    await response.json();
    message.value = "Профіль заліза збережено";
  } catch (error) {
    message.value = "Помилка збереження заліза";
  }
};

const predictFps = async () => {
  if (!selectedGameId.value) {
    message.value = "Оберіть гру для прогнозу";
    return;
  }

  try {
    const body = {
      gameId: selectedGameId.value,
      userId: currentUser.value?.id,
      hardware,
    };
    const response = await fetch("http://localhost:3000/predict/fps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    prediction.value = await response.json();
    message.value = "Прогноз FPS отримано";
  } catch (error) {
    message.value = "Помилка прогнозу FPS";
  }
};

onMounted(() => {
  fetchGames();
});
</script>

<template>
  <div class="gamestack-app">
    <TheHeader />

    <main class="container">
      <section id="home" class="hw-summary">
        <div class="user-info">
          <h2>Привіт, Illia!</h2>
          <p>Твоя система: <strong>RTX 4070 | Ryzen 7 </strong></p>
        </div>
        <button class="sync-btn">Синхронізувати бібліотеки</button>
      </section>

      <section id="profile" class="profile-section">
        <div class="auth-panel">
          <h2>Реєстрація / Вхід</h2>
          <div class="form-row">
            <label>Ім'я</label>
            <input v-model="registerData.name" placeholder="Ім'я" />
          </div>
          <div class="form-row">
            <label>Email</label>
            <input
              v-model="registerData.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="form-row">
            <label>Пароль</label>
            <input
              v-model="registerData.password"
              type="password"
              placeholder="Пароль"
            />
          </div>
          <div class="button-row">
            <button
              @click="authMode = 'register'"
              :class="{ active: authMode === 'register' }"
            >
              Реєстрація
            </button>
            <button
              @click="authMode = 'login'"
              :class="{ active: authMode === 'login' }"
            >
              Вхід
            </button>
          </div>
          <button
            class="save-btn"
            @click="authMode === 'register' ? register() : login()"
          >
            {{ authMode === "register" ? "Зареєструватись" : "Увійти" }}
          </button>
          <p class="message">{{ message }}</p>
          <div v-if="currentUser" class="user-card">
            <strong>Поточний користувач:</strong>
            <p>{{ currentUser.name }} ({{ currentUser.email }})</p>
          </div>
        </div>

        <div class="hardware-panel">
          <h2>Профіль заліза</h2>
          <div class="form-row">
            <label>CPU</label>
            <input
              v-model="hardware.cpu"
              placeholder="Наприклад Ryzen 7 5800X"
            />
          </div>
          <div class="form-row">
            <label>GPU</label>
            <input v-model="hardware.gpu" placeholder="Наприклад RTX 4070" />
          </div>
          <div class="form-row">
            <label>ОЗП (GB)</label>
            <input v-model.number="hardware.ram" type="number" min="4" />
          </div>
          <div class="form-row">
            <label>VRAM (GB)</label>
            <input v-model.number="hardware.vram" type="number" min="2" />
          </div>
          <div class="form-row">
            <label>Роздільна здатність</label>
            <input v-model="hardware.resolution" placeholder="1440p або 4K" />
          </div>
          <button class="save-btn" @click="saveHardware()">
            Зберегти залізо
          </button>
          <div class="prediction-panel">
            <h3>Прогноз FPS</h3>
            <select v-model.number="selectedGameId">
              <option v-for="game in games" :key="game.id" :value="game.id">
                {{ game.title }}
              </option>
            </select>
            <button class="save-btn" @click="predictFps()">Оцінити FPS</button>
            <div v-if="prediction" class="prediction-result">
              <p><strong>Гра:</strong> {{ prediction.gameTitle }}</p>
              <p>
                <strong>Прогнозований FPS:</strong>
                {{ prediction.predictedFps }}
              </p>
              <p><strong>Базовий FPS:</strong> {{ prediction.baseFps }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="library" class="library-section">
        <div class="filters">
          <button class="active">Всі ігри</button>
          <button>Steam</button>
          <button>Epic</button>
        </div>

        <div class="game-grid">
          <GameCard v-for="game in games" :key="game.id" :game="game" />
        </div>
      </section>

      <section id="about" class="about-section">
        <h2>Про GameStack</h2>
        <p>
          GameStack — це єдина платформа для агрегації ігрових бібліотек із
          різних сервісів (Steam, Epic Games, GOG) в одному інтерфейсі. Основна
          мета системи — автоматизація аналізу сумісності ігор із апаратним
          забезпеченням користувача та надання точних прогнозів продуктивності.
        </p>
        <p>
          З GameStack ви можете легко синхронізувати свої ігрові бібліотеки,
          перевіряти продуктивність ігор на вашому ПК та отримувати рекомендації
          для оптимальної гри.
        </p>
      </section>
    </main>

    <TheFooter />
  </div>
</template>

<style lang="scss">
@use "./styles/main.scss" as *;

.gamestack-app {
  background-color: $bg-dark;
  color: $text-main;
  min-height: 100vh;
}

.hw-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid rgba($white, 0.05);
  margin-bottom: 2rem;

  .sync-btn {
    background: $primary;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: $border-radius;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: lighten($primary, 10%);
    }
  }
}

.profile-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: $tablet) {
    grid-template-columns: 1fr;
  }

  .auth-panel,
  .hardware-panel {
    background: $bg-card;
    border: 1px solid rgba($white, 0.08);
    border-radius: $border-radius;
    padding: 1.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  h2 {
    margin-bottom: 1.5rem;
    color: $primary;
  }

  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;

    label {
      font-size: 0.95rem;
      color: $text-muted;
    }

    input,
    select {
      width: 100%;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      background: rgba($white, 0.05);
      border: 1px solid rgba($white, 0.08);
      color: $text-main;
      outline: none;
      transition: border-color 0.2s ease;
    }

    input:focus,
    select:focus {
      border-color: $primary;
      background: rgba($white, 0.08);
    }
  }

  .button-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;

    button {
      flex: 1;
      background: transparent;
      border: 1px solid rgba($white, 0.1);
      color: $text-main;
      padding: 0.85rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;

      &.active,
      &:hover {
        background: rgba($primary, 0.12);
        border-color: $primary;
        color: $primary;
      }
    }
  }

  .save-btn {
    width: 100%;
    background: $primary;
    border: none;
    color: #fff;
    padding: 0.95rem 1rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    margin-top: 0.5rem;

    &:hover {
      background: lighten($primary, 10%);
    }
  }

  .message {
    margin-top: 1rem;
    color: $text-muted;
    min-height: 1.4rem;
  }

  .user-card {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba($white, 0.03);
    border-radius: 12px;
    border: 1px solid rgba($white, 0.06);
  }

  .prediction-panel {
    margin-top: 1.5rem;
    .save-btn {
      margin-top: 1rem;
    }

    h3 {
      margin-bottom: 1rem;
      color: $text-main;
    }

    select {
      margin-top: 0.5rem;
    }

    .prediction-result {
      margin-top: 1rem;
      padding: 1rem;
      background: rgba($white, 0.04);
      border-radius: 12px;
      border: 1px solid rgba($white, 0.06);
      color: $text-main;

      p {
        margin-bottom: 0.6rem;
      }
    }
  }
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding-bottom: 4rem;
}

.about-section {
  padding: 4rem 0;
  text-align: center;
  border-top: 1px solid rgba($white, 0.05);
  margin-top: 4rem;

  h2 {
    color: $primary;
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto 1rem;
    color: $text-muted;
  }
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  button {
    background: transparent;
    border: 1px solid rgba($white, 0.1);
    color: $text-muted;
    padding: 0.5rem 1.2rem;
    border-radius: 20px;
    cursor: pointer;
    &.active {
      background: rgba($primary, 0.1);
      border-color: $primary;
      color: $primary;
    }
  }
}

@media (max-width: $tablet) {
  .hw-summary {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  .filters {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style>
