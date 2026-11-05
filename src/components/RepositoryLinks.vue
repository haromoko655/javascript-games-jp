<template>
  <div class="repository-links">
    <button
      type="button"
      class="repository-trigger"
      aria-haspopup="true"
      :aria-expanded="menuOpen"
      :aria-controls="menuId"
      @click="menuOpen = !menuOpen"
      @keydown.esc="menuOpen = false"
    >
      <i class="bi bi-github" aria-hidden="true"></i>
      <span>GitHub</span>
    </button>
    <div v-show="menuOpen" :id="menuId" class="repository-menu" role="menu" @keydown.esc="menuOpen = false">
      <a
        href="https://github.com/muthuspark/javascript-games"
        target="_blank"
        rel="noopener noreferrer"
        role="menuitem"
        @click="menuOpen = false"
      >
        元になったリポジトリ
      </a>
      <a
        href="https://github.com/haromoko655/javascript-games-jp"
        target="_blank"
        rel="noopener noreferrer"
        role="menuitem"
        @click="menuOpen = false"
      >
        このリポジトリ（日本語版）
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  menuId: {
    type: String,
    required: true
  }
})

const menuOpen = ref(false)
</script>

<style scoped>
.repository-links {
  position: relative;
}

.repository-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-width: 44px;
  min-height: 44px;
  padding: 0.5rem 1rem;
  border: 0;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  cursor: pointer;
}

.repository-trigger:hover,
.repository-trigger:focus-visible {
  color: var(--color-text-strong);
  text-decoration: underline;
}

.repository-trigger i {
  font-size: 1rem;
}

.repository-menu {
  position: absolute;
  z-index: 1000;
  top: 100%;
  right: 0;
  display: grid;
  min-width: 220px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
}

.repository-menu a {
  min-height: 44px;
  padding: 0.65rem 0.85rem;
  color: var(--color-text);
  text-decoration: none;
}

.repository-menu a:hover,
.repository-menu a:focus-visible {
  background: var(--color-surface-subtle);
  text-decoration: underline;
}
</style>
