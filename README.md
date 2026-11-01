<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GitHub Dashboard Profile</title>
    <style>
      :root {
        --bg-1: #0b1020;
        --bg-2: #101827;
        --panel: rgba(15, 23, 42, 0.8);
        --soft: rgba(148, 163, 184, 0.08);
        --line: rgba(148, 163, 184, 0.18);
        --text: #e5e7eb;
        --muted: #9ca3af;
        --primary: #8b5cf6;
        --secondary: #22d3ee;
        --success: #34d399;
        --shadow: rgba(139, 92, 246, 0.35);
      }

      * { box-sizing: border-box; }

      html, body {
        margin: 0;
        min-height: 100%;
        font-family: Inter, "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(139, 92, 246, 0.26), transparent 32%),
          radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.2), transparent 30%),
          linear-gradient(135deg, var(--bg-1), var(--bg-2));
        color: var(--text);
      }

      body {
        min-height: 100vh;
        padding: 30px 18px;
        overflow-x: hidden;
      }

      .orb {
        position: fixed;
        border-radius: 50%;
        filter: blur(70px);
        opacity: 0.38;
        pointer-events: none;
        animation: float 10s ease-in-out infinite alternate;
      }

      .orb.one {
        width: 260px; height: 260px;
        left: 7%; top: 10%;
        background: rgba(139, 92, 246, 0.55);
      }

      .orb.two {
        width: 320px; height: 320px;
        right: 8%; top: 18%;
        background: rgba(34, 211, 238, 0.48);
        animation-delay: 1.2s;
      }

      .orb.three {
        width: 240px; height: 240px;
        left: 50%; bottom: 8%;
        background: rgba(52, 211, 153, 0.32);
        animation-delay: 2.2s;
      }

      @keyframes float {
        0% { transform: translateY(0px) scale(1); }
        100% { transform: translateY(-24px) scale(1.16); }
      }

      .dashboard {
        max-width: 1220px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
        flex-wrap: wrap;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .brand-badge {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        font-weight: 800;
        box-shadow: 0 14px 30px var(--shadow);
        animation: pulse 2.4s infinite ease-in-out;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }

      .brand h1 {
        margin: 0;
        font-size: 1.1rem;
      }

      .search-box {
        flex: 1;
        max-width: 420px;
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(15, 23, 42, 0.7);
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 10px 14px;
      }

      .search-box input {
        flex: 1;
        background: transparent;
        border: none;
        color: var(--text);
        font-size: 0.95rem;
        outline: none;
      }

      .search-box button {
        border: none;
        background: linear-gradient(135deg, var(--primary), #7c3aed);
        color: white;
        padding: 10px 14px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 700;
      }

      .grid {
        display: grid;
        grid-template-columns: 420px minmax(0, 1fr);
        gap: 22px;
      }

      .card {
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid var(--line);
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.28);
        backdrop-filter: blur(14px);
      }

      .profile-card {
        padding: 22px;
        animation: slideUp 0.8s ease both;
      }

      @keyframes slideUp {
        0% { opacity: 0; transform: translateY(12px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      .avatar-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
      }

      .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid rgba(139, 92, 246, 0.7);
        box-shadow: 0 0 28px rgba(139, 92, 246, 0.6);
        animation: pulse 2.8s infinite ease-in-out;
      }

      .profile-name {
        text-align: center;
      }

      .profile-name h2 {
        margin: 0;
        font-size: clamp(1.5rem, 2.3vw, 2rem);
      }

      .profile-name a {
        color: #a5b4fc;
        text-decoration: none;
        font-weight: 600;
      }

      .bio {
        margin-top: 16px;
        padding: 14px 16px;
        background: rgba(148, 163, 184, 0.06);
        border: 1px solid var(--line);
        border-radius: 16px;
        color: var(--muted);
        line-height: 1.7;
        text-align: center;
      }

      .meta {
        margin-top: 18px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .mini-stat {
        background: rgba(148, 163, 184, 0.04);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 12px 14px;
      }

      .mini-stat .label {
        display: block;
        font-size: 0.72rem;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 6px;
      }

      .mini-stat .value {
        font-size: 1.2rem;
        font-weight: 800;
      }

      .actions {
        margin-top: 18px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      .btn {
        border: none;
        border-radius: 12px;
        padding: 11px 14px;
        font-weight: 700;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        transition: transform 0.2s ease;
      }

      .btn:hover {
        transform: translateY(-2px);
      }

      .btn.primary {
        background: linear-gradient(135deg, var(--primary), #7c3aed);
      }

      .btn.secondary {
        background: linear-gradient(135deg, var(--secondary), #0ea5e9);
      }

      .stats-card {
        padding: 22px;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
      }

      .stat-box {
        background: rgba(148, 163, 184, 0.04);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 16px;
      }

      .stat-box .label {
        font-size: 0.76rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--muted);
      }

      .stat-box .value {
        margin-top: 8px;
        font-size: clamp(1.4rem, 2vw, 2rem);
        font-weight: 800;
      }

      .chart-panel {
        background: rgba(2, 6, 23, 0.8);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 12px;
      }

      .chart-panel img {
        width: 100%;
        display: block;
        border-radius: 12px;
      }

      .readme-card {
        padding: 20px;
      }

      .readme-tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
        gap: 12px;
        flex-wrap: wrap;
      }

      .dots {
        display: flex;
        gap: 8px;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }

      .dot.red { background: #fb7185; }
      .dot.yellow { background: #fbbf24; }
      .dot.green { background: #34d399; }

      .readme-preview {
        background: rgba(2, 6, 23, 0.9);
        border: 1px solid var(--line);
        border-radius: 16px;
        min-height: 460px;
        padding: 18px;
        overflow: auto;
      }

      pre {
        margin: 0;
        color: #dbeafe;
        line-height: 1.7;
        white-space: pre-wrap;
        word-break: break-word;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.87rem;
      }

      .loading {
        color: var(--muted);
        font-size: 0.95rem;
        text-align: center;
        padding: 24px 0;
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 620px) {
        .search-box {
          width: 100%;
          max-width: none;
        }

        .stat-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .meta {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>

    <div class="orb one"></div>
    <div class="orb two"></div>
    <div class="orb three"></div>

    <div class="dashboard">
      <div class="topbar">
        <div class="brand">
          <div class="brand-badge">GH</div>
          <h1>GitHub Dashboard</h1>
        </div>

        <div class="search-box">
          <input id="usernameInput" type="text" value="kensin14" placeholder="Masukkan username GitHub" />
          <button id="loadBtn">Load</button>
        </div>
      </div>

      <div class="grid">
        <aside class="card profile-card" id="profileCard">
          <div class="loading">Memuat profil GitHub...</div>
        </aside>

        <section class="card stats-card">
          <div class="stat-grid" id="statsGrid">
            <div class="loading">Mengambil statistik...</div>
          </div>

          <div class="chart-panel">
            <img id="githubStats" alt="GitHub Stats" />
          </div>

          <div class="readme-card">
            <div class="readme-tools">
              <div class="dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <strong>README Preview</strong>
            </div>

            <div class="readme-preview">
              <pre id="readmePreview"></pre>
            </div>
          </div>
        </section>
      </div>
    </div>

    <script>
      const usernameInput = document.getElementById("usernameInput");
      const loadBtn = document.getElementById("loadBtn");
      const profileCard = document.getElementById("profileCard");
      const statsGrid = document.getElementById("statsGrid");
      const githubStats = document.getElementById("githubStats");
      const readmePreview = document.getElementById("readmePreview");

      async function fetchGitHubProfile(username) {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("Username tidak ditemukan");
        return await res.json();
      }

      function renderProfile(profile) {
        profileCard.innerHTML = `
          <div class="avatar-wrap">
            <img class="avatar" src="${profile.avatar_url}" alt="${profile.login}" />
          </div>

          <div class="profile-name">
            <h2>${profile.name || profile.login}</h2>
            <a href="${profile.html_url}" target="_blank" rel="noreferrer">@${profile.login}</a>
          </div>

          <div class="bio">
            ${profile.bio || "Developer yang suka membangun pengalaman digital yang menarik."}
          </div>

          <div class="meta">
            <div class="mini-stat">
              <span class="label">Followers</span>
              <span class="value">${profile.followers}</span>
            </div>

            <div class="mini-stat">
              <span class="label">Following</span>
              <span class="value">${profile.following}</span>
            </div>

            <div class="mini-stat">
              <span class="label">Repos</span>
              <span class="value">${profile.public_repos}</span>
            </div>

            <div class="mini-stat">
              <span class="label">Location</span>
              <span class="value">${profile.location || "Earth"}</span>
            </div>
          </div>

          <div class="actions">
            <a class="btn primary" href="${profile.html_url}" target="_blank" rel="noreferrer">View Profile</a>
            <a class="btn secondary" href="${profile.blog || '#'}" target="_blank" rel="noreferrer">Website</a>
          </div>
        `;
      }

      function renderStats(profile) {
        statsGrid.innerHTML = `
          <div class="stat-box">
            <div class="label">Repos</div>
            <div class="value">${profile.public_repos}</div>
          </div>

          <div class="stat-box">
            <div class="label">Followers</div>
            <div class="value">${profile.followers}</div>
          </div>

          <div class="stat-box">
            <div class="label">Following</div>
            <div class="value">${profile.following}</div>
          </div>

          <div class="stat-box">
            <div class="label">Gists</div>
            <div class="value">${profile.public_gists}</div>
          </div>
        `;

        const username = profile.login;
        githubStats.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true`;
      }

      function generateReadme(profile) {
        const name = profile.name || profile.login;
        const bio = profile.bio || "I build cool things.";
        const username = profile.login;
        const location = profile.location || "Indonesia";
        const blog = profile.blog || "https://example.com";
        const email = profile.email || "hello@example.com";

        return `
<!-- Generated from GitHub profile -->
<div align="center">
  <img src="${profile.avatar_url}" width="180" height="180" alt="${name}" style="border-radius:50%; border:3px solid #8b5cf6; box-shadow:0 0 30px rgba(139,92,246,0.6);" />
  <h1>${name}</h1>
  <h3>Developer • Building product experiences</h3>
  <p>${bio}</p>
  <p>📍 ${location}</p>

  <p>
    <a href="https://github.com/${username}">
      <img src="https://img.shields.io/badge/GitHub-${username}-181717?style=for-the-badge&logo=github" />
    </a>
    <a href="${blog}">
      <img src="https://img.shields.io/badge/Website-Visit-FF6B6B?style=for-the-badge&logo=firefox" />
    </a>
    <a href="mailto:${email}">
      <img src="https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail" />
    </a>
  </p>

  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical" alt="GitHub Stats" />
</div>

## 👋 About Me
- 🔭 I’m currently exploring and building impactful digital products.
- 🌱 I’m learning modern frontend, UI/UX, and developer workflows.
- 💬 Ask me about web development, design systems, and product experiences.

## 🛠️ Tech Stack
- JavaScript
- TypeScript
- React
- Node.js
- Tailwind CSS
- Figma

## 📊 GitHub Activity
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical)

---
<p align="center">
  <i>Made with ❤️ and a bit of coffee.</i>
</p>
        `;
      }

      async function loadProfile() {
        const username = usernameInput.value.trim() || "kensin14";
        try {
          profileCard.innerHTML = `<div class="loading">Memuat profil ${username}...</div>`;
          const profile = await fetchGitHubProfile(username);
          renderProfile(profile);
          renderStats(profile);
          readmePreview.textContent = generateReadme(profile);
        } catch (error) {
          profileCard.innerHTML = `
            <div class="loading" style="color:#fca5a5;">
              Username tidak ditemukan. Coba cek lagi.
            </div>
          `;
          statsGrid.innerHTML = `<div class="loading">Statistik tidak tersedia.</div>`;
          readmePreview.textContent = "Profile unavailable";
        }
      }

      loadBtn.addEventListener("click", loadProfile);
      usernameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") loadProfile();
      });

      loadProfile();
    </script>
  </body>
</html>
