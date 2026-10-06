import { DetectiveBadge, ForumTopic, LeaderboardUser, SolutionAnalysis } from '../types/detective';

export const INITIAL_BADGES: DetectiveBadge[] = [
  {
    id: 'badge-first-clue',
    title: 'Baker Street Çırağı',
    description: 'İlk vaka dosyasını açıp kanıt incelemesi başlattı.',
    icon: 'Feather',
    unlocked: true,
    unlockedAt: '2026-10-01'
  },
  {
    id: 'badge-eagle-eye',
    title: 'Şahin Göz (Adli Tıp Uzmanı)',
    description: 'Delillerin mikroskobik adli raporlarını, gizli gravürlerini ve laboratuvar sonuçlarını inceledi.',
    icon: 'Eye',
    unlocked: true,
    unlockedAt: '2026-10-03'
  },
  {
    id: 'badge-mind-palace',
    title: 'Zihin Sarayı Sakini',
    description: 'Kapsamlı bir dedüksiyon analizi yazdı ve hipotez tahtasına delilleri bağladı.',
    icon: 'Compass',
    unlocked: true,
    unlockedAt: '2026-10-04'
  },
  {
    id: 'badge-top-deduction',
    title: 'Scotland Yard Danışmanı',
    description: 'Topluluktan 50\'den fazla takdir ve oy alan çürütülemez bir teori geliştirdi.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'badge-master-sherlock',
    title: '221B Sherlock Onur Nişanı',
    description: '5 farklı soğuk vakanın tüm adli delillerini çözerek baş dedektif rütbesine ulaştı.',
    icon: 'Crown',
    unlocked: false
  }
];

export const INITIAL_ANALYSES: SolutionAnalysis[] = [
  {
    id: 'ana-1',
    caseId: 'jack-the-ripper',
    caseTitle: 'Karındeşen Jack & Whitechapel Cinayetleri',
    authorDetectiveName: 'Dedektif Sahra',
    authorBadge: 'PocketWatch',
    authorRank: 'Kıdemli Dedektif Danışmanı',
    createdAt: '2 gün önce',
    theoryTitle: 'Druitt Hipotezi ve Mitre Square Kaçış Koridoru Analizi',
    primeSuspectId: 's-druitt',
    primeSuspectName: 'Montague John Druitt',
    motiveExplanation: 'Psikolojik çöküş ve ailevi melankoli hezeyanı. Kelly cinayetinden sonraki intihar bu tezi doğrudan destekliyor.',
    evidenceLinks: ['1888 Vintage Köstekli Cep Saati', '"From Hell" Mektubu ve Balmumu Mührü', 'Mitre Square Olay Yeri 360° Rekonstrüksiyonu'],
    deductionNarrative: `Mary Ann Nichols'un köstekli saatini 360 derece döndürdüğümüzde saatin 03:45'te durduğunu görüyoruz. Charles Cross'un Nichols'u bulduğu saat 03:40 ile 03:45 arasıydı; bu da katilin sokağın diğer ucundan hızla uzaklaştığı anlamına geliyor.

Druitt'in avukatlık ofisi ile Whitechapel arasındaki mesafe gece atlı tramvayla sadece 20 dakikadır. Ayrıca "From Hell" mektubundaki filigran lüks hukuk kağıdı olan Joynson 1885 filigranıdır. Bu kağıt Whitechapel berberinde değil, Londra tapu ve avukatlık bürolarında bulunuyordu!`,
    upvotes: 84,
    downvotes: 4,
    userVote: 'up',
    status: 'Baş Dedektif Seçkisi',
    commentsCount: 12
  },
  {
    id: 'ana-2',
    caseId: 'zodiac-killer',
    caseTitle: 'Zodiac Katili & 340 Şifreli Kriptosu',
    authorDetectiveName: 'C. Auguste Dupin',
    authorBadge: 'Key',
    authorRank: 'Kripto Analisti',
    createdAt: '3 gün önce',
    theoryTitle: 'Paul Stine Taksi Kovanı ve Arthur Leigh Allen Donanma Bağı',
    primeSuspectId: 's-allen',
    primeSuspectName: 'Arthur Leigh Allen',
    motiveExplanation: 'Okuldan uzaklaştırılma sonrası otoriteye ve basına meydan okuma dürtüsü.',
    evidenceLinks: ['9mm Olay Yeri Balistik Kovanı (WCC 68)', 'Z-340 Kripto Silindiri & Şifre Anahtarı'],
    deductionNarrative: `Balistik kovanı 360 derece incelediğimizde tabanındaki WCC 68 damgası Western Cartridge Company askeri sözleşmeli serisidir. Allen eski donanma personeli olduğu için bu askeri mühimmata rahatlıkla erişebiliyordu.

Lake Berryessa'daki Wing Walker bot izleri de donanma dalgıçlarının kış aylarında kullandığı tipik ayakkabılardır. El yazısı uyuşmasa bile Zodiac mektupları sol eliyle veya şablonla yazmış olabilir.`,
    upvotes: 62,
    downvotes: 8,
    userVote: null,
    status: 'Topluluk Onaylı',
    commentsCount: 9
  },
  {
    id: 'ana-3',
    caseId: 'somerton-man',
    caseTitle: 'Somerton Adamı & "Tamam Shud" Gizemi',
    authorDetectiveName: 'Müfettiş Lestrade',
    authorBadge: 'Magnifier',
    authorRank: 'Başmüfettiş',
    createdAt: '5 gün önce',
    theoryTitle: 'Hemşire Jestyn ile Woomera Askeri Roket Üssü Bağlantısı',
    primeSuspectId: 's-jestyn',
    primeSuspectName: 'Jessica Ellen Harkness (Jo Thomson)',
    motiveExplanation: 'Woomera gizli nükleer ve roket denemeleri hakkında çift taraflı bilgi sızıntısı.',
    evidenceLinks: ['"Tamam Shud" Yırtık Parşömen Parçası', 'Kurbanın Eczacı İlaç Şişesi & Zehir Numunesi'],
    deductionNarrative: `Somerton plajı Woomera askeri personellerinin izin günlerinde gittiği ana koridordu. Jessica Thomson'ın evinin kumsala 400 metre mesafede olması rastlantı olamaz.

Rubaiyat kitabının arkasındaki 5 satırlık şifreleme Soğuk Savaş "tek kullanımlık blok" (one-time pad) sistemidir. Kitap ikinci bir kopya olmadan kırılamaz; bu da Somerton adamının kurye veya sığınmacı bir istihbaratçı olduğunu gösterir.`,
    upvotes: 49,
    downvotes: 5,
    userVote: null,
    status: 'Topluluk Onaylı',
    commentsCount: 7
  }
];

