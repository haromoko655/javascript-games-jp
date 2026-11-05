<template>
  <article class="container py-5" itemscope itemtype="https://schema.org/ProfilePage">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <!-- Profile Header -->
        <header class="about-header mb-5">
          <div class="profile-section">
            <img
              :src="`${baseUrl}profile.png`"
              alt="Brain Busters の開発者 Muthukrishnan"
              class="profile-img"
              width="120"
              height="120"
              loading="eager"
              itemprop="image"
            >
            <div class="profile-info">
              <h1 itemprop="name">Muthukrishnan</h1>
              <p class="tagline" itemprop="description">
                ソフトウェアエンジニア、研究者、著者
              </p>
              <nav class="social-links" aria-label="関連リンク">
                <a
                  href="https://linkedin.com/in/krimuthu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedInプロフィールを見る"
                >
                  <i class="bi bi-linkedin" aria-hidden="true"></i>
                </a>
                <a
                  href="https://github.com/muthuspark"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHubプロフィールを見る"
                >
                  <i class="bi bi-github" aria-hidden="true"></i>
                </a>
              </nav>
            </div>
          </div>
        </header>

        <!-- Bio Content -->
        <section class="about-content" aria-labelledby="bio-heading">
          <h2 id="bio-heading" class="visually-hidden">プロフィール</h2>

          <div itemprop="mainContentOfPage">
            <p><strong itemprop="author" itemscope itemtype="https://schema.org/Person"><span itemprop="name">Muthukrishnan</span></strong> は Sanas AI Inc. のエンジニアリングマネージャーです。拡張性の高い SaaS アプリケーションの開発に16年以上携わっています。</p>

            <p>数百人から数百万人が利用するアプリケーションを開発・成長させてきました。OCR やアプリケーション間の操作ガイドなどに関する特許も約5件取得しています。</p>

            <p>以前在籍していた Whatfix では、Desktop 事業の設計と立ち上げを担当しました。チームを一から作り、製品開発を進めました。</p>

            <div class="info-block">
              <h3>技術分野</h3>
              <p>システム設計、ソフトウェアアーキテクチャ、Java・JavaScript・Python などのプログラミング言語を専門としています。業務プロセスの改善とアジャイルな開発文化にも取り組んでいます。</p>
            </div>

            <div class="info-block">
              <h3>ブレインバスターズについて</h3>
              <p>プログラミングと昔ながらのパズルゲームを組み合わせた個人プロジェクトです。大規模なフレームワークを使わず、素の JavaScript でゲームを作っています。</p>
            </div>

            <p class="text-muted">技術、エンジニアリングマネジメント、SaaS の今後については LinkedIn または GitHub からご連絡ください。</p>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { siteData } from '../data/games.js'

const baseUrl = import.meta.env.BASE_URL

useHead({
  title: 'About Muthukrishnan - Creator of Brain Busters | Engineering Manager',
  meta: [
    { name: 'description', content: 'Learn about Muthukrishnan, the creator of Brain Busters puzzle games. Engineering Manager with 16+ years experience building scalable SaaS applications and 5 patents.' },
    { name: 'keywords', content: 'Muthukrishnan, Brain Busters creator, engineering manager, software architect, puzzle game developer' },
    { property: 'og:title', content: 'About the Creator - Brain Busters' },
    { property: 'og:description', content: 'Meet Muthukrishnan, Engineering Manager and creator of Brain Busters free online puzzle games.' },
    { property: 'og:url', content: `${siteData.siteUrl}/about` },
    { property: 'og:type', content: 'profile' },
    { property: 'og:image', content: `${siteData.siteUrl}/profile.png` },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'About the Creator - Brain Busters' },
    { name: 'twitter:description', content: 'Meet Muthukrishnan, Engineering Manager and creator of Brain Busters free online puzzle games.' }
  ],
  link: [
    { rel: 'canonical', href: `${siteData.siteUrl}/about` }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Muthukrishnan",
          "jobTitle": "Engineering Manager",
          "worksFor": {
            "@type": "Organization",
            "name": "Sanas AI Inc"
          },
          "url": `${siteData.siteUrl}/about`,
          "image": `${siteData.siteUrl}/profile.png`,
          "sameAs": [
            "https://linkedin.com/in/krimuthu",
            "https://github.com/muthuspark"
          ],
          "description": "Engineering Manager with 16+ years experience in building scalable SaaS applications. Creator of Brain Busters puzzle games."
        }
      })
    }
  ]
})
</script>

<style scoped>
.about-header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 2rem;
}

.profile-section {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.profile-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 1px solid #ccc;
  flex-shrink: 0;
}

.profile-info h1 {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 0.5rem 0;
}

.tagline {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: #666;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.15s;
}

.social-links a:hover {
  color: #000;
}

.about-content p {
  margin-bottom: 1.25rem;
  line-height: 1.7;
  color: #333;
}

.info-block {
  background: #f8f9fa;
  border-left: 2px solid #ccc;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

.info-block h3 {
  font-size: 0.85rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
  color: #000;
}

.info-block p {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 576px) {
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .info-block {
    border-left: none;
    border-top: 2px solid #ccc;
  }
}
</style>
