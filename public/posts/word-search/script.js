(function() {
const wordDatabase = {
    programming: ['ぷろぐらむ', 'ぱそこん', 'でんし', 'がめん', 'きーぼーど', 'まうす', 'ねっと', 'でーた', 'あぷり', 'さーばー', 'こーど', 'ろぼっと'],
    animals: ['いぬ', 'ねこ', 'うさぎ', 'きつね', 'たぬき', 'くま', 'ぱんだ', 'きりん', 'ぞう', 'らいおん', 'ぺんぎん', 'いるか', 'かえる', 'とら'],
    countries: ['にほん', 'あめりか', 'かなだ', 'ぶらじる', 'いんど', 'ちゅうごく', 'ふらんす', 'いたりあ', 'どいつ', 'たい', 'えじぷと', 'けにあ'],
    fruits: ['りんご', 'ばなな', 'みかん', 'ぶどう', 'いちご', 'もも', 'なし', 'すいか', 'めろん', 'れもん', 'きうい', 'さくらんぼ'],
    sports: ['やきゅう', 'さっかー', 'すいえい', 'てにす', 'ばすけ', 'ばれー', 'らぐびー', 'じゅうどう', 'けんどう', 'たっきゅう', 'すもう', 'まらそん'],
    colors: ['あか', 'あお', 'きいろ', 'みどり', 'むらさき', 'しろ', 'くろ', 'ちゃいろ', 'ももいろ', 'みずいろ', 'はいいろ', 'きんいろ'],
    vegetables: ['にんじん', 'だいこん', 'きゅうり', 'とまと', 'なす', 'はくさい', 'れたす', 'たまねぎ', 'じゃがいも', 'かぼちゃ', 'ごぼう', 'ぴーまん'],
    cars: ['じどうしゃ', 'ばす', 'たくしー', 'とらっく', 'ぱとかー', 'きゅうきゅうしゃ', 'しょうぼうしゃ', 'でんしゃ', 'ばいく', 'とらくたー'],
    professions: ['いしゃ', 'せんせい', 'けいさつかん', 'かんごし', 'しょうぼうし', 'うんてんしゅ', 'りょうりにん', 'のうか', 'かしゅ', 'はいゆう', 'だいく', 'えきいん'],
    superheroes: ['ひーろー', 'せいぎ', 'へんしん', 'まほう', 'ちから', 'ゆうしゃ', 'たんてい', 'にんじゃ', 'かめん', 'せんし'],
    weather: ['はれ', 'あめ', 'くもり', 'ゆき', 'かぜ', 'たいふう', 'かみなり', 'にじ', 'きり', 'ひょう', 'つゆ', 'こさめ'],
    instruments: ['ぴあの', 'ぎたー', 'どらむ', 'たいこ', 'ふえ', 'こと', 'しゃみせん', 'ばいおりん', 'らっぱ', 'はーぷ'],
    movies: ['えいが', 'こめでぃ', 'どらま', 'あにめ', 'ほらー', 'ぼうけん', 'ものがたり', 'にんぎょう', 'さつえい', 'めいが'],
    cities: ['とうきょう', 'おおさか', 'きょうと', 'なごや', 'さっぽろ', 'ふくおか', 'よこはま', 'なは', 'こうべ', 'ひろしま'],
    bodyParts: ['あたま', 'かお', 'め', 'みみ', 'はな', 'くち', 'て', 'あし', 'むね', 'おなか', 'ゆび', 'ひざ'],
    planets: ['わくせい', 'ちきゅう', 'かせい', 'もくせい', 'どせい', 'てんのうせい', 'かいおうせい', 'つき', 'たいよう', 'すいせい', 'ぎんが', 'うちゅう']
};


const gridsizes = [10, 20, 30, 40];

class WordSearchGame {
    constructor() {
        this.gridSize = 10;
        this.currentCategory = 'programming';
        this.wordsPerGame = 10;
        this.directions = [-1, 0, 1].flatMap(row =>
            [-1, 0, 1].filter(col => row || col).map(col => [row, col]));
        this.grid = document.getElementById('grid');
        this.wordList = document.getElementById('wordList');
        this.status = document.getElementById('wordSearchStatus');
        this.progress = document.getElementById('wordSearchProgress');
        this.events = new AbortController();
        const options = { signal: this.events.signal };
        this.grid.addEventListener('keydown', event => this.onKeyDown(event), options);
        this.grid.addEventListener('click', event => this.onClick(event), options);
        this.grid.addEventListener('pointerdown', event => this.onPointerDown(event), options);
        this.grid.addEventListener('pointermove', event => this.onPointerMove(event), options);
        this.grid.addEventListener('pointerup', event => this.onPointerUp(event), options);
        this.grid.addEventListener('pointercancel', () => this.cancelSelection(), options);
        document.getElementById('newPuzzle').addEventListener('click', () => this.newGame(), options);
        document.getElementById('gridSize').addEventListener('click', event => {
            const button = event.target.closest('[data-size]');
            if (button) { this.gridSize = Number(button.dataset.size); this.newGame(); }
        }, options);
        document.getElementById('categoryButtons').addEventListener('click', event => {
            const button = event.target.closest('[data-category]');
            if (button) { this.currentCategory = button.dataset.category; this.newGame(); }
        }, options);
        this.renderOptions();
    }

    shuffle(items) {
        const result = [...items];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    canPlaceWord(word, row, col, dr, dc) {
        return [...word].every((letter, i) => {
            const cell = this.gameBoard[row + dr * i]?.[col + dc * i];
            return cell === '' || cell === letter;
        });
    }

    placeWord(word) {
        const starts = this.shuffle(Array.from({ length: this.gridSize ** 2 }, (_, i) => i));
        const directions = this.shuffle(this.directions);
        for (const start of starts) {
            const row = Math.floor(start / this.gridSize), col = start % this.gridSize;
            for (const [dr, dc] of directions) {
                if (!this.canPlaceWord(word, row, col, dr, dc)) continue;
                const positions = [...word].map((letter, i) => {
                    const r = row + dr * i, c = col + dc * i;
                    this.gameBoard[r][c] = letter;
                    return [r, c];
                });
                this.wordLocations.set(word, positions);
                return true;
            }
        }
        return false;
    }

    newGame() {
        this.cancelSelection();
        this.gameBoard = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(''));
        this.wordLocations = new Map();
        this.foundWords = new Set();
        this.words = [];
        const candidates = this.shuffle(wordDatabase[this.currentCategory].filter(word => word.length <= this.gridSize));
        for (const word of candidates) {
            if (this.placeWord(word)) this.words.push(word);
            if (this.words.length === this.wordsPerGame) break;
        }
        this.gameBoard = this.gameBoard.map(row => row.map(letter =>
            letter || 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'[Math.floor(Math.random() * 46)]));
        this.renderBoard();
        this.renderWordList();
        this.updateOptions();
        this.updateProgress();
        this.announce(`${this.categoryLabel(this.currentCategory)}の新しい問題です。盤面は${this.gridSize}×${this.gridSize}。${this.words.length}個の単語を探してください。`);
    }

    categoryLabel(category) {
        const labels = { programming: 'コンピューター', animals: '動物', countries: '国', fruits: '果物', sports: 'スポーツ', colors: '色', vegetables: '野菜', cars: '乗り物', professions: '職業', superheroes: 'ヒーロー', weather: '天気', instruments: '楽器', movies: '映画', cities: '街', bodyParts: '体の部位', planets: '宇宙' };
        return labels[category] || category;
    }

    renderOptions() {
        const sizes = document.getElementById('gridSize');
        for (const size of gridsizes) {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.size = size;
            button.textContent = `${size} × ${size}`;
            sizes.appendChild(button);
        }
        const categories = document.getElementById('categoryButtons');
        for (const category of Object.keys(wordDatabase)) {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.category = category;
            button.textContent = this.categoryLabel(category);
            categories.appendChild(button);
        }
    }

    updateOptions() {
        for (const button of document.querySelectorAll('#gridSize button')) {
            button.setAttribute('aria-pressed', String(Number(button.dataset.size) === this.gridSize));
        }
        for (const button of document.querySelectorAll('#categoryButtons button')) {
            button.setAttribute('aria-pressed', String(button.dataset.category === this.currentCategory));
        }
    }

    renderBoard() {
        const fragment = document.createDocumentFragment();
        this.cells = [];
        this.grid.style.setProperty('--grid-size', this.gridSize);
        this.grid.setAttribute('aria-rowcount', this.gridSize);
        this.grid.setAttribute('aria-colcount', this.gridSize);
        this.gameBoard.forEach((letters, row) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'word-search-row';
            rowElement.setAttribute('role', 'row');
            letters.forEach((letter, col) => {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = letter;
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.setAttribute('role', 'gridcell');
                cell.setAttribute('aria-label', `${letter}、${row + 1}行${col + 1}列`);
                cell.setAttribute('aria-selected', 'false');
                cell.tabIndex = row === 0 && col === 0 ? 0 : -1;
                rowElement.appendChild(cell);
                this.cells.push(cell);
            });
            fragment.appendChild(rowElement);
        });
        this.grid.replaceChildren(fragment);
    }

    renderWordList() {
        const fragment = document.createDocumentFragment();
        for (const word of this.words) {
            const item = document.createElement('li');
            const found = this.foundWords.has(word);
            item.className = `word-item${found ? ' found' : ''}`;
            item.textContent = found ? `✓ ${word}` : word;
            fragment.appendChild(item);
        }
        this.wordList.replaceChildren(fragment);
    }

    announce(message) { this.status.textContent = message; }
    updateProgress() { this.progress.textContent = `${this.words.length}個中${this.foundWords.size}個見つかりました`; }
    cellAt(row, col) { return this.cells[row * this.gridSize + col]; }
    eventCell(event) { return event.target.closest('.cell'); }

    focusCell(cell) {
        const previous = this.grid.querySelector('[tabindex="0"]');
        if (previous) previous.tabIndex = -1;
        cell.tabIndex = 0;
        cell.focus({ preventScroll: true });
        cell.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    selectTo(cell) {
        this.clearHighlight();
        if (!this.anchor) return;
        const [row, col] = this.anchor;
        const dr = Number(cell.dataset.row) - row, dc = Number(cell.dataset.col) - col;
        if (dr && dc && Math.abs(dr) !== Math.abs(dc)) return;
        const length = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
        this.selectedCells = Array.from({ length }, (_, i) =>
            this.cellAt(row + Math.sign(dr) * i, col + Math.sign(dc) * i));
        for (const selected of this.selectedCells) {
            selected.classList.add('selected');
            selected.setAttribute('aria-selected', 'true');
        }
    }

    clearHighlight() {
        for (const cell of this.selectedCells || []) {
            cell.classList.remove('selected');
            cell.setAttribute('aria-selected', 'false');
        }
        this.selectedCells = [];
    }

    cancelSelection() {
        this.clearHighlight();
        this.anchor = null;
        this.pointer = null;
    }

    chooseCell(cell) {
        this.focusCell(cell);
        if (!this.anchor) {
            this.anchor = [Number(cell.dataset.row), Number(cell.dataset.col)];
            this.selectTo(cell);
            this.announce('Start selected. Choose the last letter, or press Escape to cancel.');
        } else {
            this.selectTo(cell);
            this.endSelection();
        }
    }

    onClick(event) {
        // A completed drag also emits a click; only use clicks for endpoint selection.
        if (this.ignoreClick) { this.ignoreClick = false; return; }
        const cell = this.eventCell(event);
        if (cell) this.chooseCell(cell);
    }

    onKeyDown(event) {
        const cell = this.eventCell(event);
        if (!cell) return;
        const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
        if (moves[event.key]) {
            event.preventDefault();
            const [dr, dc] = moves[event.key];
            const row = Math.max(0, Math.min(this.gridSize - 1, Number(cell.dataset.row) + dr));
            const col = Math.max(0, Math.min(this.gridSize - 1, Number(cell.dataset.col) + dc));
            const next = this.cellAt(row, col);
            this.focusCell(next);
            if (this.anchor) this.selectTo(next);
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.chooseCell(cell);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.cancelSelection();
            this.announce('Selection cancelled.');
        }
    }

    onPointerDown(event) {
        if (event.button !== 0 || !event.isPrimary) return;
        const cell = this.eventCell(event);
        if (!cell) return;
        this.ignoreClick = false;
        this.pointer = { id: event.pointerId, start: cell, dragged: false };
        // Touch uses two taps so swiping still scrolls the board.
    }

    onPointerMove(event) {
        if (!this.pointer || this.pointer.id !== event.pointerId || event.pointerType === 'touch') return;
        const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest('.cell');
        if (!cell || !this.grid.contains(cell)) return;
        if (!this.pointer.dragged && cell !== this.pointer.start) {
            this.pointer.dragged = true;
            this.anchor = [Number(this.pointer.start.dataset.row), Number(this.pointer.start.dataset.col)];
            this.grid.setPointerCapture(event.pointerId);
        }
        if (this.pointer.dragged) this.selectTo(cell);
    }

    onPointerUp(event) {
        if (!this.pointer || this.pointer.id !== event.pointerId) return;
        const dragged = this.pointer.dragged;
        if (this.grid.hasPointerCapture(event.pointerId)) this.grid.releasePointerCapture(event.pointerId);
        this.pointer = null;
        if (dragged) {
            this.ignoreClick = true;
            this.endSelection();
        }
    }

    endSelection() {
        const selected = this.selectedCells.map(cell => cell.textContent).join('');
        const reversed = [...selected].reverse().join('');
        const word = this.words.find(word => word === selected || word === reversed);
        if (word && !this.foundWords.has(word)) {
            this.foundWords.add(word);
            for (const cell of this.selectedCells) cell.classList.add('found');
            this.renderWordList();
            this.updateProgress();
            this.announce(this.foundWords.size === this.words.length
                ? '完成です！すべての単語を見つけました。「新しい問題」を選ぶともう一度遊べます。'
                : `「${word}」を見つけました。${this.words.length}個中${this.foundWords.size}個見つかりました。`);
        } else {
            this.announce(word ? `「${word}」はすでに見つけています。` : '一致する単語がありません。別の範囲を選んでください。');
        }
        this.cancelSelection();
    }

    destroy() {
        this.events.abort();
        this.cancelSelection();
    }
}

window.WordSearchGame = WordSearchGame;
})();
