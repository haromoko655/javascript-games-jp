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
      <div class="binary-puzzle">
        <div class="difficulty-controls">
          <button class="difficulty easy selected" onclick="setDifficulty('easy')">初級（6×6）</button>
          <button class="difficulty medium" onclick="setDifficulty('medium')">中級（8×8）</button>
          <button class="difficulty hard" onclick="setDifficulty('hard')">上級（10×10）</button>
        </div>
        <div class="timer" id="timer">00:00</div>
        <div class="controls">
          <button onclick="newGame()">新しいゲーム</button>
        </div>
        <div class="grid" id="grid"></div>
        <div class="message" id="message"></div>
        <div class="rules">
          <h3>ルール</h3>
          <ul>
            <li>マスを0または1で埋めます</li>
            <li>各行・各列で0と1の数を同じにします</li>
            <li>行・列に同じ数字が3つ連続してはいけません</li>
            <li>各行と各列の並びはそれぞれ異なる必要があります</li>
            <li>マスをクリックすると空欄 → 0 → 1 → 空欄の順に切り替わります</li>
          </ul>
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
  slug: 'binary-puzzle',
  title: 'バイナリパズル（タクズ）',
  shortTitle: 'バイナリパズル',
  description: '0と1をルールに沿ってマスに埋める無料パズルです。論理的に考えて盤面を完成させましょう。',
  metaDescription: 'Play free Binary Puzzle (Takuzu) online. Fill grids with 0s and 1s - no three consecutive same digits, equal counts per row/column, unique rows and columns. Multiple sizes available.',
  thumbnail: 'thumbnail.png',
  categories: ['パズル', '論理', '数字'],
  keywords: ['binary puzzle', 'takuzu', 'binairo', '0 and 1 puzzle', 'logic puzzle', 'brain game', 'number puzzle'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "バイナリパズル（タクズ）とは何ですか？",
      answer: "0と1を使う論理パズルです。各行・各列には0と1を同じ数だけ入れ、同じ数字を3つ連続させず、行や列の並びが重複しないようにします。"
    },
    {
      question: "バイナリパズルはどう解きますか？",
      answer: "各マスに入る数字が一つに絞られる場所を探しましょう。同じ数字が3つ続いてしまう場合は、残りのマスに反対の数字を入れます。行に同じ数字が半分入ったら、残りはもう一方の数字で埋めます。"
    },
    {
      question: "バイナリパズルは脳トレになりますか？",
      answer: "はい。論理的思考やパターン認識、推理力を使うため、幅広い年齢の方が楽しめる脳トレになります。"
    },
    {
      question: "バイナリパズルと数独の違いは何ですか？",
      answer: "数独は1から9までの数字を使いますが、バイナリパズルで使うのは0と1だけです。数字の数をそろえること、同じ数字を3つ続けないこと、行と列を重複させないことがルールです。"
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
