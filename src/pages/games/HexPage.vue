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
      <div class="game-controls">
        <label for="boardSizeSelect">盤面サイズ：</label>
        <select id="boardSizeSelect" onchange="changeBoardSize()">
          <option value="5">5×5</option>
          <option value="7" selected>7×7</option>
          <option value="9">9×9</option>
          <option value="11">11×11</option>
        </select>

        <label for="difficultySelect">難易度：</label>
        <select id="difficultySelect" onchange="changeDifficulty()">
          <option value="easy">初級</option>
          <option value="medium" selected>中級</option>
          <option value="hard">上級</option>
        </select>

        <button class="new-game-btn" onclick="newGame()">新しいゲーム</button>
      </div>

      <div id="gameStatus">あなたの番です - マスをクリックしてコマを置いてください</div>

      <div class="game-info">
        <div class="player-info">
          <div class="player-indicator blue"></div>
          <span class="player-label">あなた（青）：上辺と下辺をつなぐ</span>
        </div>
        <div class="player-info">
          <div class="player-indicator red"></div>
          <span class="player-label">コンピューター（赤）：左辺と右辺をつなぐ</span>
        </div>
      </div>

      <div class="board-container">
        <div id="hexBoard"></div>
      </div>

      <div class="instructions-box">
        <h3>ヘックスの遊び方</h3>
        <ul>
          <li><span class="goal-indicator"><span class="color-box blue"></span> 青（あなた）</span>: 上辺と下辺をつなぎます</li>
          <li><span class="goal-indicator"><span class="color-box red"></span> 赤（相手）</span>: 左辺と右辺をつなぎます</li>
          <li>交互に空いているマスへコマを1つ置きます</li>
          <li>自分の両端を先につないだ人の勝ちです</li>
          <li>引き分けはなく、必ず勝敗が決まります</li>
        </ul>
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
  slug: 'hex',
  title: 'ヘックス - 接続戦略パズル',
  shortTitle: 'ヘックス',
  description: 'コンピューターとヘックスで対戦しましょう。相手より先に盤面の自分側の辺同士をつなぐ戦略ゲームです。',
  metaDescription: 'Play Hex online free against AI. Connect your edges of the hexagonal board before your opponent. Classic strategy game invented by mathematicians with multiple board sizes.',
  thumbnail: 'thumbnail.png',
  categories: ['戦略', '論理', '定番'],
  keywords: ['hex game', 'hex board game', 'connection game', 'strategy game', 'hexagonal game', 'Nash game', 'two player game', 'abstract strategy'],
  initCode: 'newGame();',
  faqs: [
    {
      question: "ヘックスはどう遊びますか？",
      answer: "ひし形の六角形盤を使う2人用の戦略ゲームです。青は上辺と下辺、赤は左辺と右辺を先につなぐことを目指します。交互に空きマスへコマを置き、自分の両端をつないだ人が勝ちです。"
    },
    {
      question: "ヘックスに引き分けはありますか？",
      answer: "ありません。盤面が埋まると、どちらか一方が必ず自分の両端をつなぎます。これは「ヘックスの定理」として知られています。"
    },
    {
      question: "ヘックスのコツは何ですか？",
      answer: "中央を押さえると多くのマスへつながりやすくなります。相手の手にかかわらず接続できる橋を作り、自分の道を伸ばしながら相手の道を防ぎましょう。"
    },
    {
      question: "難易度の違いは何ですか？",
      answer: "初級はランダムに手を選びます。中級は中央や接続を意識します。上級は盤面を深く読み、勝ちにつながる手や相手を止める手を探します。大きな盤面ほど複雑になります。"
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
