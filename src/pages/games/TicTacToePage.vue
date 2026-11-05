<template>
  <article class="container py-4" itemscope itemtype="https://schema.org/VideoGame">
    <Breadcrumb :items="breadcrumbItems" />

    <header class="mb-4">
      <h1 class="mb-2" itemprop="name">{{ game.title }}</h1>
      <p class="text-muted lead" itemprop="description">{{ game.description }}</p>
      <div class="mb-3">
        <span v-for="category in game.categories" :key="category" class="badge bg-success me-2" itemprop="genre">
          {{ category }}
        </span>
      </div>
    </header>

    <section class="game-section" aria-label="ゲームエリア">
      <div class="controls">
        <select id="difficulty">
          <option value="easy">初級</option>
          <option value="medium">中級</option>
          <option value="hard">上級</option>
        </select>
        <select id="gridSize">
          <option value="3">3×3</option>
          <option value="4">4×4</option>
          <option value="5">5×5</option>
        </select>
        <button onclick="startNewGame()">新しいゲーム</button>
      </div>
      <div id="gameBoard" class="game-board"></div>
      <div id="status" class="status"></div>
    </section>

    <GameFaqs :faqs="game.faqs" />
    <RelatedGames :currentSlug="game.slug" :categories="game.categories" />

    <meta itemprop="url" :content="`https://haromoko655.github.io/javascript-games-jp/posts/${game.slug}/`">
    <meta itemprop="image" :content="`https://haromoko655.github.io/javascript-games-jp/posts/${game.slug}/thumbnail.png`">
    <meta itemprop="applicationCategory" content="Game">
    <meta itemprop="operatingSystem" content="Web Browser">
    <span itemprop="offers" itemscope itemtype="https://schema.org/Offer" style="display:none">
      <meta itemprop="price" content="0">
      <meta itemprop="priceCurrency" content="USD">
    </span>
  </article>
</template>

<script setup>
import { useGameLoader } from '../../composables/useGameLoader.js'
import { useGameSeo } from '../../composables/useGameSeo.js'
import Breadcrumb from '../../components/Breadcrumb.vue'
import GameFaqs from '../../components/GameFaqs.vue'
import RelatedGames from '../../components/RelatedGames.vue'

const game = {
  slug: 'tic-tac-toe',
  title: '○×ゲーム - コンピューター対戦',
  shortTitle: '○×ゲーム',
  description: 'コンピューターと対戦する○×ゲームです。3×3、4×4、5×5の盤面と難易度を選べます。',
  metaDescription: 'Play free Tic Tac Toe online against computer AI. Multiple grid sizes (3x3, 4x4, 5x5) and difficulty levels. Classic noughts and crosses game.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '戦略', '定番'],
  keywords: ['tic tac toe', 'noughts and crosses', 'x and o game', 'tic tac toe online', 'play tic tac toe'],
  initCode: 'startNewGame();',
  faqs: [
    {
      question: "○×ゲームで勝つには？",
      answer: "相手より先に、自分の印を横・縦・斜めのいずれかに3つ（大きな盤面ではそれ以上）並べます。"
    },
    {
      question: "コンピューターと対戦できますか？",
      answer: "はい。初級・中級・上級のコンピューターと対戦できます。"
    }
  ]
}

const breadcrumbItems = [
  { name: 'ホーム', path: '/' },
  { name: 'ゲーム一覧', path: '/' },
  { name: game.shortTitle || game.title, path: `/posts/${game.slug}/` }
]

useGameLoader(game.slug, game.initCode)
useGameSeo(game)
</script>

<style scoped>
h1 { font-weight: 400; }
.game-section { min-height: 400px; }
</style>
