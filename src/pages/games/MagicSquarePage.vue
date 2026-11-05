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
        <button class="easy" onclick="setDifficulty(3)">初級（3×3）</button>
        <button class="medium" onclick="setDifficulty(4)">中級（4×4）</button>
        <button class="hard" onclick="setDifficulty(5)">上級（5×5）</button>
        <button class="new-game" onclick="initGame()">新しいゲーム</button>
        <button class="hint" onclick="giveHint()">ヒント</button>
        <button class="solve" onclick="solve()">解く</button>
      </div>
      <h3>魔方陣の合計：<span id="magic-sum">0</span></h3>
      <div id="status" class="status"></div>

      <div class="align-center">
        <div id="game-board" class="game-board"></div>
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
  slug: 'magicsquare',
  title: '魔方陣 - 数字パズル',
  shortTitle: '魔方陣',
  description: '縦・横・対角線の合計がすべて同じになるように数字を配置しましょう。計算力を試せるパズルです。',
  metaDescription: 'Play Magic 四角形 puzzles online. Arrange numbers so all rows, columns, and diagonals have the same sum. Fun math brain training game.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '数学', '学習'],
  keywords: ['magic square', 'math puzzle', 'number puzzle', 'magic square solver', 'math game'],
  initCode: 'initGame();',
  faqs: [
    {
      question: "魔方陣とは何ですか？",
      answer: "縦・横・対角線の数字の合計がすべて同じになるように並べるパズルです。この共通の合計を「魔法定数」と呼びます。"
    },
    {
      question: "魔法定数はどう計算しますか？",
      answer: "1からn²までの数字を使うn×nの魔方陣では、魔法定数は n(n²+1)/2 です。3×3の場合は15です。"
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
