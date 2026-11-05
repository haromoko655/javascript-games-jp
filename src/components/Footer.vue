<template>
  <footer class="footer mt-auto py-4" role="contentinfo">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-2 mb-md-0">
            &copy; {{ currentYear }} Muthukrishnan
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <nav aria-label="フッターナビゲーション" class="footer-nav">
            <router-link to="/#top">ゲーム一覧</router-link>
            <RepositoryLinks menu-id="footer-repository-menu" placement="up" />
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import RepositoryLinks from './RepositoryLinks.vue'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  font-size: var(--text-caption);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
}

.footer a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  color: var(--color-text);
  text-decoration: underline;
}

.footer a:hover {
  text-decoration: none;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1rem;
}

@media (min-width: 768px) {
  .footer-nav {
    justify-content: flex-end;
  }
}
</style>
