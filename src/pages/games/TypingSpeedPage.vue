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
      <div id="typingspeed">
        <div class="wrapper">
          <input type="text" class="input-field">
          <div class="content-box">
            <div class="typing-text">
              <p></p>
            </div>
            <div class="content">
              <ul class="result-details">
                <li class="time">残り時間： <span><b>60</b>秒</span></li>
                <li class="mistake">ミス： <span>0</span></li>
                <li class="wpm">1分あたりの単語数： <span>0</span></li>
                <li class="cpm">1分あたりの文字数： <span>0</span></li>
              </ul>
              <button>もう一度</button>
            </div>
          </div>
        </div>

        <div class="scorecard">
          <h2>スコア記録</h2>
          <div id="scorecard" class="grid">
            <div class="g-col-6">
              <table class="table" id="history">
                <thead>
                  <tr>
                    <th></th>
                    <th>語/分</th>
                    <th>字/分</th>
                    <th>ミス</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="g-col-6" id="chart">
              <div class="grid">
                <div id="wpm" class="g-col-4"></div>
                <div id="cpm" class="g-col-4"></div>
                <div id="mistakes" class="g-col-4"></div>
              </div>
            </div>
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
  slug: 'typing-speed',
  title: 'タイピング速度テスト',
  shortTitle: 'タイピングテスト',
  description: 'タイピングの速さと正確さを測定しましょう。60秒間で1分あたりの入力語数（WPM）と文字数（CPM）を計測します。',
  metaDescription: 'Free online typing speed test. Measure your WPM and accuracy in 60 seconds. Track your progress and improve your typing skills.',
  thumbnail: 'thumbnail.png',
  categories: ['チャレンジ', '学習', 'スキル'],
  keywords: ['typing test', 'typing speed', 'wpm test', 'typing practice', 'keyboard speed'],
  initCode: 'const game = new TypingGame();',
  extraScripts: ['https://unpkg.com/txtgen/dist/txtgen.min.js'],
  faqs: [
    {
      question: "タイピング速度はどのくらいが目安ですか？",
      answer: "平均的な入力速度は1分あたり約40語（WPM）です。60〜70 WPMなら速い方で、熟練者は80〜100 WPMを超えることもあります。"
    },
    {
      question: "タイピングを速くするには？",
      answer: "定期的に練習し、指を正しい位置に置き、キーボードではなく画面を見ましょう。速度より正確さを優先すると上達しやすくなります。"
    }
  ]
}

const breadcrumbItems = [
  { name: 'ホーム', path: '/' },
  { name: 'ゲーム一覧', path: '/' },
  { name: game.shortTitle || game.title, path: `/posts/${game.slug}/` }
]

useGameLoader(game.slug, game.initCode, game.extraScripts)
useGameSeo(game)
</script>

<style scoped>
h1 { font-weight: 400; }
.game-section { min-height: 400px; }
</style>
