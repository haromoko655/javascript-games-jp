<template>
  <nav class="navbar navbar-expand-lg" aria-label="メインナビゲーション">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/" aria-label="Webブラウザゲーム - ブレインバスターズ 日本語版">
        <span class="brand-text">Webブラウザゲーム - ブレインバスターズ 日本語版</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="ナビゲーションメニューを開閉"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/" aria-label="すべてのゲームを見る">
              <i class="bi bi-controller me-1" aria-hidden="true"></i> ゲーム一覧
            </router-link>
          </li>
          <li class="nav-item">
            <RepositoryLinks menu-id="header-repository-menu" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import RepositoryLinks from './RepositoryLinks.vue'
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.brand-text {
  color: var(--color-text-strong);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  min-width: 44px;
  font-weight: 500;
  font-size: var(--text-body);
  padding: 0.5rem 1rem !important;
  color: var(--color-text);
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
  color: var(--color-text-strong) !important;
}

.nav-link i {
  font-size: 1rem;
}

.router-link-active:not(.navbar-brand) {
  text-decoration: underline;
  color: var(--color-text-strong) !important;
}

.navbar-toggler {
  min-width: 44px;
  min-height: 44px;
  border: 1px solid var(--color-border);
  border-radius: 0;
  padding: 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}
</style>
