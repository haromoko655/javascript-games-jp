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
        <div id="secretCode" class="secret-code"></div>

        <div class="legend">
          <div class="legend-item">
            <div class="legend-pin black"></div>
            <span>色と位置が正解</span>
          </div>
          <div class="legend-item">
            <div class="legend-pin white"></div>
            <span>色は正解、位置は違う</span>
          </div>
        </div>

        <div id="board"></div>

        <div id="colorPalette" class="color-palette"></div>

        <div class="controls">
          <button class="primary" onclick="submitGuess()">予想を送信</button>
          <button class="secondary" onclick="undoLastColor()">一手戻す</button>
          <button class="secondary" onclick="clearCurrentGuess()">クリア</button>
          <button class="danger" onclick="newGame()">新しいゲーム</button>
        </div>

        <div class="stats">
          <div>予想回数： <span id="guessCount">0 / 10</span></div>
          <div>勝利： <span id="gamesWon">0</span></div>
          <div>プレイ回数： <span id="gamesPlayed">0</span></div>
          <div>勝率： <span id="winRate">0%</span></div>
        </div>

        <div id="message" class="message"></div>

        <p class="instructions">
          Crack the secret 4-color code! Click colors to build your guess, then submit.
          Black pegs mean right color in right position. White pegs mean right color in wrong position.
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
  slug: 'mastermind',
  title: 'マスターマインド - 暗号当てパズル',
  shortTitle: 'マスターマインド',
  description: '10回以内に隠された色の並びを当てましょう。ヒントを手がかりに論理的に推理します。',
  metaDescription: 'Play Mastermind online free. Guess the secret 4-color code using logic and deduction. Get feedback after each guess to crack the code in 10 tries.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '定番'],
  keywords: ['mastermind', 'code breaker', 'logic puzzle', 'deduction game', 'color code', 'brain game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "マスターマインドはどう遊びますか？",
      answer: "コンピューターが4色のコードを隠します。色を選んで予想を送ると、正しい色と位置を示す黒ピン、正しい色だが位置が違うことを示す白ピンでヒントが返ります。10回以内にコードを推理しましょう。"
    },
    {
      question: "ヒントのピンは何を表しますか？",
      answer: "黒ピンは色と位置の両方が正解、白ピンは色は正解で位置が違うことを示します。ピンがない場合、その色はコードに含まれないか、該当する色の数がすでに当たっています。どのピンがどの色を示すかは分かりません。"
    },
    {
      question: "マスターマインドのコツは？",
      answer: "最初は異なる色を使って多くの情報を集めましょう。黒ピンが2つなら、2色の位置を固定して残りを入れ替えてみます。ヒントをもとに候補を順番に絞ります。"
    },
    {
      question: "同じ色を複数回使えますか？",
      answer: "はい。同じ色が答えに複数回含まれることがあります。その可能性も考慮して推理してください。"
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
