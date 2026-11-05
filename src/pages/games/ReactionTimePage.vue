<template>
  <article class="container py-4" iteミリ秒cope itemtype="https://schema.org/VideoGame">
    <Breadcrumb :iteミリ秒="breadcrumbIteミリ秒" />

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
        <div id="reactionBox" class="reaction-box waiting">
          <div id="message" class="message">クリックして開始</div>
          <div id="resultText" class="result-text"></div>
        </div>

        <div class="stats">
          <div>
            <div class="label">試行回数</div>
            <div class="value" id="attempts">0</div>
          </div>
          <div>
            <div class="label">平均</div>
            <div class="value" id="average">-</div>
          </div>
          <div>
            <div class="label">ベスト</div>
            <div class="value" id="best">-</div>
          </div>
        </div>

        <div class="controls">
          <button onclick="resetGame()">記録をリセット</button>
        </div>

        <div class="scale">
          <div class="scale-item">
            <div class="time-range">&lt;200ミリ秒</div>
            <div>すばらしい</div>
          </div>
          <div class="scale-item">
            <div class="time-range">200-250ミリ秒</div>
            <div>すごい</div>
          </div>
          <div class="scale-item">
            <div class="time-range">250-350ミリ秒</div>
            <div>良好</div>
          </div>
          <div class="scale-item">
            <div class="time-range">&gt;350ミリ秒</div>
            <div>平均</div>
          </div>
        </div>

        <p class="instructions">
          ボックスをクリックして開始します。<strong>赤</strong>になったら待ちます。
          <strong>緑</strong>に変わったらできるだけ速くクリックしてください！
          早くクリックしすぎると、やり直しになります。
        </p>
      </div>
    </section>

    <GameFaqs :faqs="game.faqs" />
    <RelatedGames :currentSlug="game.slug" :categories="game.categories" />

    <meta itemprop="url" :content="`https://haromoko655.github.io/javascript-games-jp/posts/${game.slug}/`">
    <meta itemprop="image" :content="`https://haromoko655.github.io/javascript-games-jp/posts/${game.slug}/thumbnail.png`">
    <meta itemprop="applicationCategory" content="Game">
    <meta itemprop="operatingSystem" content="Web Browser">
    <span itemprop="offers" iteミリ秒cope itemtype="https://schema.org/Offer" style="display:none">
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
  slug: 'reaction-time',
  title: '反応速度テスト - 反射神経に挑戦',
  shortTitle: '反応速度テスト',
  description: '画面が緑色に変わったら、できるだけ速くクリックしましょう。平均と最速の反応時間を記録します。',
  metaDescription: 'Test your reaction time online free. Wait for green, then click as fast as possible. Measure your reflexes in milliseconds and track your best time.',
  thumbnail: 'thumbnail.png',
  categories: ['チャレンジ', '反射神経', 'スキル'],
  keywords: ['reaction time', 'reflex test', 'reaction test', 'speed test', 'reflexes', 'brain game'],
  initCode: '',
  faqs: [
    {
      question: "反応速度の目安はどのくらいですか？",
      answer: "人の平均反応時間は約250〜300ミリ秒です。200ミリ秒未満なら非常に速いと言えます。プロのゲーマーやアスリートは150〜200ミリ秒ほどの場合があります。"
    },
    {
      question: "反応速度を上げるには？",
      answer: "繰り返し練習することが役立ちます。十分な睡眠と水分をとり、気が散るものを減らしましょう。アクションゲームが反応時間に良い影響を与えるという研究もあります。"
    },
    {
      question: "反応時間に差が出るのはなぜですか？",
      answer: "年齢、疲労、カフェイン、時間帯など多くの要因が影響します。視覚への反応は聴覚への反応より速い傾向があります。このテストを練習することで記録が伸びる場合もあります。"
    }
  ]
}

const breadcrumbIteミリ秒 = [
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
