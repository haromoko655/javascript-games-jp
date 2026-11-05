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
      <div class="sudoku">
        <div class="difficulty-controls">
          <button class="difficulty easy selected" onclick="setDifficulty('easy')">初級</button>
          <button class="difficulty medium" onclick="setDifficulty('medium')">中級</button>
          <button class="difficulty hard" onclick="setDifficulty('hard')">上級</button>
        </div>
        <div class="timer" id="timer">00:00</div>
        <div class="controls">
          <button onclick="newGame()">新しいゲーム</button>
          <button onclick="hint()">ヒント</button>
        </div>
        <div class="grid" id="grid"></div>
        <div class="message" id="message"></div>
      </div>
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
  slug: 'sudoku',
  title: '無料オンライン数独',
  shortTitle: '数独',
  description: '無料で遊べる定番の数独です。各行・各列・3×3のブロックに1から9までの数字を一度ずつ入れましょう。難易度を選べます。',
  metaDescription: 'Play free online Sudoku puzzles with easy, medium, and hard difficulty levels. Train your brain with this classic number placement game. No download required.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '数字'],
  keywords: ['sudoku online', 'free sudoku', 'sudoku puzzle', 'number puzzle', 'brain games'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "数独はどう遊びますか？",
      answer: "9×9の盤面を埋め、各行・各列・3×3ブロックに1から9までの数字を一度ずつ入れます。最初から入っている数字を手がかりに推理しましょう。"
    },
    {
      question: "数独のルールは？",
      answer: "各行、各列、各3×3ブロックに1から9までの数字を重複なく入れます。"
    },
    {
      question: "数独は脳トレになりますか？",
      answer: "はい。論理的思考、記憶力、集中力を使います。定期的に遊ぶと頭を働かせる練習になります。"
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
