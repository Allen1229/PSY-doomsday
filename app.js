const questions = [
  {
    question: "災難爆發的第一天，遠處傳來巨大的爆炸聲，你的第一反應是？",
    options: [
      { text: "立刻打包生存物資準備逃離", score: 4 },
      { text: "鎖緊門窗，躲在床底下觀察情況", score: 3 },
      { text: "立刻上網發文、打電話向親友確認", score: 2 },
      { text: "繼續睡覺，覺得這不關我的事", score: 1 },
    ]
  },
  {
    question: "在逃亡途中，你發現路邊有一家還有食物的廢棄超市，但裡面一片死寂，你會？",
    options: [
      { text: "準備好武器，小心翼翼潛入搜刮", score: 4 },
      { text: "在外觀察半天，確認絕對安全才進去", score: 3 },
      { text: "只敢撿散落在門口附近的食物", score: 2 },
      { text: "覺得有詐，直接跑走不管", score: 1 },
    ]
  },
  {
    question: "遇到一位帶著受傷小孩的陌生人求救，你的反應是？",
    options: [
      { text: "保持距離冷酷拒絕，資源有限不能冒險", score: 4 },
      { text: "給他們一點食物，但拒絕同行", score: 3 },
      { text: "同情心氾濫，決定帶著他們一起走", score: 2 },
      { text: "趁機提出條件，要求他們替你探路", score: 1 },
    ]
  },
  {
    question: "你來到一個看似安全的廢棄軍事基地，首要工作是？",
    options: [
      { text: "檢查所有出入口並設立陷阱", score: 4 },
      { text: "清點物資並規劃接下來的配給", score: 3 },
      { text: "尋找舒適的地方休息，放鬆神經", score: 2 },
      { text: "到處亂晃尋寶，看看有沒有酷東西", score: 1 },
    ]
  },
  {
    question: "夜晚輪到你守夜，突然聽到不遠處有奇怪的嘶吼聲，你會？",
    options: [
      { text: "悄悄叫醒所有人，準備隨時戰鬥或撤離", score: 4 },
      { text: "拿好武器，自己一個人躲在黑暗中死守", score: 3 },
      { text: "心裡害怕，假裝沒聽到希望聲音遠去", score: 2 },
      { text: "大聲呼喊示警，反而引起了怪物注意", score: 1 },
    ]
  },
  {
    question: "物資快耗盡了，隊友提議去一個被傳聞充滿怪物的危險區域拾荒，你會？",
    options: [
      { text: "制定周密計畫，帶隊前往尋找生機", score: 4 },
      { text: "讓別人先去探路，自己殿後接應", score: 3 },
      { text: "堅決反對，寧可餓死也不去送死", score: 2 },
      { text: "不管三七二十一，賭一把直接衝進去", score: 1 },
    ]
  },
  {
    question: "在一次遭遇中，你的隊友被咬傷感染了，目前沒有解藥，你會？",
    options: [
      { text: "毫不猶豫地解決他，避免波及其他人", score: 4 },
      { text: "將他隔離起來觀察，並隨時準備動手", score: 3 },
      { text: "不離不棄，試圖尋找奇蹟治好他", score: 2 },
      { text: "害怕得自己偷偷跑掉，拋下他", score: 1 },
    ]
  },
  {
    question: "最終，你找到了一個有通訊設備的避難所，可以對外發送最後一則廣播，你會說？",
    options: [
      { text: "報告座標，但警告如果有人硬闖將格殺勿論", score: 4 },
      { text: "留給其他倖存者的生存攻略和物資位置", score: 3 },
      { text: "對死去的親朋好友做最後的告別", score: 2 },
      { text: "播一首自己最喜歡的歌，笑對末日", score: 1 },
    ]
  }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let scoreHistory = [];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  setTimeout(() => {
    document.getElementById(pageId).classList.add('active');
  }, 50);
}

function startQuiz() {
  currentQuestionIndex = 0;
  totalScore = 0;
  scoreHistory = [];
  renderQuestion();
  showPage('quiz-page');
}

function renderQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('q-num').innerText = currentQuestionIndex + 1;
  document.getElementById('q-text').innerText = q.question;
  
  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    backBtn.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
  }
  
  const optionsBox = document.getElementById('options-box');
  optionsBox.innerHTML = '';
  
  const letters = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('div');
    btn.className = 'option-btn';
    btn.innerHTML = `<div class="option-letter">${letters[idx]}</div><div>${opt.text}</div>`;
    btn.onclick = () => selectOption(opt.score);
    optionsBox.appendChild(btn);
  });
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('progress').style.width = progress + '%';
}

function selectOption(score) {
  scoreHistory.push(score);
  totalScore += score;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    const quizPage = document.getElementById('quiz-page');
    quizPage.style.opacity = 0;
    setTimeout(() => {
      renderQuestion();
      quizPage.style.opacity = 1;
    }, 300);
  } else {
    calculateResult();
  }
}

function goBack() {
  if (currentQuestionIndex > 0) {
    const lastScore = scoreHistory.pop();
    totalScore -= lastScore;
    currentQuestionIndex--;
    
    const quizPage = document.getElementById('quiz-page');
    quizPage.style.opacity = 0;
    setTimeout(() => {
      renderQuestion();
      quizPage.style.opacity = 1;
    }, 300);
  }
}

