/* Nachiyar Chit Fund — official contact details and scheme data (from company posters) */
window.NCF = {
  company: { en: "Nachiyar Chit Fund Private Limited", ta: "நாச்சியார் சிட் ஃபண்ட் பிரைவேட் லிமிடெட்" },
  phone: "8056724462",
  phoneIntl: "+918056724462",
  landline: "0416-2214462",
  landlineIntl: "+914162214462",
  whatsapp: "9043420099",
  whatsappIntl: "919043420099",
  email: "nachiyarchitfundprivatelimited@gmail.com",
  website: "nachiyarchitfundprivatelimited.com",
  websiteUrl: "https://nachiyarchitfundprivatelimited.com",
  address: { en: "2nd Floor, Vellore City Centre, Officers Line, Vellore – 632001, Tamil Nadu, India. Near Lalitha Jewellers, Opposite Maharani Ice Cream Shop.", ta: "2வது மாடி, வேலூர் சிட்டி சென்டர், ஆபீசர்ஸ் லைன், வேலூர் – 632001, தமிழ்நாடு, இந்தியா. லலிதா ஜுவல்லர்ஸ் அருகில், மகாராணி ஐஸ்கிரீம் கடை எதிரில்." },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Vellore+City+Centre%2C+Officers+Line%2C+Vellore+632001%2C+Tamil+Nadu",
  instagram: "nachiyar_chit_finance",
  instagramUrl: "https://www.instagram.com/nachiyar_chit_finance/",
  facebook: "nachiyar_chit_finance",
  facebookUrl: "https://www.facebook.com/nachiyar_chit_finance",
  since: 2018,
  reg: { CIN: "U64990TN2026PTC198604", PAN: "AAMCN1549G", TAN: "CHEN18450F", UDYAM: "UDYAM-TN-30-0123273" }
};

