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
      <div class="sokoban" id="game_main_container">
        <div class="game-container">
          <div id="levelName">レベル1：チュートリアル</div>

          <div class="controls">
            <select id="levelSelect" onchange="selectLevel()"></select>
            <button onclick="prevLevel()" class="secondary">&lt; 前の面</button>
            <button onclick="nextLevel()" class="secondary">次の面 &gt;</button>
            <button onclick="restartLevel()" class="warning">やり直す</button>
            <button onclick="undoMove()">一手戻す（U）</button>
          </div>

          <div class="stats">
            <span>手数： <strong id="moves">0</strong></span>
            <span>押した回数： <strong id="pushes">0</strong></span>
          </div>

          <canvas id="sokobanCanvas"></canvas>

          <div class="mobile-controls">
            <div class="row">
              <button onclick="sokobanMove(0, -1)">&#9650;</button>
            </div>
            <div class="row">
              <button onclick="sokobanMove(-1, 0)">&#9664;</button>
              <button onclick="sokobanMove(0, 1)">&#9660;</button>
              <button onclick="sokobanMove(1, 0)">&#9654;</button>
            </div>
          </div>

          <div class="instructions">
            <h4>遊び方</h4>
            <ul>
              <li>すべての箱（茶色のマス）を目的地（赤い丸）まで押します</li>
              <li><strong>矢印キー</strong>または<strong>WASD</strong>キーで移動します</li>
              <li><strong>U</strong>キーまたは<strong>Ctrl+Z</strong>で一手戻します</li>
              <li><strong>R</strong>キーで面をやり直します</li>
              <li>箱が目的地に乗ると緑色になります</li>
            </ul>
          </div>
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
  slug: 'sokoban',
  title: '倉庫番 - 箱押しパズル',
  shortTitle: '倉庫番',
  description: '箱を押してすべての目的地に運ぶ、日本生まれの定番パズルです。隅に押し込むと戻せないので、手順をよく考えましょう。',
  metaDescription: 'Play Sokoban online for free. Push boxes to target spots in this classic puzzle game. 10 levels from easy to challenging. arrow keysまたはWASD to play.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '定番'],
  keywords: ['sokoban', 'box pushing game', 'puzzle game', 'logic puzzle', 'warehouse keeper', 'sokoban online', 'free sokoban'],
  initCode: 'initSokoban();',
  faqs: [
    {
      question: "倉庫番はどう遊びますか？",
      answer: "矢印キーまたはWASDキーで青いプレイヤーを動かし、箱を押して目的地へ運びます。箱を引くことはできません。隅に押した箱は戻せないため、手順をよく考えましょう。"
    },
    {
      question: "行き詰まったらどうすればよいですか？",
      answer: "UキーまたはCtrl+Zで手を戻すか、Rキーで面をやり直せます。一手戻す機能では、過去の手を順に戻せます。"
    },
    {
      question: "何面ありますか？",
      answer: "チュートリアルから難しい問題まで、全10面あります。進むにつれて計画性と戦略が必要になります。"
    },
    {
      question: "「倉庫番」とはどういう意味ですか？",
      answer: "「倉庫番」は箱を運ぶ人を意味します。ゲームは1981年に今林宏行氏が制作し、世界中で親しまれるパズルになりました。"
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