export const INITIAL_TOPICS: ForumTopic[] = [
  {
    id: 'topic-1',
    caseId: 'jack-the-ripper',
    caseTitle: 'Karındeşen Jack & Whitechapel Cinayetleri',
    title: 'Miller\'s Court Cinayetinde Kapı Neden İçeriden Kilitliydi?',
    authorName: 'Dr. John Watson',
    authorRank: 'Adli Tıp Gözlemcisi',
    authorBadge: 'Pen',
    createdAt: 'Dün, 22:15',
    category: 'Adli Tıp & Balistik',
    content: `Mary Jane Kelly cinayetinde polis kapıyı kırmak zorunda kaldı çünkü kilitliydi. Fakat anahtar hiçbir zaman odada bulunamadı. Katil kırık pencereden uzanıp sürgüyü mü itti, yoksa Kelly katile kapıyı kendi elleriyle açıp anahtarı katile mi teslim etti? Şöminedeki yanmış kadın elbiseleri kime aitti? Fikirlerinizi bekliyorum.`,
    upvotes: 41,
    downvotes: 2,
    userVote: null,
    comments: [
      {
        id: 'c1',
        authorName: 'Dedektif Sahra',
        authorRank: 'Kıdemli Dedektif Danışmanı',
        authorBadge: 'PocketWatch',
        content: 'Pencerenin kırık camında katilin içeri uzandığına dair ceket lifleri bulundu. Ayrıca şöminedeki ateş cinayeti aydınlatmak için yakılmıştı; odada gaz lambası olmadığı için katil anatomik işlemi yapabilmek adına ateşi canlı tutmak zorundaydı.',
        createdAt: '18 saat önce',
        upvotes: 28,
        userVoted: false
      },
      {
        id: 'c2',
        authorName: 'Scotland Yard Arşivcisi',
        authorRank: 'Araştırmacı',
        authorBadge: 'FileText',
        content: 'Müfettiş Abberline de benzer bir raporda ateşteki aşırı ısının şöminedeki çinko demliği erittiğini belirtmişti. Katil odada en az iki saat kalmış olmalı.',
        createdAt: '12 saat önce',
        upvotes: 14,
        userVoted: false
      }
    ]
  },
  {
    id: 'topic-2',
    caseId: 'zodiac-killer',
    caseTitle: 'Zodiac Katili & 340 Şifreli Kriptosu',
    title: 'Lake Berryessa Cellat Kukuletasındaki Beyaz Sembol Ne Anlama Geliyor?',
    authorName: 'Kripto Dedektifi',
    authorRank: 'Kriptografi Uzmanı',
    authorBadge: 'Key',
    createdAt: '3 gün önce',
    category: 'Vaka Hipotezi',
    content: `Katilin Lake Berryessa'da giydiği kukuletanın göğsünde beyaz iplikle dikilmiş daire içinde artı sembolü vardı. Bu sembol hem Zodiac saat markasının logosudur hem de astrolojik dünya sembolü (Earth symbol). Katil neden cinayet mahallinde bu kadar gösterişli bir kostüm giymeyi tercih etti?`,
    upvotes: 35,
    downvotes: 1,
    userVote: 'up',
    comments: [
      {
        id: 'c3',
        authorName: 'Adli Psikolog',
        authorRank: 'Profilci',
        authorBadge: 'Compass',
        content: 'Klasik narsistik güç gösterisi. Katil sadece öldürmek değil, bir efsane figür olarak hatırlanmak istiyordu. Kukuleta ona hem dokunulmazlık illüzyonu veriyor hem de kurbanlarda mutlak dehşet uyandırıyordu.',
        createdAt: '2 gün önce',
        upvotes: 19,
        userVoted: false
      }
    ]
  },
  {
    id: 'topic-3',
    caseId: 'somerton-man',
    caseTitle: 'Somerton Adamı & "Tamam Shud" Gizemi',
    title: 'Adelaide Kumsalındaki Adam Carl Webb İse Cebindeki Farsça Şifre Neydi?',
    authorName: 'Casusluk Tarihçisi',
    authorRank: 'Tarihçi Dedektif',
    authorBadge: 'Award',
    createdAt: '4 gün önce',
    category: '360° Kanıt Keşfi',
    content: `2022'de Carl Webb adı açıklandığında herkes davanın çözüldüğünü sandı. Ancak Webb neden Melbourne'den Adelaide'a gitti? Neden ceplerindeki tüm etiketler jiletle sökülmüştü? Carl Webb gerçekten bir casus muydu, yoksa şairane bir intihar mıydı? 360° kanıt incelemesinde ilaç şişesini incelerken flakon boynundaki mühür balmumu dikkatimi çekti.`,
    upvotes: 52,
    downvotes: 3,
    userVote: null,
    comments: [
      {
        id: 'c4',
        authorName: 'Dedektif Sahra',
        authorRank: 'Kıdemli Dedektif Danışmanı',
        authorBadge: 'PocketWatch',
        content: 'Flakon boynundaki cerrahi balmumu mührü ancak eczacılık veya kimya laboratuvarlarında bulunurdu. Carl Webb teknik alet yapımcısıydı; bu tarz kimyasallara ve mühürlere erişimi vardı. Yine de Jessica Harkness\'ın kapısına gitmiş olması şüpheyi iki katına çıkarıyor.',
        createdAt: '2 gün önce',
        upvotes: 33,
        userVoted: false
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rankPosition: 1,
    name: 'Sherlock Holmes',
    title: 'Danışman Dedektif (221B Baker St.)',
    score: 9850,
    avatarIcon: 'Pipe',
    analysesCount: 42,
    accuracyRate: '%99.4'
  },
  {
    rankPosition: 2,
    name: 'C. Auguste Dupin',
    title: 'Paris Suç Analisti & Gizem Çözücü',
    score: 8720,
    avatarIcon: 'Key',
    analysesCount: 36,
    accuracyRate: '%96.1'
  },
  {
    rankPosition: 3,
    name: 'Hercule Poirot',
    title: 'Gri Hücreler Üstadı',
    score: 8140,
    avatarIcon: 'Crown',
    analysesCount: 31,
    accuracyRate: '%95.8'
  },
  {
    rankPosition: 4,
    name: 'Dedektif Sahra',
    title: 'Kıdemli Dedektif Danışmanı',
    score: 4350,
    avatarIcon: 'PocketWatch',
    analysesCount: 14,
    accuracyRate: '%92.3',
    isCurrentUser: true
  },
  {
    rankPosition: 5,
    name: 'Müfettiş Lestrade',
    title: 'Scotland Yard Saha Şefi',
    score: 3890,
    avatarIcon: 'Shield',
    analysesCount: 18,
    accuracyRate: '%81.0'
  },
  {
    rankPosition: 6,
    name: 'Dr. John Watson',
    title: 'Adli Tıp & Kronik Yazarı',
    score: 3420,
    avatarIcon: 'Pen',
    analysesCount: 15,
    accuracyRate: '%84.5'
  },
  {
    rankPosition: 7,
    name: 'Nero Wolfe',
    title: 'Kurgu & Mantık Dedektifi',
    score: 2950,
    avatarIcon: 'Coffee',
    analysesCount: 11,
    accuracyRate: '%89.0'
  }
];
