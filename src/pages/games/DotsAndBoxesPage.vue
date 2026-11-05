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

    <section id="game_main_container" class="game-section" aria-label="ゲームエリア">
      <div class="game-container">
        <div class="controls">
          <select id="gridSizeSelect" class="grid-select" onchange="changeGridSize()">
            <option value="3">3×3（四角形2×2個）</option>
            <option value="4" selected>4×4（四角形3×3個）</option>
            <option value="5">5×5（四角形4×4個）</option>
            <option value="6">6×6（四角形5×5個）</option>
          </select>
          <select id="difficultySelect" class="difficulty-select" onchange="changeDifficulty()">
            <option value="easy">初級</option>
            <option value="medium" selected>中級</option>
            <option value="hard">上級</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
        </div>

        <div id="gameStatus" class="game-status">あなたの番です - 線を引いてください</div>

        <div class="score-board">
          <div class="score-item player-1">
            <div class="score-label">あなた</div>
            <div class="score-value" id="playerScore">0</div>
          </div>
          <div class="score-item player-2">
            <div class="score-label">コンピューター</div>
            <div class="score-value" id="aiScore">0</div>
          </div>
        </div>

        <div id="gameBoard"></div>

        <div class="legend">
          <div class="legend-item">
            <div class="legend-color player-1"></div>
            <span>あなたの四角形</span>
          </div>
          <div class="legend-item">
            <div class="legend-color player-2"></div>
            <span>相手の四角形</span>
          </div>
        </div>

        <div class="rules">
          <h4>遊び方</h4>
          <ul>
            <li>隣り合う2つの点の間をクリックして線を引きます</li>
            <li>4辺目を引いて四角形を完成させると獲得できます</li>
            <li>四角形を完成させると、もう一度手番があります</li>
            <li>最後に四角形を多く獲得した人の勝ちです</li>
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
  slug: 'dots-and-boxes',
  title: '点と箱 - 線をつないで陣取り',
  shortTitle: '点と箱',
  description: 'コンピューターと点と箱で対戦しましょう。点を線で結んで四角を完成させ、得点を競う定番ゲームです。',
  metaDescription: 'Play Dots and Boxes online free against AI. Draw lines between dots to complete squares. Classic strategy game with multiple grid sizes and difficulty levels.',
  thumbnail: 'thumbnail.png',
  categories: ['戦略', '定番', 'パズル'],
  keywords: ['dots and boxes', 'connect the dots', 'squares game', 'pencil paper game', 'strategy game', 'two player game', 'classic game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "点と箱はどう遊びますか？",
      answer: "点が並んだ盤面で、隣り合う点を交互に線で結びます。四角形の4辺目を引くとその四角形を獲得し、もう一度手番があります。盤面が埋まったとき、獲得数が多い人の勝ちです。"
    },
    {
      question: "点と箱のコツは何ですか？",
      answer: "四角形の3辺目を不用意に引くと、相手に完成させられてしまいます。複数の四角形を連続して取れるよう、線を引く順番を考えましょう。"
    },
    {
      question: "難易度の違いは何ですか？",
      answer: "初級のコンピューターはランダムに線を引きます。中級は取れる四角形を優先します。上級は相手に四角形を渡さない手や、連続して取れる形を考えます。"
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
