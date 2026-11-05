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
      <div class="container">
        <div class="board" id="board"></div>
        <div class="controls">
          <button onclick="resetGame()">新しいゲーム</button>
          <button onclick="showHint()">ヒントを表示</button>
        </div>

        <div class="status" id="status"></div>

        <div class="best-scores">
          <h3>ベストスコア</h3>
          <div id="bestScores"></div>
        </div>
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
  slug: 'knights-tour',
  title: "Knight's Tour Puzzle - Chess Movement Game",
  shortTitle: "Knight's Tour",
  description: "Move a chess knight to visit every square exactly once. Classic mathematical puzzle with hints available.",
  metaDescription: "Play the Knight's Tour puzzle online. Move a chess knight to visit every square on the board exactly once. Classic Hamiltonian path puzzle.",
  thumbnail: 'thumbnail.png',
  categories: ['パズル', 'チェス', '数学'],
  keywords: ['knights tour', 'chess puzzle', 'knight moves', 'hamiltonian path', 'chess game'],
  initCode: 'initializeGame();',
  faqs: [
    {
      question: "ナイトツアーとは何ですか？",
      answer: "チェスのナイトを動かし、盤面のすべてのマスを一度ずつ訪れるパズルです。ナイトは一方向に2マス、その直角方向に1マス進みます。"
    },
    {
      question: "ナイトツアーは必ず解けますか？",
      answer: "標準的な8×8盤面では、どのマスから始めても解があります。小さな盤面では、開始位置によって解けない場合があります。"
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
