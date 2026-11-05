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
      <div id="game_main_container">
        <div class="puzzle-info">
          <div class="puzzle-preview">
            <h3>お題の形</h3>
            <canvas id="puzzleCanvas" width="200" height="200"></canvas>
          </div>
          <div class="puzzle-details">
            <h2 id="puzzleName">四角形</h2>
            <span class="difficulty" id="puzzleDifficulty">初級</span>
            <div class="stats">
              Completed: <span id="completedCount">0</span> / <span id="totalPuzzles">10</span>
            </div>
          </div>
        </div>

        <canvas id="gameCanvas" width="500" height="500"></canvas>

        <div class="controls">
          <div class="control-group">
            <button onclick="prevPuzzle()" class="btn-nav" title="前の問題">
              <i class="bi bi-chevron-left"></i> 前の面
            </button>
            <button onclick="nextPuzzle()" class="btn-nav" title="次の問題">
              次の面 <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div class="control-group">
            <button onclick="rotateCCW()" class="btn-rotate" title="反時計回りに回転（E）">
              <i class="bi bi-arrow-counterclockwise"></i>
            </button>
            <button onclick="rotateCW()" class="btn-rotate" title="時計回りに回転（R）">
              <i class="bi bi-arrow-clockwise"></i>
            </button>
            <button onclick="flip()" class="btn-flip" title="平行四辺形を反転（F）">
              <i class="bi bi-symmetry-horizontal"></i> Flip
            </button>
          </div>
          <div class="control-group">
            <button onclick="shufflePieces()" class="btn-action" title="すべてのピースをシャッフル">
              <i class="bi bi-shuffle"></i> シャッフル
            </button>
            <button onclick="resetCurrentPuzzle()" class="btn-reset" title="ピースを初期配置に戻す">
              <i class="bi bi-arrow-repeat"></i> リセット
            </button>
          </div>
          <div class="control-group">
            <button onclick="markComplete()" class="btn-complete" title="パズルを完成にする">
              <i class="bi bi-check-lg"></i> 完了
            </button>
          </div>
        </div>

        <div class="instructions">
          <h4>遊び方</h4>
          <ul>
            <li><strong>ドラッグ</strong> して配置します</li>
            <li><strong>ピースをクリック</strong> して選択し、 <kbd>R</kbd>/<kbd>E</kbd>キーで回転します</li>
            <li><kbd>F</kbd>キーで平行四辺形（ピンクのピース）を反転します</li>
            <li>7つのピースを並べてお題のシルエットを完成させます</li>
            <li>クリック <strong>完了</strong> するとパズルが完成します</li>
          </ul>
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
  slug: 'tangram',
  title: 'タングラム - シルエットパズル',
  shortTitle: 'タングラム',
  description: '7つのピースを動かし、回転・反転させてシルエットに合わせましょう。昔から親しまれている図形パズルです。',
  metaDescription: 'Play free Tangram puzzles online. Arrange 7 geometric shapes to match silhouettes. Classic Chinese dissection puzzle with multiple difficulty levels.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '図形', '定番'],
  keywords: ['tangram', 'tangram puzzle', 'shape puzzle', 'chinese puzzle', 'geometric puzzle', 'tangram online', 'brain teaser'],
  initCode: 'initGame();',
  faqs: [
    {
      question: "タングラムとは何ですか？",
      answer: "7枚の平たいピースを組み合わせて形を作る、中国発祥のパズルです。すべてのピースを重ねずに使い、シルエットと同じ形を作ります。"
    },
    {
      question: "タングラムの7つのピースは何ですか？",
      answer: "大きな三角形が2枚、中くらいの三角形が1枚、小さな三角形が2枚、正方形が1枚、平行四辺形が1枚です。組み合わせてさまざまな形を作れます。"
    },
    {
      question: "このゲームでピースを回転するには？",
      answer: "ピースをクリックして選び、Rキーで時計回り、Eキーで反時計回りに回転します。画面上の回転ボタンも使えます。45度ずつ回転します。"
    },
    {
      question: "タングラムのピースは反転できますか？",
      answer: "反転できるのはピンクの平行四辺形だけです。選択してFキー、または反転ボタンを押してください。"
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
