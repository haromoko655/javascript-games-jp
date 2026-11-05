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
      <div class="game-container word-search-game">
        <div class="puzzle-toolbar">
          <p id="wordSearchProgress" class="mb-0">問題を読み込んでいます…</p>
          <button id="newPuzzle" type="button">新しい問題</button>
        </div>
        <p id="wordSearchInstructions" class="game-instructions">
          Select the first and last letter of a word,またはdrag with a mouse.
          With a keyboard, use arrow keysで移動します, EnterまたはSpace to select each end, and Escape to cancel.
          Scroll within larger boards to see every letter.
        </p>
        <div class="board-scroll" role="region" aria-label="スクロール可能なワードサーチ盤面">
          <div id="grid" class="grid" role="grid" aria-label="ワードサーチの文字盤" aria-describedby="wordSearchInstructions"></div>
        </div>
        <p id="wordSearchStatus" class="puzzle-status" role="status" aria-live="polite" aria-atomic="true"></p>
        <section aria-labelledby="wordsHeading" class="puzzle-options">
          <h2 id="wordsHeading">探す単語</h2>
          <ul id="wordList" class="word-list"></ul>
        </section>
        <div class="puzzle-options">
          <h2 id="sizeHeading">盤面サイズ</h2>
          <div id="gridSize" class="option-buttons" role="group" aria-labelledby="sizeHeading"></div>
        </div>
        <div class="puzzle-options">
          <h2 id="categoryHeading">カテゴリ</h2>
          <div id="categoryButtons" class="option-buttons" role="group" aria-labelledby="categoryHeading"></div>
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
  slug: 'word-search',
  title: 'ワードサーチ - 隠れた言葉を探そう',
  shortTitle: 'ワードサーチ',
  description: '文字の中から隠れた単語を探しましょう。単語は縦・横・斜め・逆向きに並びます。カテゴリや盤面サイズを選べます。',
  metaDescription: 'Play free word search puzzles online. Find hidden words in letter grids with multiple categories. Great for vocabulary and brain training.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '言葉', '学習'],
  keywords: ['word search', 'word find', 'word puzzle', 'hidden words', 'word search puzzle'],
  initCode: 'const game = new WordSearchGame(); game.newGame(); return () => game.destroy();',
  faqs: [
    {
      question: "ワードサーチはどう遊びますか？",
      answer: "一覧にある単語を文字の盤面から探します。単語は横・縦・斜め、または逆向きに隠れています。最初と最後の文字を選ぶか、マウスでドラッグしてください。キーボードでは矢印キーとEnterキーが使えます。"
    },
    {
      question: "ワードサーチは脳トレになりますか？",
      answer: "語彙、パターン認識、集中力を使います。幅広い年齢の方が楽しめるパズルです。"
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
