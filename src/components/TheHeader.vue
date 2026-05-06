<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>

<template>
  <header class="header">
    <div class="logo">GameStack<span>.dev</span></div>

    <button class="burger" @click="toggleMenu" :class="{ active: isMenuOpen }">
      <span></span>
    </button>

    <nav class="nav" :class="{ open: isMenuOpen }">
      <ul @click="isMenuOpen = false">
        <li><a href="#home">Головна</a></li>
        <li><a href="#library">Бібліотека</a></li>
        <li><a href="#about">Про проект</a></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: #1a1a1a;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    span {
      color: #42b883;
    }
  }

  .nav {
    ul {
      display: flex;
      gap: 2rem;
      list-style: none;
    }
    a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }
    a:hover {
      color: #42b883;
    }
  }

  .burger {
    display: none;
  }

  @media (max-width: 768px) {
    .burger {
      display: block;
      background: none;
      border: none;
      cursor: pointer;
      width: 30px;
      height: 20px;
      position: relative;
      span,
      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 2px;
        width: 100%;
        background: white;
        transition: 0.3s;
      }
      &::before {
        top: 0;
      }
      span {
        top: 9px;
      }
      &::after {
        bottom: 0;
      }
      &.active {
        span {
          opacity: 0;
        }
        &::before {
          transform: rotate(45deg);
          top: 9px;
        }
        &::after {
          transform: rotate(-45deg);
          bottom: 9px;
        }
      }
    }
    .nav {
      position: fixed;
      top: 60px;
      left: -100%;
      width: 100%;
      height: 100vh;
      background: #1a1a1a;
      transition: 0.3s;
      &.open {
        left: 0;
      }
      ul {
        flex-direction: column;
        align-items: center;
        padding-top: 2rem;
      }
    }
  }
}
</style>