function calculateResult() {
  showPage('loading-page');
  
  setTimeout(() => {
    let result = null;
    if (totalScore >= 29) {
      result = {
        title: "鐵血主宰", subtitle: "生存指數 99% | 為了活下去，你連自己都怕", class: "gradient-t1",
        img: "images/t1_ruler.png",
        tags: ["#絕對理性", "#冷酷無情", "#天生領導", "#殺伐果斷", "#適者生存"],
        desc: "你擁有極致的理智與無情的執行力。在末日中，道德和情感是你的累贅，你只看重生存機率。你往往能迅速建立並統治一個小型聚落，成為不容置疑的首領。"
      };
    } else if (totalScore >= 25) {
      result = {
        title: "孤狼生存者", subtitle: "生存指數 85% | 只要沒人扯後腿，我能活到最後", class: "gradient-t2",
        img: "images/t2_lonewolf.png",
        tags: ["#獨來獨往", "#警戒心極強", "#高超匿蹤", "#自給自足", "#末日幽靈"],
        desc: "你極度不信任他人，習慣單打獨鬥。你擁有絕佳的偵察與隱蔽技巧。雖然不主動害人，但誰也別想佔你便宜。你是廢土中最神秘的幽靈。"
      };
    } else if (totalScore >= 21) {
      result = {
        title: "戰術軍師", subtitle: "生存指數 70% | 用腦袋代替肌肉，活著是門藝術", class: "gradient-t3",
        img: "images/t3_tactician.png",
        tags: ["#智商壓制", "#大局觀", "#精打細算", "#資源管理", "#團隊大腦"],
        desc: "面對危機，你會冷靜分析利弊並制定計畫。你可能不是戰鬥力最強的，但你絕對是最聰明的。你會利用手中的資源與他人合作，確保自己始終站在安全的那一方。"
      };
    } else if (totalScore >= 17) {
      result = {
        title: "末日聖母", subtitle: "生存指數 45% | 就算世界毀滅，也要保持善良", class: "gradient-t4",
        img: "images/t4_saint.png",
        tags: ["#心軟善良", "#感性主導", "#捨己為人", "#道德底線", "#希望之光"],
        desc: "你的同理心在末世中顯得格格不入卻又無比珍貴。你總是不忍心拋下弱者，這讓你時常陷入險境。你很容易受傷，但也可能引發奇蹟，建立真正的烏托邦。"
      };
    } else if (totalScore >= 13) {
      result = {
        title: "混水摸魚大師", subtitle: "生存指數 30% | 躲得好不如藏得巧，阿彌陀佛", class: "gradient-t5",
        img: "images/t5_hider.png",
        tags: ["#苟且偷生", "#極度恐懼", "#幸運滿點", "#見風轉舵", "#生存靠運氣"],
        desc: "你生性膽小但求生意志強烈，比起正面交鋒，你更擅長躲藏、裝死和逃跑。有時候運氣特別好，總能在夾縫中求得一線生機，但也常常被自己的驚恐出賣。"
      };
    } else {
      result = {
        title: "開局秒躺炮灰", subtitle: "生存指數 5% | 導演，我申請領便當", class: "gradient-t6",
        img: "images/t6_cannonfodder.png",
        tags: ["#智商掉線", "#衝動白給", "#一秒GG", "#快樂等死", "#炮灰擔當"],
        desc: "對不起，在末日的字典裡沒有浪漫和意外。你的反應遲鈍加上各種謎之操作，讓你成為了怪物的開胃菜或是反派的墊腳石。下輩子再來挑戰吧！"
      };
    }
    
    document.getElementById('r-title').innerText = result.title;
    document.getElementById('r-subtitle').innerText = result.subtitle;
    document.getElementById('r-image').src = result.img;
    document.getElementById('r-desc').innerText = result.desc;
    
    const tagsHtml = result.tags.map(t => `<span>${t}</span>`).join('');
    document.getElementById('r-tags').innerHTML = tagsHtml;
    
    const card = document.getElementById('result-card');
    card.className = `result-card ${result.class}`;
    
    window.resultData = result; // 保留給分享使用
    
    showPage('result-page');
    
    // 3秒後顯示蓋版廣告
    setTimeout(showInterstitial, 3000);
  }, 2000);
}

function showInterstitial() {
  const overlay = document.getElementById('ad-interstitial');
  const btn = document.getElementById('ad-close-btn');
  overlay.style.display = 'flex';
  
  let countdown = 5;
  btn.disabled = true;
  btn.innerText = `廣告 ${countdown}s`;
  
  const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      btn.innerText = `廣告 ${countdown}s`;
    } else {
      clearInterval(timer);
      btn.innerText = 'Ｘ 關閉';
      btn.disabled = false;
      btn.onclick = () => { overlay.style.display = 'none'; };
    }
  }, 1000);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function shareTo(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = window.resultData ? `我在末世中是【${window.resultData.title}】！${window.resultData.subtitle}。你也來測測看！` : "末日生存挑戰";
  const text = encodeURIComponent(title);
  
  if (platform === 'fb') {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  } else if (platform === 'line') {
    window.location.href = `https://line.me/R/msg/text/?${text}%20${url}`;
  } else if (platform === 'threads') {
    window.location.href = `https://threads.net/intent/post?text=${text}%20${url}`;
  } else if (platform === 'ig') {
    const copyText = `${title} ${window.location.href}`;
    navigator.clipboard.writeText(copyText).then(() => {
      showToast('已複製測驗連結與結果，可直接貼上 Instagram 分享！');
    }).catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = copyText;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast('已複製測驗連結與結果，可直接貼上 Instagram 分享！');
    });
  } else if (platform === 'copy') {
    const copyText = window.location.href;
    navigator.clipboard.writeText(copyText).then(() => {
      showToast('連結已複製！');
    }).catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = copyText;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast('連結已複製！');
    });
  }
}
