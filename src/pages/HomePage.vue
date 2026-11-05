<template>
  <article class="container py-4">
    <!-- Hero Section -->
    <header class="mb-5">
      <h1 class="page-title mb-3">脳トレゲーム</h1>
      <p class="page-subtitle">
        無料で遊べるパズルゲーム。ダウンロード不要、ブラウザーですぐにプレイ。
      </p>
    </header>

    <!-- Game Categories -->
    <section aria-labelledby="games-heading">
      <h2 id="games-heading" class="visually-hidden">ゲーム一覧</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div v-for="(game, index) in games" :key="game.slug" class="col">
          <GameCard :game="game" :priority="index < 3" />
        </div>
      </div>
    </section>

    <!-- SEO Content Section -->
    <section class="mt-5 pt-4 border-top" aria-labelledby="about-games-heading">
      <h2 id="about-games-heading" class="section-title mb-3">このサイトについて</h2>
      <div class="row">
        <div class="col-md-6">
          <h3 class="subsection-title">パズルゲームで遊ぶ楽しさ</h3>
          <p class="body-text">
            パズルゲームで論理的思考力や記憶力、集中力を使ってみましょう。
            数独からナイトツアーまで、初心者から上級者まで楽しめます。
          </p>
        </div>
        <div class="col-md-6">
          <h3 class="subsection-title">いつでもどこでも</h3>
          <p class="body-text">
            すべてのゲームはブラウザー上で遊べます。
            ダウンロードも登録も不要です。
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section for SEO -->
    <section class="mt-5 pt-4 border-top" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="section-title mb-4">よくある質問</h2>
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
          <h3 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#faq${index}`"
              :aria-expanded="false"
              :aria-controls="`faq${index}`"
            >
              {{ faq.question }}
            </button>
          </h3>
          <div :id="`faq${index}`" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div class="accordion-body text-muted">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { games, siteData } from '../data/games.js'
import GameCard from '../components/GameCard.vue'

// Homepage FAQs - defined before useHead to avoid reference error
const faqs = [
  {
    question: 'ゲームは無料で遊べますか？',
    answer: 'はい、すべて無料です。ダウンロードや会員登録、追加料金は必要ありません。ブラウザーを開いてすぐに遊べます。'
  },
  {
    question: '何かをダウンロードする必要はありますか？',
    answer: 'ダウンロードは不要です。ゲームはJavaScriptを使ってブラウザー上で動作し、パソコン、タブレット、スマートフォンで遊べます。'
  },
  {
    question: 'パズルゲームは脳トレになりますか？',
    answer: 'パズルゲームでは記憶力や集中力、問題解決力を使います。楽しみながら頭を働かせるきっかけになります。'
  },
  {
    question: 'どのゲームから始めるのがおすすめですか？',
    answer: '初めてなら○×ゲームやマインスイーパーがおすすめです。慣れてきたら数独や四目並べに挑戦してみてください。上級者にはNクイーンやナイトツアーもあります。'
  }
]

// SEO Head configuration
useHead({
  title: 'Webブラウザゲーム - ブレインバスターズ 日本語版 | 無料の脳トレ・パズルゲーム',
  meta: [
    { name: 'description', content: siteData.description },
    { name: 'keywords', content: 'puzzle games, brain games, sudoku, minesweeper, tic tac toe, connect 4, word search, logic games, free online games' },
    { property: 'og:title', content: 'Brain Busters - Free Online Puzzle Games' },
    { property: 'og:description', content: siteData.description },
    { property: 'og:url', content: siteData.siteUrl },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:title', content: 'Brain Busters - Free Online Puzzle Games' },
    { name: 'twitter:description', content: siteData.description }
  ],
  link: [
    { rel: 'canonical', href: siteData.siteUrl + '/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Brain Busters - Free Online Puzzle Games",
        "description": siteData.description,
        "url": siteData.siteUrl,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": games.map((game, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${siteData.siteUrl}/posts/${game.slug}/`,
            "name": game.title
          }))
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })
    }
  ]
})
</script>

<style scoped>
.page-title {
  font-size: var(--text-display);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-text-strong);
}

.page-subtitle {
  font-size: var(--text-body);
  color: var(--color-text-muted);
  max-width: 65ch;
}

.section-title {
  font-size: var(--text-heading);
  font-weight: 700;
  color: var(--color-text-strong);
}

.subsection-title {
  font-size: var(--text-heading);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.body-text {
  font-size: var(--text-body);
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 65ch;
}
</style>
