// Minimal game data for routing and homepage display
// Full game metadata is in each game's Vue page component
export const games = [
  {
    slug: 'sudoku',
    title: '無料オンライン数独',
    shortTitle: '数独',
    description: '無料で遊べる定番の数独です。各行・各列・3×3のブロックに1から9までの数字を一度ずつ入れましょう。難易度を選べます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '数字']
  },
  {
    slug: 'maze',
    title: 'オンライン迷路ゲーム',
    shortTitle: '迷路',
    description: '自動生成される迷路をキーボードで進みましょう。10×10から90×90まで、サイズを選んで挑戦できます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '迷路']
  },
  {
    slug: 'tic-tac-toe',
    title: '○×ゲーム - コンピューター対戦',
    shortTitle: '○×ゲーム',
    description: 'コンピューターと対戦する○×ゲームです。3×3、4×4、5×5の盤面と難易度を選べます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '戦略', '定番']
  },
  {
    slug: 'connect4',
    title: '無料オンライン四目並べ',
    shortTitle: '四目並べ',
    description: 'コンピューターと四目並べで対戦しましょう。7×6の盤面にコマを落とし、先に4つ並べた方が勝ちです。難易度を選べます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '戦略', '定番']
  },
  {
    slug: 'minesweeper',
    title: 'マインスイーパー - 定番パズル',
    shortTitle: 'マインスイーパー',
    description: '隠れた地雷を避けながらマスを開きましょう。数字は隣接する地雷の数を示します。3段階の難易度があります。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '定番']
  },
  {
    slug: 'word-search',
    title: 'ワードサーチ - 隠れた言葉を探そう',
    shortTitle: 'ワードサーチ',
    description: '文字の中から隠れた単語を探しましょう。単語は縦・横・斜め・逆向きに並びます。カテゴリや盤面サイズを選べます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '言葉', '学習']
  },
  {
    slug: 'sliding-puzzle',
    title: 'スライドパズル - 数字を並べよう',
    shortTitle: 'スライドパズル',
    description: '数字のタイルをスライドさせて順番に並べましょう。3×3から7×8までの盤面を選べます。解答例の表示機能もあります。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理']
  },
  {
    slug: 'latin-square',
    title: 'ラテン方陣 - 数字の論理パズル',
    shortTitle: 'ラテン方陣',
    description: '各行と各列に同じ数字が一度ずつ入るようにマスを埋めましょう。数独に似ていますが、ブロックの制約はありません。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '数字']
  },
  {
    slug: 'magicsquare',
    title: '魔方陣 - 数字パズル',
    shortTitle: '魔方陣',
    description: '縦・横・対角線の合計がすべて同じになるように数字を配置しましょう。計算力を試せるパズルです。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '数学', '学習']
  },
  {
    slug: 'n-queens',
    title: 'Nクイーン - チェスの論理パズル',
    shortTitle: 'Nクイーン',
    description: 'N×Nの盤面に、互いに取られないようN個のクイーンを配置しましょう。4×4から12×12まで挑戦できます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', 'チェス', '論理']
  },
  {
    slug: 'knights-tour',
    title: "ナイトツアー - チェスの駒で巡るパズル",
    shortTitle: "ナイトツアー",
    description: "ナイトを動かして、すべてのマスを一度ずつ訪れましょう。ヒント付きの定番数学パズルです。",
    thumbnail: 'thumbnail.png',
    categories: ['パズル', 'チェス', '数学']
  },
  {
    slug: 'typing-speed',
    title: 'タイピング速度テスト',
    shortTitle: 'タイピングテスト',
    description: 'タイピングの速さと正確さを測定しましょう。60秒間で1分あたりの入力語数（WPM）と文字数（CPM）を計測します。',
    thumbnail: 'thumbnail.png',
    categories: ['チャレンジ', '学習', 'スキル']
  },
  {
    slug: 'memory-match',
    title: '神経衰弱 - カード合わせ',
    shortTitle: '神経衰弱',
    description: 'カードをめくって同じ絵柄のペアを見つけましょう。盤面サイズを選んで記憶力に挑戦できます。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '記憶', '定番']
  },
  {
    slug: 'hangman',
    title: 'ハングマン - 単語当てゲーム',
    shortTitle: 'ハングマン',
    description: '隠された単語を一文字ずつ当てましょう。動物、国、食べ物など複数のカテゴリがあります。',
    thumbnail: 'thumbnail.png',
    categories: ['言葉', '定番', '学習']
  },
  {
    slug: 'lights-out',
    title: 'ライツアウト - 明かりを消そう',
    shortTitle: 'ライツアウト',
    description: 'ライトを押してすべて消しましょう。押したライトと上下左右のライトが切り替わります。盤面サイズを選べる論理パズルです。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理']
  },
  {
    slug: 'simon-says',
    title: 'サイモン - 順番記憶ゲーム',
    shortTitle: 'サイモン',
    description: '光る色の順番を覚えて同じように押しましょう。ラウンドごとに色が一つ増えていきます。音付きの記憶ゲームです。',
    thumbnail: 'thumbnail.png',
    categories: ['記憶', '定番', 'チャレンジ']
  },
  {
    slug: 'reaction-time',
    title: '反応速度テスト - 反射神経に挑戦',
    shortTitle: '反応速度テスト',
    description: '画面が緑色に変わったら、できるだけ速くクリックしましょう。平均と最速の反応時間を記録します。',
    thumbnail: 'thumbnail.png',
    categories: ['チャレンジ', '反射神経', 'スキル']
  },
  {
    slug: 'whack-a-mole',
    title: 'モグラたたき - 反射神経ゲーム',
    shortTitle: 'モグラたたき',
    description: '穴から出てくるモグラをたたきましょう。30秒間でできるだけ多く得点する定番ゲームです。',
    thumbnail: 'thumbnail.png',
    categories: ['反射神経', '定番', 'チャレンジ']
  },
  {
    slug: 'mastermind',
    title: 'マスターマインド - 暗号当てパズル',
    shortTitle: 'マスターマインド',
    description: '10回以内に隠された色の並びを当てましょう。ヒントを手がかりに論理的に推理します。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '定番']
  },
  {
    slug: 'bulls-and-cows',
    title: 'ブルズ＆カウズ - 数字当てゲーム',
    shortTitle: 'ブルズ＆カウズ',
    description: '推理して隠された数字を当てましょう。ブルは数字と位置が正解、カウは数字のみ正解を表します。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '数字']
  },
  {
    slug: 'nim',
    title: 'ニム - 戦略ゲーム',
    shortTitle: 'Nim',
    description: 'コンピューターとニムで対戦しましょう。山から交互に取り、最後の一つを取った人が負ける数学的な戦略ゲームです。',
    thumbnail: 'thumbnail.png',
    categories: ['戦略', '論理', '定番']
  },
  {
    slug: 'dots-and-boxes',
    title: '点と箱 - 線をつないで陣取り',
    shortTitle: '点と箱',
    description: 'コンピューターと点と箱で対戦しましょう。点を線で結んで四角を完成させ、得点を競う定番ゲームです。',
    thumbnail: 'thumbnail.png',
    categories: ['戦略', '定番', 'パズル']
  },
  {
    slug: 'hex',
    title: 'ヘックス - 接続戦略パズル',
    shortTitle: 'ヘックス',
    description: 'コンピューターとヘックスで対戦しましょう。相手より先に盤面の自分側の辺同士をつなぐ戦略ゲームです。',
    thumbnail: 'thumbnail.png',
    categories: ['戦略', '論理', '定番']
  },
  {
    slug: 'set-game',
    title: 'セット - カードの組み合わせ探し',
    shortTitle: 'セット',
    description: '各特徴がすべて同じか、すべて異なるカード3枚の組み合わせを探しましょう。パターン認識を鍛えるパズルです。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '図形']
  },
  {
    slug: 'tangram',
    title: 'タングラム - シルエットパズル',
    shortTitle: 'タングラム',
    description: '7つのピースを動かし、回転・反転させてシルエットに合わせましょう。昔から親しまれている図形パズルです。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '図形', '定番']
  },
  {
    slug: 'binary-puzzle',
    title: 'バイナリパズル（タクズ）',
    shortTitle: 'バイナリパズル',
    description: '0と1をルールに沿ってマスに埋める無料パズルです。論理的に考えて盤面を完成させましょう。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '数字']
  },
  {
    slug: 'sokoban',
    title: '倉庫番 - 箱押しパズル',
    shortTitle: '倉庫番',
    description: '箱を押してすべての目的地に運ぶ、日本生まれの定番パズルです。隅に押し込むと戻せないので、手順をよく考えましょう。',
    thumbnail: 'thumbnail.png',
    categories: ['パズル', '論理', '定番']
  }
]

// Site-wide SEO data
export const siteData = {
  siteName: 'Brain Busters 日本語版',
  tagline: '無料オンライン脳トレゲーム',
  siteUrl: 'https://haromoko655.github.io/javascript-games-jp',
  description: '数独、マインスイーパー、○×ゲームなど、無料のオンラインパズルを遊びましょう。論理や戦略を使うゲームを集めました。',
  author: {
    name: 'Muthukrishnan',
    twitter: '@krimuthu',
    github: 'muthuspark'
  },
  social: {
    twitter: 'https://twitter.com/krimuthu',
    github: 'https://github.com/haromoko655/javascript-games-jp',
    linkedin: 'https://linkedin.com/in/krimuthu'
  }
}
