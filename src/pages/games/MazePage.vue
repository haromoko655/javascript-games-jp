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
      <div class="maze">
        <div class="game-container">
          <div class="controls">
            <select id="mazeSize">
              <option value="11">10×10</option>
              <option value="21">20×20</option>
              <option value="31">30×30</option>
              <option value="41">40×40</option>
              <option value="51">50×50</option>
              <option value="61">60×60</option>
              <option value="71">70×70</option>
              <option value="81">80×80</option>
              <option value="91">90×90</option>
            </select>
            <button onclick="generateNewMaze()">迷路を作り直す</button>
            <button onclick="resetPlayer()">スタート地点に戻す</button>
          </div>
          <canvas id="mazeCanvas"></canvas>
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
  slug: 'maze',
  title: 'オンライン迷路ゲーム',
  shortTitle: '迷路',
  description: '自動生成される迷路をキーボードで進みましょう。10×10から90×90まで、サイズを選んで挑戦できます。',
  metaDescription: 'Play free online maze games with adjustable difficulty. Navigate through randomly generated mazes from 10×10 to 90x90. arrow keysまたはWASD to play.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '迷路'],
  keywords: ['maze game', 'online maze', 'puzzle maze', 'labyrinth game', 'maze solver'],
  initCode: 'generateNewMaze();',
  faqs: [
    {
      question: "迷路ゲームはどう遊びますか？",
      answer: "矢印キーまたはWASDキーで赤いマスを動かし、スタートから緑の出口を目指します。"
    },
    {
      question: "迷路のサイズは選べますか？",
      answer: "10×10から90×90まで選べます。大きい迷路ほど難しく、解くのに時間がかかります。"
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
