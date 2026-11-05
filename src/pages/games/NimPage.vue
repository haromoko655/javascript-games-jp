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
            <option value="easy">初級</option>
            <option value="medium" selected>中級</option>
            <option value="hard">上級</option>
          </select>
          <button onclick="newGame()">新しいゲーム</button>
        </div>

        <div id="gameStatus" class="game-status">あなたの番です - 山を選んでください</div>

        <div id="message" class="message"></div>

        <div id="pilesContainer" class="piles-container"></div>

        <div class="take-section">
          <h3>石を取る</h3>
          <div id="takeButtons"></div>
        </div>

        <div class="rules">
          <h4>遊び方</h4>
          <ul>
            <li>山をクリックして選びます</li>
            <li>取る石の数を選びます（1個以上）</li>
            <li>1回の手番で取れるのは1つの山からだけです</li>
            <li>最後の石を取った人が負けです！</li>
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
  slug: 'nim',
  title: 'ニム - 戦略ゲーム',
  shortTitle: 'Nim',
  description: 'コンピューターとニムで対戦しましょう。山から交互に取り、最後の一つを取った人が負ける数学的な戦略ゲームです。',
  metaDescription: 'Play Nim online free against AI. Remove objects from piles strategically. Whoever takes the last object loses. Multiple difficulty levels available.',
  thumbnail: 'thumbnail.png',
  categories: ['戦略', '論理', '定番'],
  keywords: ['nim game', 'strategy game', 'mathematical game', 'logic puzzle', 'two player game', 'brain game', 'nim sum'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "ニムとはどんなゲームですか？",
      answer: "複数の山から石を取る数学的な戦略ゲームです。自分の番では、1つの山から1個以上の石を取ります。最後の石を取った人が負けです。"
    },
    {
      question: "ニムの必勝法はありますか？",
      answer: "各山の石の数をXOR演算した「ニム和」を計算します。ニム和が0でなければ、次の手で0にできる場合があります。上級のコンピューターはこの戦略を使います。"
    },
    {
      question: "難易度の違いは何ですか？",
      answer: "初級はランダムに石を取ります。中級は半分の確率で最善手を選びます。上級はニム和を使って常に最善手を選びます。"
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
