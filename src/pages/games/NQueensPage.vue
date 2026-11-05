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
        <div class="level-select">
          <button onclick="setLevel(4)">4×4</button>
          <button onclick="setLevel(5)">5×5</button>
          <button onclick="setLevel(6)">6×6</button>
          <button onclick="setLevel(8)">8×8</button>
          <button onclick="setLevel(9)">9×9</button>
          <button onclick="setLevel(10)">10×10</button>
          <button onclick="setLevel(11)">11×11</button>
          <button onclick="setLevel(12)">12×12</button>
        </div>

        <div class="queen-count" id="queenCount"></div>
        <div class="board" id="board"></div>

        <div class="controls">
          <button onclick="getHint()">ヒント</button>
          <button onclick="checkSolution()">答え合わせ</button>
          <button onclick="resetPuzzle()">リセット</button>
        </div>

        <div class="status" id="status"></div>
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
  slug: 'n-queens',
  title: 'Nクイーン - チェスの論理パズル',
  shortTitle: 'Nクイーン',
  description: 'N×Nの盤面に、互いに取られないようN個のクイーンを配置しましょう。4×4から12×12まで挑戦できます。',
  metaDescription: 'Play the N-Queens puzzle online. Place queens on a chessboard without them threatening each other. Classic computer science puzzle game.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', 'チェス', '論理'],
  keywords: ['n queens', 'eight queens', 'chess puzzle', 'queen placement', 'logic puzzle'],
  initCode: 'initializePuzzle();',
  faqs: [
    {
      question: "Nクイーン問題とは何ですか？",
      answer: "N×Nのチェス盤にN個のクイーンを置き、どの2つも互いに取り合わないようにするパズルです。クイーンは縦・横・斜めに動けます。"
    },
    {
      question: "8クイーン問題には何通りの解がありますか？",
      answer: "対称形を別々に数えると、異なる解は92通りです。対称性をまとめると、基本形は12通りです。"
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