/* Schedule rows: [month, you pay, dividend, prize amount received if you take the chit that month, (optional) total paid so far] */
window.SCHEMES = [
  {
    id: "silver", medal: "silver", icon: "coin",
    name: { en: "Silver Scheme", ta: "சில்வர் திட்டம்" },
    tag: { en: "Small savings, big future", ta: "சிறிய சேமிப்பு... பெரிய எதிர்காலம்..." },
    desc: { en: "Our starter plans for families, students and small traders. Low monthly amounts, short duration and a clear month-by-month schedule.", ta: "குடும்பங்கள், மாணவர்கள், சிறு வியாபாரிகளுக்கான தொடக்க திட்டம். குறைந்த மாதத் தொகை, குறைந்த காலம், ஒவ்வொரு மாதமும் தெளிவான கணக்கு." },
    unit: "month", auction: "monthly",
    variants: [
      { code: "Silver 1", amount: 25000, months: 10, members: 10, inst: 2500, pay: 22500, get: 23750,
        rows: [[1,2500,0,0],[2,2000,500,18250],[3,2050,450,18750],[4,2100,400,19250],[5,2150,350,19750],[6,2175,325,20250],[7,2250,250,21000],[8,2375,125,22250],[9,2400,100,22500],[10,2500,0,23750]],
        total: [22500,2500,23750] },
      { code: "Silver 2", amount: 50000, months: 10, members: 10, inst: 5000, pay: 45500, get: 47500, featured: true,
        rows: [[1,5000,0,0],[2,4000,1000,36500],[3,4125,875,37750],[4,4250,750,39000],[5,4375,625,40250],[6,4500,500,42000],[7,4625,375,43250],[8,4750,250,44500],[9,4875,125,45750],[10,5000,0,47500]],
        total: [45500,4500,47500] },
      { code: "Silver 3", amount: 50000, months: 20, members: 20, inst: 2500, pay: 44000, get: 48500,
        rows: [[1,2500,0,0],[2,2000,500,36500],[3,2000,500,37700],[4,2000,500,36500],[5,2000,500,36500],[6,2025,475,37500],[7,2050,450,38000],[8,2075,425,38500],[9,2100,400,39000],[10,2125,375,39500],[11,2150,350,40500],[12,2175,325,41000],[13,2200,300,41500],[14,2225,275,42000],[15,2275,225,43000],[16,2325,175,44500],[17,2375,125,45500],[18,2425,75,46500],[19,2475,25,47500],[20,2500,0,48500]],
        total: [44000,6000,48500] }
    ]
  },
  {
    id: "gold-a1", medal: "gold", icon: "crown",
    name: { en: "Gold Scheme – A1", ta: "கோல்டு திட்டம் – A1" },
    tag: { en: "A step towards a brighter tomorrow", ta: "இன்று சேமிப்பு... நாளை நிச்சயமான வளர்ச்சி..." },
    desc: { en: "Lakh-value chits completed in just 10 months with 10 members. Ideal for business needs, functions and planned purchases.", ta: "10 மாதங்கள், 10 உறுப்பினர்கள் — லட்சக்கணக்கான சீட்டு குறுகிய காலத்தில். வியாபாரம், சுப நிகழ்ச்சி, திட்டமிட்ட வாங்குதல்களுக்கு சிறந்தது." },
    unit: "month", auction: "monthly", hasCumulative: true,
    variants: [
      { code: "A1 · 1L", amount: 100000, months: 10, members: 10, inst: 10000, pay: 89050, get: 95000,
        rows: [[1,10000,0,10000,10000],[2,8000,2000,73000,18000],[3,8050,1950,73500,26050],[4,8250,1750,75500,34300],[5,8450,1550,77500,42750],[6,8650,1350,80500,51400],[7,8850,1150,82500,60250],[8,9200,800,86000,69450],[9,9600,400,90000,79050],[10,10000,0,95000,89050]],
        total: [89050,10950,95000] },
      { code: "A1 · 2L", amount: 200000, months: 10, members: 10, inst: 20000, pay: 178100, get: 190000, featured: true,
        rows: [[1,20000,0,20000,20000],[2,16000,4000,146000,36000],[3,16100,3900,147000,52100],[4,16500,3500,151000,68600],[5,16900,3100,155000,85500],[6,17300,2700,161000,102800],[7,17700,2300,165000,120500],[8,18400,1600,172000,138900],[9,19200,800,180000,158100],[10,20000,0,190000,178100]],
        total: [178100,21900,190000] },
      { code: "A1 · 3L", amount: 300000, months: 10, members: 10, inst: 30000, pay: 267150, get: 285000,
        rows: [[1,30000,0,30000,30000],[2,24000,6000,219000,54000],[3,24150,5850,220500,78150],[4,24750,5250,226500,102900],[5,25350,4650,232500,128250],[6,25950,4050,241500,154200],[7,26550,3450,247500,180750],[8,27600,2400,258000,208350],[9,28800,1200,270000,237150],[10,30000,0,285000,267150]],
        total: [267150,32850,285000] },
      { code: "A1 · 4L", amount: 400000, months: 10, members: 10, inst: 40000 }
    ]
  },
  {
    id: "gold-a2", medal: "gold", icon: "bars",
    name: { en: "Gold Scheme – A2", ta: "கோல்டு திட்டம் – A2" },
    tag: { en: "Trusted plan, steady progress", ta: "நம்பிக்கை திட்டம்... நிலையான முன்னேற்றம்..." },
    desc: { en: "The same lakh-value chits spread over 20 months, so the monthly amount is half. Easy on the family budget.", ta: "அதே லட்சம் மதிப்புள்ள சீட்டு, 20 மாதங்களாக பிரிக்கப்பட்டது. மாதத் தொகை பாதி — குடும்ப பட்ஜெட்டுக்கு எளிது." },
    unit: "month", auction: "monthly", partialSchedule: true,
    variants: [
      { code: "A2 · 1L", amount: 100000, months: 20, members: 20, inst: 5000, pay: 88000, get: 97000,
        rows: [[1,5000,0,0],[2,4000,1000,73000],[3,4000,1000,73000],[4,4000,1000,73000],[5,4000,1000,73000],[6,4050,950,75000],[7,4100,900,76000],[8,4150,850,77000],[9,4200,800,78000],[10,4250,750,79000]],
        total: [88000,9000,97000] },
      { code: "A2 · 2L", amount: 200000, months: 20, members: 20, inst: 10000, pay: 176000, get: 194000, featured: true,
        rows: [[1,10000,0,0],[2,8000,2000,146000],[3,8000,2000,146000],[4,8000,2000,146000],[5,8000,2000,146000],[6,8100,1900,150000],[7,8200,1800,152000],[8,8300,1700,154000],[9,8400,1600,156000],[10,8500,1500,158000]],
        total: [176000,21900,194000] },
      { code: "A2 · 3L", amount: 300000, months: 20, members: 20, inst: 15000, pay: 264000, get: 291000,
        rows: [[1,15000,0,0],[2,12000,3000,219000],[3,12000,3000,219000],[4,12000,3000,219000],[5,12000,3000,219000],[6,12150,2850,225000],[7,12300,2700,228000],[8,12450,2550,231000],[9,12600,2400,234000],[10,12750,2250,237000]],
        total: [264000,32850,291000] },
      { code: "A2 · 4L", amount: 400000, months: 20, members: 20, inst: 20000 }
    ]
  },
  {
    id: "diamond-a1", medal: "diamond", icon: "diamond",
    name: { en: "Diamond Scheme – A1", ta: "டைமண்ட் திட்டம் – A1" },
    tag: { en: "Bigger goals, a trusted path", ta: "பெரிய கனவுகளுக்கு... நம்பகமான பாதை..." },
    desc: { en: "Premium auction-based chits from ₹5 lakh to ₹20 lakh over 25 months with 25 members.", ta: "₹5 லட்சம் முதல் ₹20 லட்சம் வரை — 25 மாதங்கள், 25 உறுப்பினர்கள் கொண்ட பிரீமியம் ஏல சீட்டு." },
    unit: "month", auction: "monthly",
    variants: [
      { code: "D-A1 · 5L", amount: 500000, months: 25, members: 25, inst: 20000 },
      { code: "D-A1 · 10L", amount: 1000000, months: 25, members: 25, inst: 40000, featured: true },
      { code: "D-A1 · 15L", amount: 1500000, months: 25, members: 25, inst: 60000 },
      { code: "D-A1 · 20L", amount: 2000000, months: 25, members: 25, inst: 80000 }
    ]
  },
  {
    id: "diamond-a2", medal: "diamond", icon: "diamond",
    name: { en: "Diamond Scheme – A2", ta: "டைமண்ட் திட்டம் – A2" },
    tag: { en: "Long-term plan, secure future", ta: "நீண்டநாள் நிதி திட்டம்... உறுதியான எதிர்காலம்..." },
    desc: { en: "The Diamond range spread over 50 months with 50 members, for a lower monthly amount and longer savings.", ta: "டைமண்ட் சீட்டு 50 மாதங்கள், 50 உறுப்பினர்கள் — குறைந்த மாதத் தொகை, நீண்ட கால சேமிப்பு." },
    unit: "month", auction: "monthly",
    variants: [
      { code: "D-A2 · 5L", amount: 500000, months: 50, members: 50, inst: 10000 },
      { code: "D-A2 · 10L", amount: 1000000, months: 50, members: 50, inst: 20000, featured: true },
      { code: "D-A2 · 15L", amount: 1500000, months: 50, members: 50, inst: 30000 },
      { code: "D-A2 · 20L", amount: 2000000, months: 50, members: 50, inst: 40000 }
    ]
  },
  {
    id: "platinum", medal: "platinum", icon: "crown",
    name: { en: "Platinum Scheme", ta: "பிளாட்டினம் திட்டம்" },
    tag: { en: "Prestige today, prosperity forever", ta: "உங்கள் பெரிய இலக்குகளுக்கு... எங்களின் உறுதி..." },
    desc: { en: "Our highest-value chits, from ₹25 lakh up to ₹1 crore, over 50 months with 50 members. Built for business expansion, property and major goals.", ta: "₹25 லட்சம் முதல் ₹1 கோடி வரை — 50 மாதங்கள், 50 உறுப்பினர்கள். தொழில் விரிவாக்கம், சொத்து, பெரிய இலக்குகளுக்காக." },
    unit: "month", auction: "monthly",
    variants: [
      { code: "P · 25L", amount: 2500000, months: 50, members: 50, inst: 50000 },
      { code: "P · 50L", amount: 5000000, months: 50, members: 50, inst: 100000, featured: true },
      { code: "P · 75L", amount: 7500000, months: 50, members: 50, inst: 150000 },
      { code: "P · 1Cr", amount: 10000000, months: 50, members: 50, inst: 200000 }
    ]
  },
  {
    id: "honey", medal: "honey", icon: "flower", special: true,
    name: { en: "Honey Weekly Chit", ta: "ஹனி வீக்லி சீட்டு" },
    tag: { en: "Small steps, big dreams", ta: "வாரந்தோறும் சேமிப்பு... வாழ்க்கையில் முன்னேற்றம்..." },
    desc: { en: "A special weekly chit. Pay a small amount every week. Live oral auction every Thursday, payment every Saturday.", ta: "வாராந்திர சிறப்பு சீட்டு. ஒவ்வொரு வாரமும் சிறிய தொகை செலுத்துங்கள். ஒவ்வொரு வியாழன் நேரடி வாய்மொழி ஏலம், சனிக்கிழமை கட்டணம்." },
    unit: "week", auction: "weekly", bidCap: 30,
    variants: [
      { code: "Honey · 25K", amount: 25000, months: 25, members: 25, inst: 1000 },
      { code: "Honey · 50K", amount: 50000, months: 50, members: 50, inst: 1000, featured: true },
      { code: "Honey · 1L", amount: 100000, months: 50, members: 50, inst: 2000 }
    ]
  },
  {
    id: "super-jet", medal: "jet", icon: "rocket", special: true,
    name: { en: "Super Jet Chit", ta: "சூப்பர் ஜெட் சீட்டு" },
    tag: { en: "100 days. 100 members. One lakh rupees!", ta: "100 நாள்... 100 பேர்... ஒரு லட்சம் ரூபாய்!" },
    desc: { en: "A fast daily chit. ₹1,000 a day for 100 days. Daily oral auction in the evening, payment the next morning.", ta: "வேகமான தினசரி சீட்டு. 100 நாட்கள், தினமும் ₹1,000. தினமும் மாலை வாய்மொழி ஏலம், மறுநாள் காலை பணம் பெறுதல்." },
    unit: "day", auction: "daily", bidCap: 30,
    variants: [
      { code: "Super Jet", amount: 100000, months: 100, members: 100, inst: 1000, featured: true }
    ]
  }
];

