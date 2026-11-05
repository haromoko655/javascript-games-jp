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
      <div class="game-container">
        <div class="controls">
          <select id="levelSelect" class="level-select" onchange="changeLevel()">
            <option value="1">初級（3×4）</option>
            <option value="2">中級（4×4）</option>
            <option value="3">上級（4×5）</option>
            <option value="4">エキスパート（5×6）</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
        </div>
        <div class="stats">
          <div>手数： <span id="moveCount">0</span></div>
          <div>時間： <span id="timer">00:00</span></div>
          <div>ベスト： <span id="bestScore">-</span></div>
        </div>
        <div id="winner" class="winner"></div>
        <div class="board"></div>
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
  slug: 'memory-match',
  title: '神経衰弱 - カード合わせ',
  shortTitle: '神経衰弱',
  description: 'カードをめくって同じ絵柄のペアを見つけましょう。盤面サイズを選んで記憶力に挑戦できます。',
  metaDescription: 'Play Memory Match online free. Flip cards to find matching pairs in this classic concentration game. 4 difficulty levels to challenge your memory skills.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '記憶', '定番'],
  keywords: ['memory game', 'matching game', 'concentration game', 'card matching', 'memory training', 'brain game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "神経衰弱はどう遊びますか？",
      answer: "カードをクリックしてめくり、絵柄を確認します。同じ絵柄の2枚を見つけると、そのカードは表向きのままになります。すべてのペアを見つけましょう。"
    },
    {
      question: "神経衰弱のコツはありますか？",
      answer: "カードを順番にめくって位置を覚えましょう。ペア探し以外でめくったカードもよく見て、場所を記憶しておくことが大切です。"
    },
    {
      question: "神経衰弱でどんな力を使いますか？",
      answer: "短期記憶、集中力、視覚的な認識力を使います。繰り返し遊ぶことで、情報を覚えて思い出す練習になります。"
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
