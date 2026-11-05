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
        <div class="difficulty-buttons">
          <button class="btn btn-success" onclick="setDifficulty('easy')">初級</button>
          <button class="btn btn-warning" onclick="setDifficulty('medium')">中級</button>
          <button class="btn btn-danger" onclick="setDifficulty('hard')">上級</button>
        </div>
        <button class="btn btn-info" onclick="initGame()">新しいゲーム</button>
        <div id="mine-count"></div>
      </div>
      <div id="status" class="status"></div>
      <div id="game-board" class="game-board"></div>
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
  slug: 'minesweeper',
  title: 'マインスイーパー - 定番パズル',
  shortTitle: 'マインスイーパー',
  description: '隠れた地雷を避けながらマスを開きましょう。数字は隣接する地雷の数を示します。3段階の難易度があります。',
  metaDescription: 'Play Minesweeper online free with easy, medium, and hard modes. Classic puzzle game - uncover squares without hitting mines. No download needed.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '定番'],
  keywords: ['minesweeper', 'minesweeper online', 'mine sweeper game', 'puzzle game', 'logic puzzle'],
  initCode: 'initGame();',
  faqs: [
    {
      question: "マインスイーパーはどう遊びますか？",
      answer: "マスをクリックして開きます。数字は周囲にある地雷の数です。地雷がありそうな場所には右クリックで旗を立て、地雷以外のマスをすべて開けばクリアです。"
    },
    {
      question: "数字は何を表していますか？",
      answer: "数字は周囲8マスにある地雷の数です。この情報から安全なマスを推理します。"
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
