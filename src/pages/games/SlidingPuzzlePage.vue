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
            <option value="1">レベル1（3×3）</option>
            <option value="2">レベル2（3×4）</option>
            <option value="3">レベル3（4×4）</option>
            <option value="4">レベル4（4×5）</option>
            <option value="5">レベル5（5×5）</option>
            <option value="6">レベル6（5×6）</option>
            <option value="7">レベル7（6×6）</option>
            <option value="8">レベル8（6×7）</option>
            <option value="9">レベル9（7×7）</option>
            <option value="10">レベル10（7×8）</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
          <button onclick="shuffleBoard()">シャッフル</button>
          <button onclick="startSolving()" class="solve" id="solveButton">自動で解く</button>
        </div>
        <div class="stats">
          <div>手数： <span id="moveCount">0</span></div>
          <div>ベストスコア： <span id="bestScore">-</span></div>
        </div>
        <div id="solvingStatus" class="solving-status" style="display: none;">パズルを解いています…</div>
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
  slug: 'sliding-puzzle',
  title: 'スライドパズル - 数字を並べよう',
  shortTitle: 'スライドパズル',
  description: '数字のタイルをスライドさせて順番に並べましょう。3×3から7×8までの盤面を選べます。解答例の表示機能もあります。',
  metaDescription: 'Play sliding tile puzzles online free. Arrange numbered tiles in order by sliding them. 10 difficulty levels with AI solver. Classic 15 puzzle.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理'],
  keywords: ['sliding puzzle', '15 puzzle', 'tile puzzle', 'number puzzle', 'sliding tile game'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "スライドパズルはどう解きますか？",
      answer: "タイルを空きマスへ動かして、数字の順に並べます。まず一番上の段をそろえ、次に下の段へ進むと解きやすくなります。"
    },
    {
      question: "15パズルとは何ですか？",
      answer: "4×4の盤面にある15枚の数字タイルを、1から15の順に並べる定番のスライドパズルです。"
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
