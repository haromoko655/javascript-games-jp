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
            <option value="1">3×3（初級）</option>
            <option value="2">4×4（中級）</option>
            <option value="3" selected>5×5（標準）</option>
            <option value="4">6×6（上級）</option>
            <option value="5">7×7（エキスパート）</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
        </div>

        <div class="stats">
          <div>手数： <span id="moveCount">0</span></div>
          <div>点灯中： <span id="lightsOn">0</span></div>
          <div>ベスト： <span id="bestScore">-</span></div>
        </div>

        <div id="board"></div>
        <div id="message" class="message"></div>

        <p class="instructions">
          Click a light to toggle it and its neighbors. Turn off all lights to win!
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
  slug: 'lights-out',
  title: 'ライツアウト - 明かりを消そう',
  shortTitle: 'ライツアウト',
  description: 'ライトを押してすべて消しましょう。押したライトと上下左右のライトが切り替わります。盤面サイズを選べる論理パズルです。',
  metaDescription: 'Play Lights Out puzzle online free. Click lights to toggle them and their neighbors. Turn off all lights to win this classic logic puzzle game.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理'],
  keywords: ['lights out', 'logic puzzle', 'toggle puzzle', 'brain teaser', 'puzzle game', 'light puzzle'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "ライツアウトはどう遊びますか？",
      answer: "ライトを押して、盤面のライトをすべて消します。押したライトと上下左右に隣接するライトが切り替わります。"
    },
    {
      question: "すべてのライツアウト問題は解けますか？",
      answer: "このゲームの問題は、解けた状態から有効な手をランダムに加えて作られるため、必ず解けます。"
    },
    {
      question: "ライツアウトのコツは何ですか？",
      answer: "上の段から順に消していく方法があります。次の段のライトを押し、上の段を消してから同じ手順で下へ進みます。"
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
