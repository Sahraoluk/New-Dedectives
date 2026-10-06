import { CaseFile } from '../types/detective';

export const INITIAL_CASES: CaseFile[] = [
  {
    id: 'jack-the-ripper',
    caseNumber: 'MET-1888-0831',
    title: 'Karındeşen Jack & Whitechapel Cinayetleri',
    subtitle: 'Viktorya Dönemi Londra’sının Çözülemeyen En Karanlık Dosyası',
    year: 1888,
    location: 'Whitechapel & Spitalfields, Londra, İngiltere',
    era: 'Viktorya Dönemi (1880-1901)',
    status: 'unsolved',
    difficulty: 'Sherlock Düzeyi',
    victimCount: 5,
    victims: ['Mary Ann Nichols', 'Annie Chapman', 'Elizabeth Stride', 'Catherine Eddowes', 'Mary Jane Kelly'],
    bannerColor: '#881337',
    summary: '1888 sonbaharında Londra’nın sisli Whitechapel sokaklarında işlenen 5 kanonik cinayet. Cerrahi hassasiyetle gerçekleştirilen kesikler, Scotland Yard’a gönderilen alaycı mektuplar ve asla kimliği tespit edilemeyen hayalet bir katil.',
    narrative: `1888 Ağustos'unun son gecesinde Whitechapel'ın karanlık ara sokaklarında başlayan kabus, dönemin en gelişmiş polis teşkilatı Scotland Yard'ı çaresiz bıraktı. Kurbanların boğazları sessizce kesilmiş, cerrahi anatomik bilgi gerektiren organ kesimleri yapılmıştı. Katil karanlıkta hiçbir ayak izi bırakmadan kaybolabiliyordu.

Polise ve Merkezi Haber Ajansı'na gönderilen "Dear Boss" ve George Lusk'a böbrek parçasıyla yollanan "From Hell" mektupları katilin kimliğine dair dönemin en tartışmalı ipuçları oldu. Olay yerindeki kan lekeleri, cerrahi alet izleri ve kurbanların son görüldüğü saatlerdeki tanıklıklar bugüne dek incelenmeye devam etmektedir.`,
    forensicReport: `Dr. Thomas Bond ve Dr. George Bagster Phillips tarafından hazırlanan adli otopsi raporları:
1. Kurbanların boğaz kesikleri sol taraftan sağa doğru, şah damarını anında kesecek derinlikte ve sol elini kullanan veya arkadan saldıran bir failce yapılmıştır.
2. Karın bölgesindeki kesiler cerrahi bilgiye, en azından bir kasap veya anatomi öğrencisi derecesinde diseksiyon bilgisine işaret etmektedir.
3. Mary Jane Kelly haricindeki kurbanların hepsi açık havada, 10-15 dakikalık dar zaman pencerelerinde saldırıya uğramıştır; bu durum failin bölgeyi avucunun içi gibi bildiğini kanıtlar.`,
    coverImageTheme: 'vintage_london_fog',
    timeline: [
      {
        id: 't1',
        date: '31 Ağustos 1888',
        time: '03:40',
        title: 'Mary Ann Nichols Olayı',
        location: 'Buck\'s Row, Whitechapel',
        description: 'İlk kurban Nichols arabacı Charles Cross tarafından bulundu. Vücut henüz sıcaktı; katil dakikalar önce oradan uzaklaşmıştı.',
        importance: 'high'
      },
      {
        id: 't2',
        date: '8 Eylül 1888',
        time: '06:00',
        title: 'Annie Chapman Cinayeti',
        location: 'Hanbury Sokağı No:29 Arka Bahçesi',
        description: 'Chapman boğazı kesilmiş halde bulundu. Cerrahi bir aletle rahmi alınmıştı. Bahçe kapısında pirinç toka bulundu.',
        importance: 'high'
      },
      {
        id: 't3',
        date: '30 Eylül 1888',
        time: '01:00 - 01:45',
        title: 'Çifte Olay: Stride ve Eddowes',
        location: 'Berner Sokağı & Mitre Meydanı',
        description: 'Katil Stride\'da rahatsız edilince kaçtı; 45 dakika sonra Mitre Meydanı\'nda Eddowes\'u katletti. Eddowes\'un kanlı önlüğü Goulston Sokağı\'nda bulundu.',
        importance: 'critical'
      },
      {
        id: 't4',
        date: '9 Kasım 1888',
        time: '10:45',
        title: 'Mary Jane Kelly - Son ve En Vahşi Cinayet',
        location: 'Miller\'s Court No:13',
        description: 'Oda kapısı kilitliydi. Kelly kapalı mekanda saatlerce parçalanmış bulundu. Şöminede yakılmış giysi kalıntıları tespit edildi.',
        importance: 'critical'
      }
    ],
    suspects: [
      {
        id: 's-druitt',
        name: 'Montague John Druitt',
        alias: 'Avukat & Kriketçi',
        profession: 'Avukat / Öğretmen',
        avatarSeed: 'Druitt',
        ageAtTime: '31',
        motive: 'Ciddi ailevi akıl sağlığı geçmişi, annesinin tımarhaneye kapatılması sonrası başlayan öfke krizleri.',
        alibi: '31 Ağustos sabahı Blackheath kriket kulübünde maç kaydı var; ancak gece saatleri için doğrulanmış alibisi yok.',
        suspiciousFactors: [
          'Son cinayetten (9 Kasım) hemen sonra ortadan kayboldu ve Aralık ayında Thames nehrinde cepleri taş dolu bulundu.',
          'Müfettiş Melville Macnaghten gizli memorandumunda baş şüpheli olarak Druitt\'i işaret etti.'
        ],
        sherlockAssessment: 'Klasik dedüksiyon ilkesi: Son cinayetin vahşeti ile failin kendi canına kıyışı arasındaki kronolojik uyum güçlü bir psikolojik çöküş korelasyonudur.',
        communitySuspicionVote: 42
      },
      {
        id: 's-kosminski',
        name: 'Aaron Kosminski',
        alias: 'Whitechapel Berberi',
        profession: 'Berber Çırağı',
        avatarSeed: 'Kosminski',
        ageAtTime: '23',
        motive: 'Kadınlara karşı yoğun paranoyak hezeyanlar, işitsel halüsinasyonlar.',
        alibi: 'Whitechapel\'da kardeşleriyle yaşıyordu, gece serbestçe sokaklarda dolaşıyordu.',
        suspiciousFactors: [
          'Başmüfettiş Robert Anderson, kurban Catherine Eddowes\'u gören tek Yahudi tanığın Kosminski\'yi teşhis ettiğini ancak mahkemede tanıklık etmeyi reddettiğini yazdı.',
          '2014 yılında Eddowes\'un şalında yapılan mitokondriyal DNA analizinde Kosminski ailesiyle eşleşme iddia edildi.'
        ],
        sherlockAssessment: 'Ustura kullanma kabiliyeti anatomik bilgiye uyuyor; fakat Mitre Meydanı ile Miller\'s Court arasındaki soğukkanlı cerrahi planlama ağır bir şizofrenik hastayla ne kadar bağdaşır?',
        communitySuspicionVote: 39
      },
      {
        id: 's-sickert',
        name: 'Walter Sickert',
        alias: 'Bohem Ressam',
        profession: 'İzlenimci Ressam',
        avatarSeed: 'Sickert',
        ageAtTime: '28',
        motive: 'Viktorya dönemi ahlakına ve fahişelere duyulan saplantılı sanatsal ve cinsel nefret.',
        alibi: 'Cinayetlerin işlendiği tarihlerde Fransa\'da Dieppe\'de olduğunu öne sürdü, fakat seyahat biletleri şüpheli bulundu.',
        suspiciousFactors: [
          'Cinayet mahallerini birebir betimleyen karanlık tablolar yaptı (The Camden Town Murder serisi).',
          'Patricia Cornwell\'in DNA testlerinde Sickert\'in mektup pullarındaki DNA ile Ripper mektuplarındaki DNA uyumlu çıktı.'
        ],
        sherlockAssessment: 'Bir ressamın anatomiye hakimiyeti cerrahlardan farksızdır; ancak kanıtların çoğu spekülatif sanatsal yorumlara dayanmaktadır.',
        communitySuspicionVote: 19
      }
    ],
    evidenceList: [
      {
        id: 'ev-ripper-watch',
        name: '1888 Vintage Köstekli Cep Saati',
        code: 'EVD-1888-001',
        clueType: 'pocket_watch',
        category: 'Fiziksel Kanıt',
        description: 'Mary Ann Nichols\'un üzerinde bulunan, camı kırılmış ve darbe sonucu tam saat 03:45\'te durmuş pirinç kaplama köstekli cep saati.',
        historicalContext: 'Saat mekanizması cinayetin kesin anını (03:45) kanıtlar; araba sürücüsü Charles Cross kurbanı saat 03:40 ile 03:45 arasında bulduğunu beyan etmişti.',
        sherlockNote: 'Saatin arkasını 180° çevirip inceleyin. Dış kapak altındaki mikroskobik çiziklerde saat tamircisi markası ve kurbanın adının baş harfleri saklıdır.',
        locationFound: 'Buck\'s Row, Mary Ann Nichols\'un önlük cebi',
        dateFound: '31 Ağustos 1888',
        hasUvLayer: true,
        uvSecretText: 'KAN DAMLASI & FOSFORLU LÜMİNESANS: Saat kurma tepesinde failin sol el başparmağına ait kısmi parmak izi tespit edildi.',
        uvDescription: 'Adli ışık altında saat tepesinde gizli kan ve ter tortusu parlamaktadır.',
        hiddenInscription: 'İÇ MEKANİZMA KAPAĞI GRAVÜRÜ: "J. Miller Watchmakers, Whitechapel Rd. - M.A.N. 1881"',
        reverseSideDescription: 'Arka kapakta darbe çentiği ve saat ustasının minik damgası görünmektedir.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 50, y: 50, title: 'Durmuş Akrep & Yelkovan', description: '03:45 konumunda kilitlenmiş; zemberek dişlisi sert fiziksel darbeyle yamulmuş.' },
          { x: 75, y: 25, title: 'Kırık Kristal Cam', description: 'Arnavut kaldırımı taşına sert çarpma açısı 42 derece.' },
          { x: 50, y: 88, title: 'Köstek Zinciri Kopuk Halkası', description: 'Zincir halkası çekilerek değil, keskin bir kerpetenle kesilmiş.' }
        ]
      },
      {
        id: 'ev-ripper-letter',
        name: '"From Hell" Mektubu ve Balmumu Mührü',
        code: 'EVD-1888-002',
        clueType: 'cipher_letter',
        category: 'Adli Belge',
        description: 'Whitechapel Güvenlik Komitesi Başkanı George Lusk\'a insan böbreği parçasıyla birlikte gönderilen orijinal el yazması mektup.',
        historicalContext: 'Mektup şarap lekeleri ve kırmızı mürekkeple yazılmıştır. Diğer sahte gazete mektuplarından farklı olarak gerçek böbrek dokusuyla gelmesi orijinalliğini güçlendirir.',
        sherlockNote: 'Kağıdın arka yüzünü çevirip ışığa tuttuğunuzda postane damgası ve zarf kenarındaki kağıt liflerinin kalitesi failin sınıfı hakkında ipucu verir.',
        locationFound: 'George Lusk\'un Posta Kutusu, Mile End Road',
        dateFound: '15 Ekim 1888',
        hasUvLayer: true,
        uvSecretText: 'GİZLİ FİLİGRAN: "Joynson 1885" - Yüksek kaliteli hukuk bürolarında kullanılan lüks parşömen filigranı!',
        uvDescription: 'UV lamba açıldığında kağıdın iç dokusundaki filigran parlamakta ve alt köşedeki gizli parmak izi belirmektedir.',
        hiddenInscription: 'POSTA DAMGASI: "LONDON E. - OCT 15 - 88" damgası ve posta memurunun kırmızı işaretleme kalemi.',
        reverseSideDescription: 'Zarfın arka yüzünde kırılmış bordo balmumu mühür ve kurumuş kırmızı şarap lekesi.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 30, y: 25, title: '"From Hell" Başlığı', description: 'Soluk siyah mürekkep yerine demir mazı mürekkebi kullanılmış.' },
          { x: 70, y: 60, title: 'Yazım Yanlışları', description: 'Kasıtlı olarak yapılmış cehalet taklidi; gramer yapısı aslında eğitimli bir zihne işaret ediyor.' },
          { x: 80, y: 85, title: 'Kırmızı Balmumu Mühür', description: 'Üzerinde bir armaya ait olmayan düz oval baskı izi.' }
        ]
      },
      {
        id: 'ev-ripper-scene',
        name: 'Mitre Square Olay Yeri 360° Rekonstrüksiyonu',
        code: 'EVD-1888-003',
        clueType: 'crime_scene_360',
        category: 'Olay Yeri',
        description: 'Catherine Eddowes\'un 30 Eylül 1888 gece 01:45\'te öldürüldüğü Mitre Meydanı\'nın 360 derece detaylı adli ortam rekonstrüksiyonu.',
        historicalContext: 'Polis devriyesi meydandan 01:30\'da geçmişti. 15 dakikalık sürede cinayet işlendi, organlar alındı ve katil gaz lambalarının gölgesinde kayboldu.',
        sherlockNote: 'Meydandaki karanlık geçitleri, kilise duvarını ve gaz fenerinin menzilini 360 derece tarayın.',
        locationFound: 'Mitre Square, City of London',
        dateFound: '30 Eylül 1888',
        hasUvLayer: false,
        anglesCount: 72,
        zoomMacroDetails: [
          { x: 25, y: 65, title: 'Karanlık Kilise Geçidi', description: 'Katilin City sınırından Whitechapel yetki alanına kaçtığı Church Passage.' },
          { x: 55, y: 70, title: 'Olay Yeri Kaldırım Taşları', description: 'Kan lekelerinin yönü kurbanın hemen orada yere indirildiğini gösterir.' },
          { x: 85, y: 40, title: 'Kör Noktada Kalan Gaz Lambası', description: 'Lambanın titrek ışığı köşedeki kemeri aydınlatmıyordu.' }
        ]
      }
    ],
    unsolvedQuestions: [
      'Katil neden Mitre Square cinayetinden sonra Eddowes\'un kanlı önlüğünü Goulston Sokağı\'na bırakıp duvara antisemitik bir grafit yazdı?',
      'Mary Jane Kelly\'nin odasında şöminede neden başka bir kadına ait olabilecek giysiler yakıldı?',
      'Kasım 1888 sonrasında cinayetler neden aniden ve tamamen kesildi?'
    ]
  },
  {
    id: 'zodiac-killer',
    caseNumber: 'SFPD-1969-ZODIAC',
    title: 'Zodiac Katili & 340 Şifreli Kriptosu',
    subtitle: 'San Francisco Körfez Bölgesi’nin Kriptolu Kötülük Dehası',
    year: 1969,
    location: 'San Francisco Körfez Bölgesi & Vallejo, Kaliforniya, ABD',
    era: '20. Yüzyıl Ortası (1940-1975)',
    status: 'unsolved',
    difficulty: 'Sherlock Düzeyi',
    victimCount: 5,
    victims: ['David Faraday', 'Betty Lou Jensen', 'Darlene Ferrin', 'Cecelia Shepard', 'Paul Stine'],
    bannerColor: '#0f766e',
    summary: '1968-1969 yıllarında aşıkları ve taksi şoförlerini hedef alan, gazetelere gönderdiği sembollü şifrelerle FBI ve polis teşkilatıyla dalga geçen, cellat kostümü giymiş gizemli katil.',
    narrative: `Zodiac Katili, Lake Herman Road, Blue Rock Springs, Lake Berryessa ve San Francisco Presidio Heights'ta dehşet saçtı. Lake Berryessa'da üzerine beyaz kumaştan artı işaretli hedef sembolü işlenmiş bir cellat kukuletası giymişti.

Her cinayetin ardından gazetelere mektuplar yazdı ve "Bu şifreyi çözerseniz kim olduğumu öğreneceksiniz" dedi. 340 karakterli şifresi (Z-340) tam 51 yıl boyunca çözülemedi ve ancak 2020 yılında uluslararası bir kriptografi ekibi tarafından desifre edilebildi; ancak kimliği hala gizemini koruyor.`,
    forensicReport: `Adli ve Balistik İnceleme Bulguları:
1. Lake Berryessa olay yerinde 10.5 numara Wing Walker askeri bot izleri bulundu (bu botlar ABD Hava Kuvvetleri personeline dağıtılıyordu).
2. Paul Stine cinayetinde kullanılan silah 9mm Browning Hi-Power tabancadır; kovanlar kurbanın taksisinde bulunmuştur.
3. Paul Stine'ın kanlı gömleğinden yırtılan kumaş parçaları mektuplarla birlikte Chronicle gazetesine postalanmıştır; bu durum mektupların bizzat failden geldiğini şüpheye yer bırakmayacak şekilde doğrulamaktadır.`,
    coverImageTheme: 'zodiac_cipher_noir',
    timeline: [
      {
        id: 'zt1',
        date: '20 Aralık 1968',
        time: '23:15',
        title: 'Lake Herman Road Saldırısı',
        location: 'Solano County, CA',
        description: 'Lise öğrencileri Faraday ve Jensen park halindeki araçta vuruldu.',
        importance: 'high'
      },
      {
        id: 'zt2',
        date: '27 Eylül 1969',
        time: '18:15',
        title: 'Lake Berryessa Cellat Kostümlü Saldırı',
        location: 'Napa County, CA',
        description: 'Katil göğsünde daire içinde artı sembolü olan siyah kukuletayla Shepard ve Hartnell\'i iplerle bağlayıp bıçakladı. Araba kapısına tarihleri yazdı.',
        importance: 'critical'
      },
      {
        id: 'zt3',
        date: '11 Ekim 1969',
        time: '21:55',
        title: 'Taksi Şoförü Paul Stine Cinayeti',
        location: 'Washington & Cherry Sokakları, SF',
        description: 'Stine başından vuruldu. Katil gömleğinden parça kesti. Üç genç balkondan katili gördü ve polise eşkal verdi.',
        importance: 'critical'
      },
      {
        id: 'zt4',
        date: '8 Kasım 1969',
        time: 'Posta',
        title: '340 Karakterli Şifre (Z-340) Gönderildi',
        location: 'San Francisco Chronicle',
        description: '51 yıl kırılamayan ünlü 340 karakterlik şifre gazeteye ulaştı.',
        importance: 'high'
      }
    ],
    suspects: [
      {
        id: 's-allen',
        name: 'Arthur Leigh Allen',
        alias: 'Vallejo İlkokul Öğretmeni',
        profession: 'Eski Donanma Dalgıcı & Öğretmen',
        avatarSeed: 'ArthurAllen',
        ageAtTime: '36',
        motive: 'Çocuk tacizi suçlamasıyla öğretmenlikten atılma sonrası topluma ve polise duyulan derin kin.',
        alibi: 'Berryessa saldırısı günü tüplü dalışta olduğunu iddia etti.',
        suspiciousFactors: [
          'Zodiac marka kol saati takıyordu (üzerinde katilin kullandığı artı-daire sembolü vardı).',
          'Cinayetlerden önce arkadaşı Don Cheney\'e "İnsanları avlayacağını, adını Zodiac koyacağını ve mektuplar yazacağını" söyledi.',
          '10.5 numara Wing Walker askeri botlarına sahipti.'
        ],
        sherlockAssessment: 'En güçlü şüpheli adayı; ancak SFPD el yazısı analisti Sherwood Morrill Allen\'ın el yazısının mektuplarla uyuşmadığını belirtti ve DNA testi negatif çıktı.',
        communitySuspicionVote: 56
      },
      {
        id: 's-gaikowski',
        name: 'Richard Gaikowski',
        alias: 'Karşı Kültür Gazetecisi',
        profession: 'Good Times Gazetesi Editörü',
        avatarSeed: 'Gaikowski',
        ageAtTime: '33',
        motive: 'Medyayı manipüle etme saplantısı, anti-otoriter anarşist düşünceler.',
        alibi: 'Stine cinayeti gecesi gazete bürosunda olduğunu iddia etti.',
        suspiciousFactors: [
          'Paul Stine cinayetinin gerçekleştiği sokağın hemen yakınında yaşıyordu.',
          'Zodiac şifrelerinde "GYKE" harfleri belirgin şekilde yer alıyordu (Gaikowski\'nin takma adı).',
          'Polis muhabiri Pam Huckaby onun sesini Zodiac\'ın telefon sesine benzetti.'
        ],
        sherlockAssessment: 'Medya dinamiklerine ve gazete mizanpajına olan aşinalığı, mektupların Chronicle\'a nasıl teslim edileceğini bilmesiyle örtüşüyor.',
        communitySuspicionVote: 28
      },
      {
        id: 's-marshall',
        name: 'Lawrence Kane',
        alias: 'Gece Kulübü Güvenliği',
        profession: 'Kayıt Teknisyeni',
        avatarSeed: 'LawrenceKane',
        ageAtTime: '45',
        motive: 'Beyin hasarı sonrası kontrolsüz öfke patlamaları, suç geçmişi.',
        alibi: 'Net bir alibisi hiçbir saldırı için sunulamadı.',
        suspiciousFactors: [
          'Kurban Darlene Ferrin\'in kız kardeşi Linda, Kane\'in cinayetten önce Darlene\'i takip ettiğini söyledi.',
          'Paul Stine\'ın kız kardeşi onu taksiye binerken gördüğü adam olarak teşhis etti.'
        ],
        sherlockAssessment: 'Kurbanlarla kişisel temas olasılığı en yüksek şüpheli; fakat Zodiac\'ın mektuplarındaki entelektüel şifreleme karmaşıklığı ile Kane\'in profili tam örtüşmüyor.',
        communitySuspicionVote: 16
      }
    ],
    evidenceList: [
      {
        id: 'ev-zodiac-casing',
        name: '9mm Olay Yeri Balistik Kovanı (WCC 68)',
        code: 'EVD-1969-009',
        clueType: 'ballistic_casing',
        category: 'Balistik',
        description: 'Paul Stine\'ın taksisinde yolcu koltuğunun altında bulunan 9mm Luger kovanı. Western Cartridge Company 1968 üretimi.',
        historicalContext: 'Browning Hi-Power yarı otomatik tabancadan ateşlenmiştir. Tırnak ve iğne izleri mükemmel derecede korunmuştur.',
        sherlockNote: 'Kovanı 360 derece döndürerek gövdesindeki yiv-set sürtünme izlerine ve dip tablasındaki iğne vuruş derinliğine bakın. Eğimli vuruş iğnenin modifiye edildiğini gösterir.',
        locationFound: 'Washington & Cherry Caddesi, Taksi İçi',
        dateFound: '11 Ekim 1969',
        hasUvLayer: true,
        uvSecretText: 'BARUT TORTUSU & KİMYASAL İZ: Kurşun stifat ve baryum nitrat kalıntıları, askeri sınıf mühimmat partisine aittir.',
        uvDescription: 'Adli ışık altında kovan ağzındaki yanmamış kordit tanecikleri yeşilimsi sarı renkte parlar.',
        hiddenInscription: 'DİP TABLASI DAMGASI: "WCC 68 - 9MM LUGER" (Askeri sözleşmeli mühimmat)',
        reverseSideDescription: 'Kovan tabanında ateşleme iğnesinin bıraktığı hafif oval merkez kaçık çukur.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 50, y: 30, title: 'İğne Vuruş Çukuru', description: '0.42mm derinlik; Browning Hi-Power iğne profilini tam olarak yansıtır.' },
          { x: 35, y: 65, title: 'Çıkarıcı Tırnak Çiziği', description: 'Silahın fişeği yataktan çekerken bıraktığı mikroskobik çelik çizik.' },
          { x: 60, y: 80, title: 'Yiv Sürtünme Çizgileri', description: '6 sağ bükümlü namlu karakteristiği.' }
        ]
      },
      {
        id: 'ev-zodiac-cipher',
        name: 'Z-340 Kripto Silindiri & Şifre Anahtarı',
        code: 'EVD-1969-340',
        clueType: 'cipher_letter',
        category: 'Adli Belge',
        description: 'Chronicle gazetesine gönderilen 340 karakterlik şifre tablosunun kopyası ve 2020 yılında çözülen satranç atı hamlesi (diagonal) okuma şablonu.',
        historicalContext: 'Katil metni sol üstten sağa değil, 9 satırlık bloklarda 1 aşağı 2 sağa çapraz şekilde okunan çift aktarmalı transpozisyon şifresiyle gizlemişti.',
        sherlockNote: 'Belgenin arkasını çevirdiğinizde Zodiac\'ın eliyle çizdiği sembollerin baskı şiddetini ve masadaki su lekesini görebilirsiniz.',
        locationFound: 'San Francisco Chronicle Haber Merkezi',
        dateFound: '8 Kasım 1969',
        hasUvLayer: true,
        uvSecretText: 'ÇÖZÜLMÜŞ METİN: "UMARIM BENİ YAKALAMAYA ÇALIŞIRKEN ÇOK EĞLENİYORSUNUZDUR... TELEVİZYONDAKİ O BEN DEĞİLDİM... GAZ ODASINDAN KORKMUYORUM ÇÜNKÜ CENNETE GİDECEĞİM..."',
        uvDescription: 'UV lamba altında şifre harflerinin arkasına gizlenmiş satır çizgileri parlamaktadır.',
        hiddenInscription: 'ARKA YÜZ DAMGASI: "SF CHRONICLE ARCHIVE - NOV 1969 - FORENSIC LAB COPY"',
        reverseSideDescription: 'Kağıdın arka yüzünde karbon kağıdı izleri ve posta pulunun arka tutkal lekesi.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 20, y: 20, title: 'Daire İçinde Artı Sembolü', description: 'Katilin alamet-i farikası; cetvelsiz, serbest elle çizilmiş.' },
          { x: 50, y: 50, title: 'Kripto Sembolleri', description: 'Astrolojik semboller, Mors alfabesi ve Yunan harflerinin karışımı.' },
          { x: 75, y: 80, title: 'Köşegen Şablon Çizgisi', description: 'At hamlesi çözücü matris doğrultusu.' }
        ]
      }
    ],
    unsolvedQuestions: [
      'Lake Berryessa saldırısında kullanılan cellat kostümü nereden temin edildi veya nerede imha edildi?',
      'Paul Stine cinayetinde gençlerin balkondan gördüğü şüpheli ile olay yerine koşan polis memurları Fouke ve Zelms\'in gördüğü adam aynı kişi miydi?',
      'Kalan 2 kısa şifre (Z-13 "My name is ----" ve Z-32) failin gerçek ismini mi barındırıyor?'
    ]
  },
  {
    id: 'somerton-man',
    caseNumber: 'SAPOL-1948-TAMAM',
    title: 'Somerton Adamı & "Tamam Shud" Gizemi',
    subtitle: 'Soğuk Savaş Casusu mu, Kırık Bir Kalp mi?',
    year: 1948,
    location: 'Somerton Plajı, Adelaide, Güney Avustralya',
    era: '20. Yüzyıl Ortası (1940-1975)',
    status: 'reopened',
    difficulty: 'Zorlu Bulmaca',
    victimCount: 1,
    victims: ['Bilinmeyen Erkek (Carl Webb - 2022 DNA iddiası)'],
    bannerColor: '#c2410c',
    summary: '1 Aralık 1948 sabahı Adelaide sahilinde dalgakırana yaslanmış bulunan kusursuz giyimli adam. Cebindeki mikro dikişte Farsça "Tamam Shud" (Bitti) yazılı kağıt parçası ve çözülemeyen şifre.',
    narrative: `Sabahın erken saatlerinde Somerton sahilinde bulunan yaklaşık 40-45 yaşlarındaki adamın üzerinde hiçbir kimlik yoktu. Kıyafetlerindeki tüm etiketler jiletle dikkatle sökülmüştü. Ağzında yarısı içilmiş bir sigara vardı.

Aylar sonra tren istasyonu emanetinde bulunan bavulundaki kıyafetlerde de etiketler kesilmişti. Ancak pantolonunun gizli saat cebinde, dikişin içine kıvrılmış küçücük bir kağıt rulosu bulundu: Ömer Hayyam'ın Rubaiyat kitabının son sayfasından yırtılmış "Tamām Shud" sözcüğü. Arabasına bu kitabın atıldığı kişi polise başvurduğunda, kitabın arkasına kurşun kalemle bastırılarak yazılmış ve sadece eğik ışıkta görülen 5 satırlık gizli bir kod bulundu.`,
    forensicReport: `Adli Tıp ve Toksikoloji Raporu:
1. Ölüm nedeni: Dalak normalin üç katı büyüklükteydi, karaciğerde ve midede aşırı kanlanma vardı; bilinmeyen hızlı emilen bir kardiyak glikozid zehirlenmesine işaret ediyordu.
2. Ayak parmakları kama şeklinde ve baldır kasları yüksek topuk veya bale ayakkabısı giyen insanlara benzer şekilde belirgindi.
3. Kurbanın diş yapısı ve kulak anatomisi (kulak memesi anomalisi) dünya nüfusunun sadece %1'inde görülen nadir bir genetik varyasyona sahipti.`,
    coverImageTheme: 'somerton_beach_mystery',
    timeline: [
      {
        id: 'st1',
        date: '30 Kasım 1948',
        time: '19:00 - 20:00',
        title: 'Sahildeki Son Görgü Tanıkları',
        location: 'Somerton Plajı Kumsalı',
        description: 'Çiftler adamın dalgakırana yaslanıp sağ kolunu havaya kaldırıp indirdiğini gördü; sarhoş sandılar.',
        importance: 'high'
      },
      {
        id: 'st2',
        date: '1 Aralık 1948',
        time: '06:30',
        title: 'Cesedin Bulunuşu',
        location: 'Somerton Plajı Dalgakıranı',
        description: 'John Lyons cesedi buldu. Baş taş duvara yaslı, bacaklar uzatılmış, sigara yakasında duruyordu.',
        importance: 'critical'
      },
      {
        id: 'st3',
        date: '14 Ocak 1949',
        time: '11:00',
        title: 'Adelaide Tren Garında Bavulun Keşfi',
        location: 'Gar Emanet Bölümü',
        description: '30 Kasım sabahı emanete bırakılmış kahverengi bavul bulundu. İçinde çinko alaşımlı makas ve dikiş ipliği vardı.',
        importance: 'high'
      },
      {
        id: 'st4',
        date: 'Nisan 1949',
        time: 'Laboratuvar',
        title: '"Tamam Shud" Kağıdının Bulunuşu',
        location: 'Patoloji Laboratuvarı',
        description: 'Patolog John Cleland cesedin pantolonundaki gizli terzi dikişinde sıkıştırılmış kağıt rulosunu çıkardı.',
        importance: 'critical'
      }
    ],
    suspects: [
      {
        id: 's-jestyn',
        name: 'Jessica Ellen Harkness (Jo Thomson / "Jestyn")',
        alias: 'Hemşire Jestyn',
        profession: 'Hemşire',
        avatarSeed: 'Jestyn',
        ageAtTime: '27',
        motive: 'Yasak ilişki, gayrimeşru çocuk sırrının açığa çıkması veya Soğuk Savaş casusluk bağlantıları.',
        alibi: 'Olay gecesi evinde çocuğuyla olduğunu söyledi.',
        suspiciousFactors: [
          'Cesedin bulunduğu Somerton kumsalına sadece 400 metre mesafede yaşıyordu.',
          'Rubaiyat kitabının arkasında onun telefon numarası yazılıydı.',
          'Polis adamın alçıdan yapılmış büstünü ona gösterdiğinde bayılacak gibi oldu ama adamı tanımadığını söyledi.'
        ],
        sherlockAssessment: 'Klasik Holmes tespiti: İfadesindeki duygusal panik ve büst karşısındaki istemsiz fizyolojik reaksiyon kesin bir tanışıklığı kanıtlar. Sessizliği kişisel değil, kurumsal bir koruma refleksi olabilir.',
        communitySuspicionVote: 51
      },
      {
        id: 's-boxall',
        name: 'Alf Boxall',
        alias: 'Yüzbaşı Boxall',
        profession: 'Ordu İstihbarat Subayı',
        avatarSeed: 'AlfBoxall',
        ageAtTime: '38',
        motive: 'İstihbarat sızıntısı, sahte kimlik operasyonu.',
        alibi: 'Polis onu bulduğunda Sidney\'de hayattaydı ve Jessica\'nın ona 1945\'te hediye ettiği Rubaiyat kitabını sapasağlam gösterdi.',
        suspiciousFactors: [
          'Jessica\'nın imzalı kitabına sahipti; polisin cesedin Alf Boxall olduğunu sanmasına yol açmıştı.',
          'Avustralya ordusunda Su Taşıma İstihbarat bölümünde görev yapmıştı.'
        ],
        sherlockAssessment: 'Boxall\'ın hayatta olması kitabı ikinci bir kopyanın varlığına ve çift kutuplu bir casusluk halkasına bağlamaktadır.',
        communitySuspicionVote: 25
      },
      {
        id: 's-webb',
        name: 'Carl "Charles" Webb',
        alias: 'Kayıp Melbourne Mühendisi',
        profession: 'Elektrik Mühendisi & Alet Yapımcısı',
        avatarSeed: 'CarlWebb',
        ageAtTime: '43',
        motive: 'Terk eden eşi Dorothy Robertson\'u aramak için Adelaide\'a gelmiş olabileceği düşünülüyor.',
        alibi: 'Nisan 1947\'den beri kayıp ilanındaydı.',
        suspiciousFactors: [
          '2022 DNA analizlerinde saç örneğinden Webb ailesi soyağacıyla eşleşme bulundu.',
          'Bavuldaki kıyafet tamir tarzı ve teknik aletler Webb\'in mesleğine uymaktadır.'
        ],
        sherlockAssessment: 'Biyolojik kimlik Carl Webb olsa bile cebindeki zehir, Farsça şifre ve Jessica Thomson\'ın telefon numarası hala açıklanmamıştır.',
        communitySuspicionVote: 24
      }
    ],
    evidenceList: [
      {
        id: 'ev-tamam-shud',
        name: '"Tamam Shud" Yırtık Parşömen Parçası',
        code: 'EVD-1948-TS',
        clueType: 'cipher_letter',
        category: 'Fiziksel Kanıt',
        description: 'Ömer Hayyam\'ın Rubaiyat kitabının arka sayfasından yırtılmış, pantolonun gizli astar cebinde sıkıca rulo yapılmış minik kağıt parçası.',
        historicalContext: '"Tamam Shud" Farsça "Tamamlandı / Sona Erdi" anlamına gelir. Kağıdın lifleri Adelaide polisine teslim edilen kitabın yırtık sayfasıyla mikroskobik olarak tam eşleşti.',
        sherlockNote: 'Kağıdı 180 derece çevirip eğik ışıkla inceleyin. Arka yüzünde kurşun kalemin kağıda uyguladığı baskı izlerini okuyabilirsiniz.',
        locationFound: 'Kurbanın gizli cep dikişi, Somerton',
        dateFound: 'Nisan 1949',
        hasUvLayer: true,
        uvSecretText: 'ŞİFRELİ HARF BLOKLARI: WRGOABABD - MLIAOI - WTBIMPANETP - MLIABOA - ITTMTSAMSTGAB (Soğuk savaş tek kullanımlık şifre anahtarı)',
        uvDescription: 'Eğik adli ışık altında kabartma kurşun kalem izleri fosfor gibi ortaya çıkar.',
        hiddenInscription: 'ARKA YÜZ BASKI İZİ: "TAMĀM SHUD" - Kalın siyah matbaa harfleriyle basılmış.',
        reverseSideDescription: 'Yırtılmış arka yüzünde kitabın son dizesinin harf parçacıkları ve sararmış selüloz lifleri.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 30, y: 50, title: 'Yırtık Kenar Lifleri', description: 'Kitabın son sayfasıyla mikroskopta tam oturan lif kırılma hattı.' },
          { x: 65, y: 50, title: 'Farsça "TAMĀM SHUD"', description: 'Geleneksel ligatür yazı stili.' },
          { x: 50, y: 85, title: 'Gizli Cep Kırışıklıkları', description: 'Nemli ortamda cepte sıkıştırıldığı için dairesel kıvrım almış.' }
        ]
      },
      {
        id: 'ev-somerton-vial',
        name: 'Kurbanın Eczacı İlaç Şişesi & Zehir Numunesi',
        code: 'EVD-1948-MED',
        clueType: 'poison_vial',
        category: 'Toksikoloji',
        description: 'Bavulda bulunan, etiketi kısmen kazınmış kehribar renkli tıbbi flakon. Kalıntı analizinde tespit edilemeyen alkaloid tortusu.',
        historicalContext: '1948 teknolojisinde kanda iz bırakmayan dijitalis veya yüksük otu türevi zehirlerin bu tarz tıbbi tüplerde taşındığı tahmin ediliyordu.',
        sherlockNote: 'Şişeyi 360 derece döndürerek dip tortusuna ve boyun kısmındaki balmumu tıkaç izine bakın.',
        locationFound: 'Adelaide Garı Kahverengi Bavul',
        dateFound: '14 Ocak 1949',
        hasUvLayer: true,
        uvSecretText: 'ORGANİK ALKALOİD REAKSİYONU: Yüksükotu (Digitalis purpurea) glikozidleri ve kloroform kalıntısı!',
        uvDescription: 'Flakon dibinde mavi-yeşil floresan ışıma gösteren kristalize tortu.',
        hiddenInscription: 'CAM ALTI DAMGASI: "Faulding & Co. Adelaide - 1947 Tıbbi Cam"',
        reverseSideDescription: 'Etiketin arkasında reçetesiz hazırlanmış gizli karışım izi.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 50, y: 30, title: 'Balmumu Tıkaç Ağzı', description: 'Hava almaması için cerrahi balmumuyla mühürlenmiş.' },
          { x: 45, y: 65, title: 'Kazınmış Etiket', description: 'Eczacı ismi jiletle dikkatle yok edilmiş.' },
          { x: 50, y: 90, title: 'Kristalize Tortu', description: 'Bilinmeyen kardiyotoksik bileşik tortusu.' }
        ]
      }
    ],
    unsolvedQuestions: [
      'Kurbanın vücudundaki zehir tam olarak neydi ve vücuda nasıl enjekte veya zerk edildi?',
      'Jessica Harkness\'ın evinde Somerton kumsalına bakan pencerede neden o gece ışık sabaha kadar açıktı?',
      'Kitabın arkasındaki 5 satırlık kod hangi şifreleme algoritmasıyla çözülebilir?'
    ]
  },
  {
    id: 'black-dahlia',
    caseNumber: 'LAPD-1947-DAHLIA',
    title: 'Kara Dalya (Black Dahlia / Elizabeth Short)',
    subtitle: 'Hollywood’un Işıkları Altında İşlenen Vahşi Cinayet',
    year: 1947,
    location: 'Leimert Park, Los Angeles, Kaliforniya, ABD',
    era: '20. Yüzyıl Ortası (1940-1975)',
    status: 'cold_case',
    difficulty: 'Zorlu Bulmaca',
    victimCount: 1,
    victims: ['Elizabeth Short (22)'],
    bannerColor: '#4c0519',
    summary: '15 Ocak 1947 sabahı Los Angeles\'ta boş bir arazide bedeni ikiye ayrılmış, yıkanmış ve kanı tamamen akıtılmış halde bulunan Elizabeth Short\'un trajik cinayeti.',
    narrative: `Hollywood yıldızı olma hayalleriyle Los Angeles'a gelen 22 yaşındaki Elizabeth Short, en son 9 Ocak 1947'de Biltmore Oteli'nin lobisinde canlı görüldü. 6 gün sonra Norton Caddesi'ndeki boş bir arazide cansız bedeni bulundu.

Katil cesedi profesyonel bir cerrah gibi bel hizasından ikiye bölmüş, iç organlarını yıkamış ve yüzüne "Guglielmo gülümsemesi" (Glasgow smile) şeklinde 7 santimetrelik kesikler atmıştı. Olay yerinde tek bir damla kan bile yoktu; cinayet başka bir yerde, profesyonel bir ameliyathanede veya küvette işlenmişti. Gazetelere Elizabeth'in eşyalarını postayla gönderen katil, hiçbir zaman yakalanamadı.`,
    forensicReport: `LAPD Adli Otopsi İncelemesi:
1. Bedendeki ikiye ayırma işlemi 2. ve 3. bel omurları (L2-L3) arasından "hemikorporektomi" adı verilen son derece spesifik bir cerrahi prosedürle yapılmıştır. Bu işlem tıp fakültesi eğitimi gerektirir.
2. Kan kaybı ölümden önce değil, ölüm sonrasında özel bir antikoagülan ile yıkanarak gerçekleştirilmiştir.
3. Kurbanın ayak bileklerinde ve bileklerinde iple asılma ve bağlanma izleri tespit edilmiştir.`,
    coverImageTheme: 'vintage_noir_la',
    timeline: [
      {
        id: 'bdt1',
        date: '9 Ocak 1947',
        time: '18:30',
        title: 'Biltmore Oteli Lobisi',
        location: 'Downtown Los Angeles',
        description: 'Elizabeth Short otelin lobisinde telefon görüşmesi yaparken ve kapıdan çıkarken görüldü. Bu onun son canlı tanıklığıydı.',
        importance: 'high'
      },
      {
        id: 'bdt2',
        date: '15 Ocak 1947',
        time: '10:00',
        title: 'Cesedin Keşfi',
        location: '3825 S Norton Ave, Leimert Park',
        description: 'Yerel bir anne çocuğuyla yürürken manken sandığı bedeni buldu. Çimlerde otomobil lastik izleri vardı.',
        importance: 'critical'
      },
      {
        id: 'bdt3',
        date: '24 Ocak 1947',
        time: 'Posta İletimi',
        title: 'Katilin İtiraf Paketi Ulaştı',
        location: 'Los Angeles Examiner Gazetesi',
        description: 'Gazete editörüne Elizabeth\'in doğum belgesi, fotoğrafları, adres defteri benzinle silinmiş bir kutuda postalandı.',
        importance: 'critical'
      }
    ],
    suspects: [
      {
        id: 's-hodel',
        name: 'Dr. George Hill Hodel',
        alias: 'Sowden House Doktoru',
        profession: 'Cerrah / Zührevi Hastalıklar Uzmanı',
        avatarSeed: 'GeorgeHodel',
        ageAtTime: '39',
        motive: 'Sadomazoşist hezeyanlar, kızı Tamar\'ı taciz davası sonrası kontrol kaybı, sürrealist sanat saplantısı (Man Ray etkisi).',
        alibi: 'O tarihlerde kliniğinde olduğunu söyledi ancak teyit edilemedi.',
        suspiciousFactors: [
          'LAPD 1950\'de Hodel\'in lüks Sowden malikanesine gizli mikrofon yerleştirdi. Kayıtlarda: "Kara Dalya\'yı öldürdüğümü varsayalım. Bunu şimdi kanıtlayamazlar..." dediği kayıtlara geçti.',
          'Hemikorporektomi cerrahi kesimini yapabilecek üst düzey cerrahi anatomiye sahipti.',
          'Oğlu emekli LAPD dedektifi Steve Hodel, babasının fotoğraf albümünde Elizabeth Short\'un fotoğraflarını buldu.'
        ],
        sherlockAssessment: 'Cerrahi yetkinlik, mekan konumu ve polis dinleme bantlarındaki doğrudan ifadeler onu kriminoloji tarihinin en güçlü fail adaylarından biri yapar.',
        communitySuspicionVote: 67
      },
      {
        id: 's-hansen',
        name: 'Mark Hansen',
        alias: 'Florentine Gardens Sahibi',
        profession: 'Gece Kulübü İşletmecisi',
        avatarSeed: 'MarkHansen',
        ageAtTime: '55',
        motive: 'Elizabeth\'in onun evinde kalıp aşk tekliflerini reddetmesi.',
        alibi: 'Kulüpte personelle birlikteydi.',
        suspiciousFactors: [
          'Katilin Examiner gazetesine gönderdiği adres defteri Mark Hansen\'a aitti.',
          'Elizabeth cinayetten günler önce Hansen\'ın evinden ayrılmıştı.'
        ],
        sherlockAssessment: 'Kişisel hırs ve adres defteri Hansen\'ı şüpheli yapsa da cerrahi kesim tekniği bir gece kulübü sahibinin kabiliyetlerinin fersah fersah ötesindedir.',
        communitySuspicionVote: 21
      },
      {
        id: 's-dillon',
        name: 'Leslie Dillon',
        alias: 'Eski Cenaze Levazımatçısı',
        profession: 'Yazar & Cenaze Levazımatçısı',
        avatarSeed: 'LeslieDillon',
        ageAtTime: '27',
        motive: 'Otopsi tekniklerine aşinalık, psikopati.',
        alibi: 'Olay günlerinde San Francisco\'da olduğunu iddia etti.',
        suspiciousFactors: [
          'LAPD Dedektifi Harry Hansen onu baş şüpheli olarak sorguladı.',
          'Cinayetin detaylarını basına sızmadan önce biliyordu.'
        ],
        sherlockAssessment: 'Ceset yıkama ve tahnit etme bilgisi yüksekti; fakat Dr. Hodel\'in siyasi bağlantıları nedeniyle Dillon\'ın günah keçisi yapıldığı iddia edilmiştir.',
        communitySuspicionVote: 12
      }
    ],
    evidenceList: [
      {
        id: 'ev-dahlia-scalpel',
        name: 'Adli Cerrahi Bisturi & Çelik Neşter',
        code: 'EVD-1947-SURG',
        clueType: 'ballistic_casing',
        category: 'Fiziksel Kanıt',
        description: '1940\'lar cerrahi paslanmaz çelikten üretilmiş, 10 numara eğimli cerrahi kesi neşteri. Kesilerdeki mikroskobik çelik alaşım iziyle uyumlu.',
        historicalContext: 'Elizabeth Short\'un bedenindeki insizyonlarda hiç tereddüt izi yoktu; kesiler tek hamlede profesyonel anatomi neşteriyle açılmıştı.',
        sherlockNote: 'Aleti 360 derece döndürün. Sapındaki tırtıklı kavrama desenine ve üretici damgasına bakın.',
        locationFound: 'Dr. Hodel\'in Kliniği Envanter İncelemesi',
        dateFound: '1947',
        hasUvLayer: true,
        uvSecretText: 'LÜMİNOL TEPKİSİ: Neşter yuvasında eski hemoglobin korozyon izleri!',
        uvDescription: 'Çelik metal üzerinde mavi parlayan organik kan kalıntı izleri.',
        hiddenInscription: 'SAP DAMGASI: "SKLAR USA - STAINLESS 1944 SURGICAL"',
        reverseSideDescription: 'Neşterin arka yüzünde kilit yuvası ve sterilizasyon otoklav izi.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 30, y: 50, title: 'Bisturi Ağzı', description: '0.02mm keskinlik derecesi; kıkırdak ve tendonları ezmeden kesebilecek yapıda.' },
          { x: 60, y: 50, title: 'Cerrahi Tutuş Deseni', description: 'Cerrah parmaklarının kaymasını önleyen çapraz tırtıklar.' },
          { x: 85, y: 50, title: 'Üretim Seri Kodu', description: 'Askeri tıp birliklerine dağıtılan 1944 parti numarası.' }
        ]
      }
    ],
    unsolvedQuestions: [
      'Katilin Examiner gazetesine gönderdiği kutunun üzerindeki benzin izleri neden parmak izlerini tamamen sildi?',
      'LAPD üst düzey yöneticileri neden Dr. George Hodel dinleme kayıtlarını onlarca yıl gizli tuttu?',
      'Elizabeth Short\'un Biltmore Oteli\'nden ayrıldıktan sonraki 6 gün nerede tutulduğu hala meçhuldür.'
    ]
  },
  {
    id: 'db-cooper',
    caseNumber: 'FBI-1971-NORJAK',
    title: 'D.B. Cooper & Gökyüzü Kaçışı',
    subtitle: 'Ticari Havacılık Tarihinin Tek Çözülemeyen Uçak Korsanlığı',
    year: 1971,
    location: 'Portland - Seattle - Reno Hava Sahası, ABD',
    era: '20. Yüzyıl Ortası (1940-1975)',
    status: 'cold_case',
    difficulty: 'Orta Düzey',
    victimCount: 0,
    victims: ['Uçak Mürettebatı ve Yolcular (Rehine / Zarar Görmedi)'],
    bannerColor: '#1e3a8a',
    summary: '24 Kasım 1971\'de Boeing 727 uçağını kaçıran, 200.000 dolar fidye ve 4 paraşüt alıp dondurucu fırtınada uçağın kuyruk merdiveninden gece karanlığına atlayan meçhul adam.',
    narrative: `Şükran Günü arifesinde Dan Cooper adına bilet alan takım elbiseli, güneş gözlüklü zarif bir adam, Portland'dan kalkan Northwest Orient 305 sefer sayılı uçağa bindi. Hostes Florence Schaffner'a çantasında bomba olduğunu yazan bir not uzattı.

Talepleri netti: 200.000 dolar nakit (hepsi 20 dolarlık banknotlar) ve 4 adet sivil paraşüt. Seattle havaalanında yolcuları serbest bıraktı, yakıt aldırdı ve uçağı Reno yönüne uçurttu. Uçak saatte 300 km hızla 10.000 fit irtifada giderken, Cooper uçağın arkasındaki merdiveni açtı ve dondurucu yağmurun altında karanlığa atladı. Arkasında sadece siyah klipsli kravatı kaldı.`,
    forensicReport: `FBI "NORJAK" Dosyası Bulguları:
1. Kravat üzerinde elektron mikroskobuyla yapılan analizlerde saf titanyum parçacıkları bulundu. 1971 yılında saf titanyum sadece havacılık ve kimyasal reaktör fabrikalarında (Boeing taşeronları) kullanılıyordu.
2. 1980 yılında 8 yaşındaki Brian Ingram, Columbia Nehri kıyısında Tina Bar kumsalında kumun içine gömülmüş çürümüş 5.800 dolarlık Cooper fidye parası buldu; banknotların seri numaraları FBI listesiyle eşleşti.
3. Cooper atladığı sırada hava sıcaklığı sıfırın altında 10 dereceydi ve 100 km/s rüzgar vardı; hayatta kalıp kalamadığı asla doğrulanamadı.`,
    coverImageTheme: 'db_cooper_sky_noir',
    timeline: [
      {
        id: 'dbt1',
        date: '24 Kasım 1971',
        time: '14:50',
        title: 'Bomba Notu İletildi',
        location: 'Northwest 305 Seferi, Portland',
        description: 'Cooper hostese notu verdi ve çantasındaki kırmızı dinamit benzeri silindirleri gösterdi.',
        importance: 'high'
      },
      {
        id: 'dbt2',
        date: '24 Kasım 1971',
        time: '17:45',
        title: 'Seattle İnişi & Takas',
        location: 'Seattle-Tacoma Havalimanı',
        description: '36 yolcu para ve paraşütler karşılığı tahliye edildi. Uçak Reno\'ya gitmek üzere tekrar havalandı.',
        importance: 'high'
      },
      {
        id: 'dbt3',
        date: '24 Kasım 1971',
        time: '20:13',
        title: 'Tarihi Atlama',
        location: 'Ariel / Merwin Gölü, Washington Eyaleti',
        description: 'Kokpitte kuyruk basıncında ani dalgalanma kaydedildi. Cooper kuyruk merdiveninden parayla atlamıştı.',
        importance: 'critical'
      },
      {
        id: 'dbt4',
        date: '10 Şubat 1980',
        time: '13:00',
        title: 'Tina Bar\'da Paraların Bulunuşu',
        location: 'Columbia Nehri Kıyısı',
        description: 'Brian Ingram kumda lastik bantları çürümüş 3 paket 20 dolarlık banknot buldu.',
        importance: 'high'
      }
    ],
    suspects: [
      {
        id: 's-mccoy',
        name: 'Richard McCoy Jr.',
        alias: 'Yeşil Bereli Pilot',
        profession: 'Eski Özel Kuvvetler Helikopter Pilotu',
        avatarSeed: 'McCoy',
        ageAtTime: '29',
        motive: 'Mali borçlar, macera arayışı.',
        alibi: 'Şükran gününde Utah\'ta ailesiyle olduğunu iddia etti.',
        suspiciousFactors: [
          'Cooper olayından sadece 5 ay sonra birebir aynı yöntemle United Airlines uçağını kaçırdı ve paraşütle atladı.',
          'Uçaktan paraşütle atlama konusunda mükemmel askeri eğitime sahipti.'
        ],
        sherlockAssessment: 'Taklit cinayet veya suç ilkesi: McCoy yöntemi mükemmel kopyalamıştı ancak hostesler Cooper\'ın yaşının 40-45 olduğunu ve McCoy\'dan farklı bir zarafete sahip olduğunu belirttiler.',
        communitySuspicionVote: 44
      },
      {
        id: 's-rackstraw',
        name: 'Robert Rackstraw',
        alias: 'Eski Ordu Pilotu',
        profession: 'Elektronik Teknisyeni & Helikopter Pilotu',
        avatarSeed: 'Rackstraw',
        ageAtTime: '28',
        motive: 'Askeri mahkemeden atılma intikamı, sahte kimlikler.',
        alibi: 'O tarihte İsviçre\'de olduğunu öne sürdü.',
        suspiciousFactors: [
          'Özel Dedektif Tom Colbert\'in araştırma grubu onu baş şüpheli ilan etti.',
          'Fidye mektuplarındaki gizli askeri kodlar Rackstraw\'un birlik numarasıyla eşleşti.'
        ],
        sherlockAssessment: 'Askeri sicil ve teknik bilgi uyumlu; fakat FBI 2016 yılında davayı aktif soruşturan birimden çıkarttığında Rackstraw\'u elemişti.',
        communitySuspicionVote: 38
      },
      {
        id: 's-klups',
        name: 'Sheridan Peterson',
        alias: 'Boeing Test Teknisyeni',
        profession: 'Boeing Tekniker & Paraşütçü',
        avatarSeed: 'Peterson',
        ageAtTime: '44',
        motive: 'Kurumsal muhaliflik, para ihtiyacı.',
        alibi: 'Asya\'da mülteci kamplarında görevde olduğunu söyledi.',
        suspiciousFactors: [
          'Kravattaki titanyum parçacıklarının geldiği Boeing fabrikasında bizzat çalışmıştı.',
          'Yaşı ve yüz yapısı FBI\'ın çizdiği eskizle inanılmaz derecede benzerdi.'
        ],
        sherlockAssessment: 'Titanyum tozu ve Boeing tecrübesi teknik dedüksiyon açısından son derece tutarlı bir puzzle parçasıdır.',
        communitySuspicionVote: 18
      }
    ],
    evidenceList: [
      {
        id: 'ev-cooper-tie',
        name: 'JC Penney Siyah Klipsli Kravat & Sedef İğne',
        code: 'EVD-1971-TIE',
        clueType: 'pocket_watch',
        category: 'Fiziksel Kanıt',
        description: 'Cooper\'ın Boeing 727\'nin 18E numaralı koltuğunda unuttuğu siyah ince kravat ve üzerindeki sedefli kravat iğnesi.',
        historicalContext: '2008 ve 2011 FBI mikroskopik analizlerinde kravatta saf metalik titanyum, bizmut ve antimon partikülleri bulundu.',
        sherlockNote: 'Kravat klipsini 360 derece döndürün. Metal arka kısmındaki aşınma ve iğne yuvasındaki tekstil lifleri kurbanın sol elini kullandığına işaret eder.',
        locationFound: 'Boeing 727, Koltuk 18E',
        dateFound: '25 Kasım 1971',
        hasUvLayer: true,
        uvSecretText: 'TİTANYUM VE BİZMUT KİMYASAL TESPİTİ: Partiküller metal işleme atölyesi kimyasal spektrogramıyla örtüşmektedir.',
        uvDescription: 'Kravat dokusunda endüstriyel metal tozları floresan mavi parıltı verir.',
        hiddenInscription: 'KLİPS İÇİ DAMGASI: "JC Penney Co. - Towncraft All Polyester - Made in USA"',
        reverseSideDescription: 'Kravatın arka ters astarında kumaş yıpranma izi ve iğne deliği.',
        anglesCount: 36,
        zoomMacroDetails: [
          { x: 50, y: 35, title: 'Sedef Kravat İğnesi', description: 'Geleneksel pirinç gövdeli doğal sedef taş.' },
          { x: 45, y: 65, title: 'Titanyum Partikül Bölgesi', description: 'Elektron mikroskobuyla tespit edilen 10 mikronluk saf titanyum tanecikleri.' },
          { x: 50, y: 90, title: 'Klips Mekanizması', description: 'Kolayca yakaya takılıp çıkarılan yaylı çelik klips.' }
        ]
      }
    ],
    unsolvedQuestions: [
      'Tina Bar kumsalında bulunan 5.800 dolar nehir akıntısıyla mı oraya taşındı, yoksa biri tarafından kasıtlı olarak mı gömüldü?',
      'Cooper atlayıştan sağ kurtulduysa neden kalan 194.200 doların hiçbir banknotu piyasaya çıkmadı?',
      'Uçaktan atladığı yer Merwin Gölü çevresi miydi yoksa rüzgar onu Lewis Nehri vadisine mi sürükledi?'
    ]
  }
];
