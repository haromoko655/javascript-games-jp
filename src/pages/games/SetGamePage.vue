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
      <div id="game_main_container" class="game-container">
        <div class="controls">
          <button onclick="newGame()">新しいゲーム</button>
          <button onclick="addCards()">カードを追加（+3）</button>
          <button onclick="showHint()">ヒント</button>
        </div>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">見つけたセット： </span>
            <span class="stat-value" id="setsFound">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">時間： </span>
            <span class="stat-value" id="timer">00:00</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">残りカード： </span>
            <span class="stat-value" id="cardsLeft">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">見つかるセット： </span>
            <span class="stat-value" id="setsAvailable">0</span>
          </div>
        </div>
        <div id="board"></div>
      </div>
    </section>

    <div class="instructions">
      <h2>遊び方</h2>
      <ol>
        <li>条件に合う3枚のカードを見つけます： <strong>セット</strong></li>
        <li>カード3枚の形・色・塗り・数の各特徴が <strong>すべて同じ</strong>または<strong>すべて異なる</strong>、3枚すべてで成り立つ必要があります</li>
        <li>カードを3枚選びます。正しいセットなら新しいカードに入れ替わります</li>
        <li>セットが見つからない場合は「カードを追加」を押し、カードを3枚増やします</li>
        <li>困ったときは「ヒント」を押すと、正しいセットが一時的に強調表示されます</li>
      </ol>
      <p><strong>カードの特徴：</strong></p>
      <ul>
        <li><strong>形：</strong> ダイヤ、楕円、波形</li>
        <li><strong>色：</strong> 赤、緑、紫</li>
        <li><strong>塗り：</strong> 塗りつぶし、縞模様、空白</li>
        <li><strong>枚数：</strong> 1個、2個、または3個</li>
      </ul>
    </div>

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
  slug: 'set-game',
  title: 'セット - カードの組み合わせ探し',
  shortTitle: 'セット',
  description: '各特徴がすべて同じか、すべて異なるカード3枚の組み合わせを探しましょう。パターン認識を鍛えるパズルです。',
  metaDescription: 'Play Set Game online free. Find valid sets of three cards based on shape, color, fill, and count. A classic pattern recognition puzzle that challenges your brain.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '図形'],
  keywords: ['set game', 'card game', 'pattern recognition', 'logic puzzle', 'brain game', 'visual puzzle', 'matching game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "セットゲームで有効なセットとは？",
      answer: "カード3枚の形・色・塗り・数の4つの特徴それぞれが、すべて同じか、すべて異なる組み合わせです。たとえば形・色・塗りがすべて異なり、数だけ同じカード3枚は有効なセットです。"
    },
    {
      question: "セットのカードにはどんな特徴がありますか？",
      answer: "各カードには形（ダイヤ・楕円・波形）、色（赤・緑・紫）、塗り（塗りつぶし・縞模様・空白）、数（1〜3個）の4つの特徴があります。各特徴に3通りあるため、カードは全部で81種類です。"
    },
    {
      question: "セットを見つけるコツは？",
      answer: "まず一つの特徴に注目します。二つの特徴が同じカードを見つけ、3枚目でセットになるか確かめましょう。4つの特徴を素早く見比べる練習をすると、見つけやすくなります。"
    },
    {
      question: "盤面にセットがない場合は？",
      answer: "表示中のカードに有効なセットがない場合は、「カードを追加」を押して3枚増やしてください。ゲーム開始時には必ずセットがありますが、セットを見つけるうちに盤面からなくなることがあります。"
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
