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
        <div class="stats">
          <div>
            <div class="label">スコア</div>
            <div class="value" id="score">0</div>
          </div>
          <div>
            <div class="label">時間</div>
            <div class="value"><span id="timeLeft">30</span>秒</div>
          </div>
          <div>
            <div class="label">ベスト</div>
            <div class="value" id="highScore">0</div>
          </div>
        </div>

        <div id="moleGrid"></div>

        <div id="message" class="message"></div>

        <div class="controls">
          <button id="startBtn" onclick="startGame()">ゲーム開始</button>
        </div>

        <p class="instructions">
          Click on the moles as they pop up from their holes. You have 30 seconds to score as many points as possible. The moles get faster as you progress!
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
  slug: 'whack-a-mole',
  title: 'モグラたたき - 反射神経ゲーム',
  shortTitle: 'モグラたたき',
  description: '穴から出てくるモグラをたたきましょう。30秒間でできるだけ多く得点する定番ゲームです。',
  metaDescription: 'Play Whack-a-Mole online free. Click on moles as they pop up to score points. Classic arcade reflex game with increasing difficulty.',
  thumbnail: 'thumbnail.png',
  categories: ['反射神経', '定番', 'チャレンジ'],
  keywords: ['whack a mole', 'arcade game', 'reflex game', 'clicking game', 'speed game', 'reaction game'],
  initCode: '',
  faqs: [
    {
      question: "モグラたたきはどう遊びますか？",
      answer: "穴から出てくるモグラをクリックして得点します。制限時間は30秒です。得点が増えるほど、モグラの動きが速くなります。"
    },
    {
      question: "モグラたたきの目安スコアは？",
      answer: "初めてなら15〜20点が目安です。慣れた人は30秒で25〜35点を取ることもあります。集中して次に出る場所を予測しましょう。"
    },
    {
      question: "モグラたたきが上達するには？",
      answer: "カーソルを盤面の中央付近に置くと、どの穴にもすばやく移動できます。落ち着いて正確にクリックし、繰り返し練習しましょう。"
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
