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
        <svg class="hangman-svg" viewBox="0 0 200 250">
          <!-- Gallows -->
          <line x1="20" y1="230" x2="100" y2="230"></line>
          <line x1="60" y1="230" x2="60" y2="20"></line>
          <line x1="60" y1="20" x2="140" y2="20"></line>
          <line x1="140" y1="20" x2="140" y2="50"></line>
          <!-- Hangman parts -->
          <circle id="head" cx="140" cy="70" r="20"></circle>
          <line id="body" x1="140" y1="90" x2="140" y2="150"></line>
          <line id="leftArm" x1="140" y1="110" x2="110" y2="140"></line>
          <line id="rightArm" x1="140" y1="110" x2="170" y2="140"></line>
          <line id="leftLeg" x1="140" y1="150" x2="110" y2="190"></line>
          <line id="rightLeg" x1="140" y1="150" x2="170" y2="190"></line>
        </svg>

        <div class="hint" id="hint">カテゴリ： </div>
        <div id="wordDisplay" class="word-display"></div>
        <div id="message" class="message"></div>
        <div id="keyboard"></div>

        <div class="stats">
          <div>不正解： <span id="wrongCount">0</span>/6</div>
          <div>勝利： <span id="wins">0</span></div>
          <div>敗北： <span id="losses">0</span></div>
        </div>

        <div class="controls">
          <button onclick="newGame()">新しいゲーム</button>
        </div>

        <div class="info">ヒント：キーボードから文字を入力して答えることもできます！</div>
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
  slug: 'hangman',
  title: 'ハングマン - 単語当てゲーム',
  shortTitle: 'ハングマン',
  description: '隠された単語を一文字ずつ当てましょう。動物、国、食べ物など複数のカテゴリがあります。',
  metaDescription: 'Play Hangman online free. Guess the hidden word letter by letter before the hangman is complete. Multiple word categories for endless fun.',
  thumbnail: 'thumbnail.png',
  categories: ['言葉', '定番', '学習'],
  keywords: ['hangman', 'word game', 'guessing game', 'word puzzle', 'vocabulary game', 'spelling game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "ハングマンはどう遊びますか？",
      answer: "隠された単語を一文字ずつ当てます。正解すると文字の位置が表示され、間違えると絞首人の絵が進みます。絵が完成する前に単語を当てましょう。"
    },
    {
      question: "間違いは何回までできますか？",
      answer: "間違いは6回までです。頭、胴体、左右の腕、左右の脚の順に絵が描かれます。"
    },
    {
      question: "どんなカテゴリがありますか？",
      answer: "動物、国、食べ物、スポーツ、科学の5カテゴリです。カテゴリはヒントとして表示されます。"
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
