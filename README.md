# 🗡️ LeetCode Slayer

Track, sync, and showcase my LeetCode progress like a true warrior.  
Every solution here is synced automatically using **LeetSync**, making this repo my personal archive of algorithm victories.

---

## 📊 Stats & Badges

<p align="left">
  <a href="https://github.com/anduajulian/leetcode-slayer/actions">
    <img src="https://github.com/anduajulian/leetcode-slayer/workflows/CI/badge.svg" alt="CI Status" />
  </a>

  <a href="https://github.com/anduajulian">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=anduajulian&theme=default" alt="GitHub Streak" />
  </a>

  <a href="https://github.com/anduajulian/leetcode-slayer">
    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=anduajulian&layout=compact" alt="Top Languages" />
  </a>
</p>

---

## 🔍 What is LeetSync?

**LeetSync** is a Chrome extension that automatically syncs my LeetCode submissions into a GitHub repository of my choice.

### ⭐ Why I use LeetSync

1. Save, review, and share LeetCode solutions in seconds.
2. Works on any LeetCode interface.
3. Keeps me motivated to solve problems every day.
4. Saves a lot of time compared to manual git push for every solution.

---

## ⚙️ How It Works

LeetSync uses:

- **LeetCode API** → fetches my submission data  
- **GitHub API** → creates or updates solution files in this repo  

It also supports custom subdirectories for organizing solutions.

---

## 🚀 Getting Started

To use LeetSync with this repo:

1. Install the **LeetSync** Chrome extension.
2. Click the extension icon in the Chrome toolbar.
3. Give GitHub access.
4. Log in to LeetCode (if not already).
5. Select this repository:  
   `anduajulian/leetcode-slayer`
6. Start solving problems on LeetCode 🔥

Official LeetSync repo:  
https://github.com/3ba2ii/LeetSync

---

## 🗂️ Repository Structure

Depending on LeetSync settings, it might look like this:

```text
leetcode-slayer/
├── easy/
├── medium/
├── hard/
└── ...
```

## 🗡️ Commit Message Style (Slayer Mode)

I configure LeetSync to use commit messages like:

slay: {questionId} {questionTitle} ({difficulty}, {language})

Examples:
```text
slay: 1 Two Sum (Easy, Go)
slay: 121 Best Time to Buy and Sell Stock (Easy, TypeScript)
```

For improved solutions:
```text
refactor: reslay {questionId} {questionTitle}
```
For notes / explanations:
```text
docs: notes for {questionId} {questionTitle}
```

## 🧩 Future Ideas
- Add explanations per problem
- Tag problems by topic (two-pointers, greedy, dp, etc.)
- Simple CI to run basic checks

## 📫 Contact
- GitHub: @anduajulian
- Email: andua.julian@gmail.com
