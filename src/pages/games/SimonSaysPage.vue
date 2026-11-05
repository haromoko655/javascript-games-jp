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
        <div class="stats">
          <div>ラウンド： <span id="score">0</span></div>
          <div>ベスト： <span id="highScore">0</span></div>
        </div>

        <div class="simon-board">
          <div id="green" class="simon-btn disabled"></div>
          <div id="red" class="simon-btn disabled"></div>
          <div id="yellow" class="simon-btn disabled"></div>
          <div id="blue" class="simon-btn disabled"></div>
          <div class="center-circle">
            <span id="score-display">0</span>
          </div>
        </div>

        <div id="status" class="status">スタートを押して開始！</div>

        <div class="controls">
          <button id="startBtn" onclick="startGame()">ゲーム開始</button>
        </div>

        <p class="instructions">
          Watch the sequence of colors, then repeat it by clicking the buttons. Each round adds one more color to remember!
        </p>
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
  slug: 'simon-says',
  title: 'サイモン - 順番記憶ゲーム',
  shortTitle: 'サイモン',
  description: '光る色の順番を覚えて同じように押しましょう。ラウンドごとに色が一つ増えていきます。音付きの記憶ゲームです。',
  metaDescription: 'Play Simon Says online free. Watch and repeat the growing sequence of colors and sounds. Test your memory with this classic electronic game.',
  thumbnail: 'thumbnail.png',
  categories: ['記憶', '定番', 'チャレンジ'],
  keywords: ['simon says', 'memory game', 'sequence game', 'pattern memory', 'color game', 'brain training'],
  initCode: '',
  faqs: [
    {
      question: "サイモンはどう遊びますか？",
      answer: "光るボタンの順番を見て、同じ順番で押します。ラウンドごとに色が一つ増え、間違えるとゲーム終了です。"
    },
    {
      question: "サイモンの記録はどのくらいですか？",
      answer: "記録はバージョンによって異なりますが、熟練者は30色以上の並びを覚えることがあります。色をグループに分けたり、パターンとして覚えたりすると役立ちます。"
    },
    {
      question: "サイモンが上達するコツは？",
      answer: "色に言葉を当てたり、3〜4色ずつのまとまりで覚えたりしてみましょう。声に出したりリズムを取ったりする方法もあります。"
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
