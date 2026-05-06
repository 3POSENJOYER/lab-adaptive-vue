<template>
  <footer class="footer">
    <div class="container footer-content">
      <div class="footer-info">
        <h4>Ілля Єресько</h4>
        <p>Студент групи ІА-34</p>
        <p>КПІ ім. Ігоря Сікорського</p>
      </div>

      <div class="footer-links">
        <a href="https://github.com/YereskoIllia" target="_blank">GitHub</a>
        <a href="mailto:example@kpi.ua">Email</a>
        <a href="#">Telegram</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        &copy; 2026 Всі права захищені. Створено з використанням Vue 3 для
        GameStack.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.footer {
  background: $bg-dark;
  color: rgba($white, 0.8);
  padding: 3rem 0 1.5rem;
  margin-top: 4rem;

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba($white, 0.1);
  }

  .footer-info {
    h4 {
      color: $white;
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.9rem;
      margin: 0;
    }
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;

    a {
      transition: color $transition;
      &:hover {
        color: $primary;
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 1.5rem;
    font-size: 0.8rem;
    color: rgba($white, 0.5);
  }

  @media (max-width: $tablet) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
