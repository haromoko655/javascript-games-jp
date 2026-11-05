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
          <select id="difficultySelect" class="difficulty-select" onchange="changeDifficulty()">
            <option value="4">4桁（標準）</option>
            <option value="5">5桁（上級）</option>
            <option value="6">6桁（エキスパート）</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
        </div>

        <div class="stats">
          <span id="guessCount">予想回数： 0/10</span>
        </div>

        <div id="message" class="message"></div>

        <div class="input-section">
          <input type="text" id="guessInput" placeholder="異なる4桁の数字を入力" maxlength="4" autocomplete="off">
          <button id="guessBtn" onclick="makeGuess()">予想する</button>
        </div>

        <div id="guessHistory" class="guess-history"></div>

        <div class="legend">
          <h4>遊び方</h4>
          <p><span class="bull-icon">🎯</span> <strong>ブル：</strong> 数字と位置が正解</p>
          <p><span class="cow-icon">🐄</span> <strong>カウ：</strong> 数字は正解、位置は違う</p>
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
  slug: 'bulls-and-cows',
  title: 'ブルズ＆カウズ - 数字当てゲーム',
  shortTitle: 'ブルズ＆カウズ',
  description: '推理して隠された数字を当てましょう。ブルは数字と位置が正解、カウは数字のみ正解を表します。',
  metaDescription: 'Play Bulls and Cows online free. Guess the secret number using logic. Bulls indicate correct digits in correct positions, cows indicate correct digits in wrong positions.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '数字'],
  keywords: ['bulls and cows', 'number guessing game', 'logic puzzle', 'deduction game', 'code breaking', 'brain game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "ブルズ＆カウズはどう遊びますか？",
      answer: "隠された数字を推理して当てます。ブルは数字と位置の両方が正解、カウは数字は含まれるものの位置が違うことを示します。ヒントを使って候補を絞りましょう。"
    },
    {
      question: "ブルズ＆カウズのルールは？",
      answer: "答えの数字に同じ数字は使われず、先頭は0になりません。同じ条件の数字を10回以内に当ててください。予想するたびにブルとカウの数が表示されます。"
    },
    {
      question: "ブルズ＆カウズのコツはありますか？",
      answer: "まず「1234」のように幅広い数字を使って、答えに含まれる数字を探しましょう。ブルとカウの数を記録し、正しい数字が分かったら位置を入れ替えて確かめます。"
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