window.FAQS = [
  { cat: "basics", q: { en: "What is a chit fund?", ta: "சீட்டு (சிட் ஃபண்ட்) என்றால் என்ன?" },
    a: { en: "A chit fund is a group savings plan. A fixed number of members pay a fixed amount every month (or week or day). Each period, one member takes the full chit amount through an auction. The discount offered in the auction is shared among all members as dividend. By the end, every member has received the chit amount once.", ta: "சீட்டு என்பது ஒரு குழு சேமிப்புத் திட்டம். குறிப்பிட்ட உறுப்பினர்கள் ஒவ்வொரு மாதமும் (அல்லது வாரம் / நாள்) ஒரே தொகை செலுத்துவார்கள். ஒவ்வொரு முறையும் ஏலம் மூலம் ஒருவர் சீட்டுத் தொகையை எடுப்பார். ஏலத்தில் விடப்படும் தள்ளுபடி அனைவருக்கும் ஈவுத்தொகையாக (டிவிடெண்ட்) பிரிக்கப்படும். முடிவில் ஒவ்வொருவரும் ஒருமுறை சீட்டுத் தொகையை பெறுவார்கள்." } },
  { cat: "basics", q: { en: "How is the winner chosen each month?", ta: "ஒவ்வொரு மாதமும் யாருக்கு சீட்டு கிடைக்கும் என்பது எப்படி முடிவாகிறது?" },
    a: { en: "Through a live oral auction (வாய்மொழி ஏலம்). Members who need money bid the discount they are willing to give. The member who offers the highest discount takes the chit that month. There is no fixed allotment and everyone gets an equal chance.", ta: "நேரடி வாய்மொழி ஏலம் மூலம். பணம் தேவைப்படும் உறுப்பினர்கள், தாங்கள் விட்டுக்கொடுக்கும் தள்ளுபடியை ஏலத்தில் சொல்வார்கள். அதிக தள்ளுபடி சொல்பவருக்கு அந்த மாத சீட்டு கிடைக்கும். நிர்ணயிக்கப்பட்ட ஒதுக்கீடு இல்லை — அனைவருக்கும் சம வாய்ப்பு." } },
  { cat: "basics", q: { en: "What is a dividend?", ta: "ஈவுத்தொகை (டிவிடெண்ட் / பங்கீடு) என்றால் என்ன?" },
    a: { en: "When a member takes the chit at a discount, that discount (after the 5% company commission) is shared equally among all members. Your share is reduced from your next payment, so you pay less than the full instalment in most months.", ta: "ஒருவர் தள்ளுபடியுடன் சீட்டு எடுக்கும்போது, அந்த தள்ளுபடி (5% நிறுவனக் கமிஷன் போக) அனைத்து உறுப்பினர்களுக்கும் சமமாக பிரிக்கப்படும். உங்கள் பங்கு அடுத்த தவணையில் குறைக்கப்படும். அதனால் பெரும்பாலான மாதங்களில் முழுத் தவணையை விட குறைவாகவே செலுத்துவீர்கள்." } },
  { cat: "schemes", q: { en: "What is the commission charged?", ta: "நிறுவனக் கமிஷன் எவ்வளவு?" },
    a: { en: "A formal commission of 5% of the chit amount, as shown in every scheme. Nothing is hidden.", ta: "சீட்டுத் தொகையில் 5% முறையான கமிஷன் மட்டுமே. எந்த மறைமுக கட்டணமும் இல்லை." } },
  { cat: "schemes", q: { en: "What is the maximum bid in the auction?", ta: "ஏலத்தில் அதிகபட்சம் எவ்வளவு வரை கேட்கலாம்?" },
    a: { en: "In our Honey Weekly and Super Jet schemes, bidding is allowed up to 30% of the chit amount. Please ask our office for the bid limit of your chosen group.", ta: "ஹனி வீக்லி மற்றும் சூப்பர் ஜெட் திட்டங்களில் சீட்டுத் தொகையின் 30% வரை ஏலம் கேட்கலாம். நீங்கள் தேர்ந்தெடுக்கும் குழுவின் ஏல வரம்பை எங்கள் அலுவலகத்தில் கேட்டுத் தெரிந்துகொள்ளலாம்." } },
  { cat: "schemes", q: { en: "Which scheme is right for me?", ta: "எனக்கு எந்த திட்டம் பொருத்தமானது?" },
    a: { en: "Pick the monthly amount you can pay comfortably. Silver suits small savings, Gold suits lakh-value goals, Diamond and Platinum suit big goals, and Honey Weekly or Super Jet suit people who prefer weekly or daily payments. Use our calculator or call us and we will suggest a plan.", ta: "நீங்கள் சுலபமாக செலுத்தக்கூடிய மாதத் தொகையை முதலில் முடிவு செய்யுங்கள். சிறிய சேமிப்புக்கு சில்வர், லட்சம் இலக்குகளுக்கு கோல்டு, பெரிய இலக்குகளுக்கு டைமண்ட் மற்றும் பிளாட்டினம், வாரம் / தினசரி செலுத்த விரும்புபவர்களுக்கு ஹனி வீக்லி அல்லது சூப்பர் ஜெட். எங்கள் கணக்கீட்டுக் கருவியை பயன்படுத்துங்கள் அல்லது எங்களை அழையுங்கள்." } },
  { cat: "schemes", q: { en: "What is the 15 days interest-free loan facility?", ta: "15 நாள் வட்டியில்லா கடன் வசதி என்றால் என்ன?" },
    a: { en: "Regular chit members can use up to 45% of the amount they have already paid, for 15 days, without any interest. For example, if you have paid ₹1,00,000, you can use ₹45,000 for 15 days at zero interest. This helps in emergencies, even if you are only in your 5th or 7th instalment.", ta: "தொடர்ந்து சீட்டு செலுத்தும் உறுப்பினர்கள், தாங்கள் செலுத்திய தொகையின் 45% வரை 15 நாட்களுக்கு வட்டி இல்லாமல் பயன்படுத்தலாம். உதாரணமாக, நீங்கள் ₹1,00,000 செலுத்தியிருந்தால், ₹45,000 வரை 15 நாட்கள் வட்டியின்றி பெறலாம். நீங்கள் 5வது அல்லது 7வது தவணையில் இருந்தாலும் அவசர தேவைக்கு இது உதவும்." } },
  { cat: "joining", q: { en: "Who can join?", ta: "யார் சேரலாம்?" },
    a: { en: "Any adult (18 years and above) with valid identity and address proof and a regular source of income can join. Salaried people, business owners, farmers, homemakers and self-employed people are all welcome.", ta: "18 வயது நிரம்பிய, சரியான அடையாள மற்றும் முகவரி ஆவணங்கள் உள்ள, நிலையான வருமானம் உள்ள எவரும் சேரலாம். சம்பளதாரர்கள், வியாபாரிகள், விவசாயிகள், இல்லத்தரசிகள், சுயதொழில் செய்பவர்கள் அனைவரையும் வரவேற்கிறோம்." } },
  { cat: "joining", q: { en: "What documents are needed to join?", ta: "சேர என்ன ஆவணங்கள் தேவை?" },
    a: { en: "Usually: Aadhaar card, PAN card, passport-size photographs, address proof and bank details. When you take the chit amount, surety or guarantor documents are needed as per company rules. Our team will guide you.", ta: "பொதுவாக: ஆதார் அட்டை, பான் அட்டை, பாஸ்போர்ட் அளவு புகைப்படங்கள், முகவரி சான்று, வங்கி விவரங்கள். சீட்டுத் தொகை எடுக்கும்போது நிறுவன விதிகளின்படி ஜாமீன் / உத்தரவாத ஆவணங்கள் தேவைப்படும். எங்கள் குழு உங்களுக்கு வழிகாட்டும்." } },
  { cat: "joining", q: { en: "How do I join a chit?", ta: "சீட்டில் எப்படி சேருவது?" },
    a: { en: "Call us on 8056724462 or our landline 0416-2214462, message us on WhatsApp at 9043420099, fill the enquiry form on our Contact page, or visit our office at Vellore City Centre, Officers Line, Vellore (near Lalitha Jewellers). We will explain the plan and complete the joining process.", ta: "8056724462 அல்லது லேண்ட்லைன் 0416-2214462 என்ற எண்ணில் அழையுங்கள், 9043420099 என்ற எண்ணில் வாட்ஸ்அப் செய்யுங்கள், தொடர்பு பக்கத்தில் விசாரணை படிவத்தை நிரப்புங்கள், அல்லது வேலூர் சிட்டி சென்டர், ஆபீசர்ஸ் லைன் (லலிதா ஜுவல்லர்ஸ் அருகில்) அலுவலகத்திற்கு நேரில் வாருங்கள். திட்டத்தை விளக்கி சேர்க்கை முறையை முடித்துத் தருவோம்." } },
  { cat: "payments", q: { en: "What happens if I miss a payment?", ta: "ஒரு தவணை தவறிவிட்டால் என்ன ஆகும்?" },
    a: { en: "Please pay on time so the group runs smoothly for everyone. If you face a difficulty, contact our office immediately and we will guide you on the next steps as per company rules.", ta: "அனைவருக்கும் குழு சீராக நடக்க, தவணையை சரியான நேரத்தில் செலுத்துங்கள். ஏதேனும் சிரமம் இருந்தால் உடனே எங்கள் அலுவலகத்தை தொடர்பு கொள்ளுங்கள். நிறுவன விதிகளின்படி அடுத்த நடவடிக்கைக்கு வழிகாட்டுவோம்." } },
  { cat: "payments", q: { en: "Can I see the auction and my account details?", ta: "ஏலம் மற்றும் என் கணக்கு விவரங்களை பார்க்க முடியுமா?" },
    a: { en: "Yes. We offer live chit bidding and our mobile app on the Play Store shows full details and calculations, so members can follow everything transparently.", ta: "ஆம். நேரடி சீட்டு ஏலம் உண்டு. Play Store-ல் உள்ள எங்கள் மொபைல் ஆப்-ல் முழு விவரங்களும் கணக்குகளும் தெரியும். அனைத்தும் வெளிப்படையாக நடைபெறும்." } },
  { cat: "payments", q: { en: "When do I receive the money after winning the auction?", ta: "ஏலத்தில் சீட்டு எடுத்த பிறகு பணம் எப்போது கிடைக்கும்?" },
    a: { en: "We follow quick processing. In Super Jet, the auction is in the evening and payment is processed the next morning. In Honey Weekly, the auction is on Thursday and payment is on Saturday. For monthly schemes, the amount is released after the required surety documents are verified.", ta: "விரைவான செயல்முறை பின்பற்றுகிறோம். சூப்பர் ஜெட்டில் மாலை ஏலம், மறுநாள் காலை பணம். ஹனி வீக்லியில் வியாழன் ஏலம், சனிக்கிழமை பணம். மாதாந்திர திட்டங்களில் தேவையான ஜாமீன் ஆவணங்கள் சரிபார்த்த பின் தொகை வழங்கப்படும்." } },
  { cat: "basics", q: { en: "Is Nachiyar Chit Fund a registered company?", ta: "நாச்சியார் சிட் ஃபண்ட் பதிவு செய்யப்பட்ட நிறுவனமா?" },
    a: { en: "Yes. Nachiyar Chit Fund Private Limited is a registered private limited company. CIN: U64990TN2026PTC198604, PAN: AAMCN1549G, TAN: CHEN18450F, MSME / Udyam: UDYAM-TN-30-0123273.", ta: "ஆம். நாச்சியார் சிட் ஃபண்ட் பிரைவேட் லிமிடெட் பதிவு செய்யப்பட்ட பிரைவேட் லிமிடெட் நிறுவனம். CIN: U64990TN2026PTC198604, PAN: AAMCN1549G, TAN: CHEN18450F, MSME / உத்யம்: UDYAM-TN-30-0123273." } }
];
