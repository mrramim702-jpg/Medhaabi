# মেধাবী 🎓
### বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য AI গৃহশিক্ষক

[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Free](https://img.shields.io/badge/Cost-Free-brightgreen)]()

## ✨ ফিচারসমূহ

| ফিচার | বর্ণনা |
|-------|--------|
| 💬 AI চ্যাট | বাংলায় যেকোনো প্রশ্ন করো, Claude AI উত্তর দেবে |
| 📊 গুরুত্বপূর্ণ অধ্যায় | ১০ বছরের বোর্ড প্রশ্ন বিশ্লেষণ |
| ✏️ MCQ প্র্যাকটিস | ৮ বিষয়ে MCQ, ব্যাখ্যাসহ |
| 📅 স্টাডি প্ল্যানার | AI দিয়ে কাস্টম রুটিন তৈরি |

## 🚀 কিভাবে চালাবে

### ধাপ ১ — রিপো ক্লোন করো
```bash
git clone https://github.com/YOUR_USERNAME/medhaabi.git
cd medhaabi
```

### ধাপ ২ — API Key সেট করো
`.env` ফাইল তৈরি করো:
```
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```
> API Key পাবে: https://console.anthropic.com

### ধাপ ৩ — চালাও
```bash
npm install
npm start
```
ব্রাউজারে যাও: `http://localhost:3000`

## 📁 ফাইল স্ট্রাকচার

```
medhaabi/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── BottomNav.jsx
│   │   ├── ChatScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── ChaptersScreen.jsx
│   │   ├── MCQScreen.jsx
│   │   └── PlannerScreen.jsx
│   ├── data/
│   │   ├── chapters.js
│   │   └── mcq.js
│   ├── App.jsx
│   ├── index.js
│   └── styles.css
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ টেকনিক্যাল স্ট্যাক

- **Frontend:** React 18
- **AI Engine:** Claude (Anthropic API)
- **Styling:** Pure CSS (Dark Mode)
- **Deploy:** Vercel / Netlify (ফ্রি)

## 📱 Deploy করো (Vercel)

```bash
npm install -g vercel
vercel --prod
```

## 🤝 Contribute করো

Pull Request স্বাগত! যেকোনো বিষয়ে MCQ বা অধ্যায় ডেটা যোগ করতে পারো।

## 📄 License

MIT License — সম্পূর্ণ ফ্রি ও ওপেন সোর্স।

---
**নৈতিকতা:** এই অ্যাপ কখনো প্রশ্ন ফাঁস বা "নিশ্চিত কমন"-এর প্রতারণা করে না। শেখার আনন্দ বাড়ানোই আমাদের লক্ষ্য। 🌟
