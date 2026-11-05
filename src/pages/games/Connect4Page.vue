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
      <div id="connect4">
        <div class="box-left">
          <table id="game_board"></table>
        </div>

        <div class="box-right">
          <div id="options">
            <p class="header">難易度</p>
            <p>
              <select id="difficulty" autocomplete="off">
                <option value="1">レベル1</option>
                <option value="2">レベル2 （控えめ）</option>
                <option value="3">レベル3</option>
                <option value="4" selected="selected">レベル4 （初級）</option>
                <option value="5">レベル5</option>
                <option value="6">レベル6 （中級）</option>
                <option value="7">レベル7</option>
                <option value="8">レベル8 （上級）</option>
              </select>
            </p>
            <p><button onclick="Game.restartGame();" type="submit">ゲームをやり直す</button></p>
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
  slug: 'connect4',
  title: '無料オンライン四目並べ',
  shortTitle: '四目並べ',
  description: 'コンピューターと四目並べで対戦しましょう。7×6の盤面にコマを落とし、先に4つ並べた方が勝ちです。難易度を選べます。',
  metaDescription: 'Play Connect 4 online free against computer AI. 8 difficulty levels from beginner to expert. Classic strategy game - connect four discs to win.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '戦略', '定番'],
  keywords: ['connect 4', 'connect four', 'four in a row', 'connect 4 online', 'strategy game'],
  initCode: 'Start();',
  faqs: [
    {
      question: "四目並べはどう遊びますか？",
      answer: "交互に色付きのコマを列へ落とします。縦・横・斜めのいずれかに先に4つ並べた人が勝ちです。"
    },
    {
      question: "四目並べのコツは何ですか？",
      answer: "中央の列を押さえ、複数の勝ち筋を作りながら相手の連続を防ぎましょう。"
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
