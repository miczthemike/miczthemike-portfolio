# 🌐 Micz The Mike — Professional Portfolio & Static Site

> Official portfolio of **Michael Joseph (MiczTheMike)** — Systems Administrator, Ruijie Certified Network Associate (RCNA), Cisco Cybersecurity Specialist, and Application Developer.
> Hosted statically via **GitHub Pages** for domain: **[miczthemike.online](https://miczthemike.online)**.

---

## 🚀 Key Features & Highlights

- **⚡ Modern Cyber Glassmorphism Aesthetic**:
  - High-performance ambient particle network canvas background.
  - Glowing node status cards and live interactive typing header.
  - Fully responsive across desktop, tablet, and mobile browsers.

- **📜 Universal Secure Credential Viewer**:
  - Seamlessly renders **both PDF documents** (`cert1.pdf` for Cisco) and **high-resolution images** (`ruijiecert.jpg` for Ruijie Networks).
  - Built-in watermark protection (`PROTECTED CREDENTIAL • MICZTHEMIKE.ONLINE`).
  - Interactive Zoom In, Zoom Out, Reset, and keyboard controls (`Esc` to dismiss).
  - Targeted right-click protection on credentials without disabling standard text selection on the rest of the website.

- **💻 Interactive SysAdmin Terminal Console**:
  - Embedded terminal emulator featuring clickable command chips and command-line input.
  - Commands: `help`, `whoami`, `skills`, `certs`, `projects`, `status`, `contact`, `clear`.

- **🎮 Developed Software & Web Showcase**:
  - **HerzGang Race** (`herzrace.html`): 100-racer responsive HTML5 canvas web game with custom avatars.
  - **Hospitality TV App Launcher**: Specialized Android TV guest portal tailored for PROXY Plus by The Oriental Pangasinan.
  - **Spin & Win**: Physics-based interactive prize wheel (`spinthewheel.html`).
  - **Royal Rumble Extreme**: Real-time battle royale elimination simulation (`bugbugan.html`).

- **✨ Production-Ready GitHub Pages Setup**:
  - Includes `CNAME` pre-configured for `miczthemike.online`.
  - Includes `.nojekyll` to bypass Jekyll file filtering.
  - Includes custom branded `404.html` error page for seamless domain routing.

---

## 📁 Repository Structure

```text
miczthemike-portfolio/
├── index.html                      # Redesigned main portfolio page
├── 404.html                        # Custom cyber-themed 404 error page
├── CNAME                           # Custom domain configuration (miczthemike.online)
├── .nojekyll                       # Prevents Jekyll processing on GitHub Pages
├── miczthemike.ico                 # Favicon
├── cert1.pdf                       # Cisco Introduction to Cybersecurity Certificate
├── ruijiecert.jpg                  # Ruijie Certified Network Associate Certificate
├── I2CS__1_.png                    # Cisco Cybersecurity Badge
├── PROXYPlus.png                   # Hospitality Launcher project brand asset
├── chicoherz.png                   # Character avatar asset
├── herzrace.html                   # HerzGang Race web game
├── spinthewheel.html               # Spin & Win interactive wheel
├── bugbugan.html                   # Royal Rumble battle simulator
├── privacy.html                    # Privacy policy document
└── README.md                       # Deployment & configuration documentation
```

---

## 🛠️ How to Deploy on GitHub Pages with Custom Domain

### Step 1: Initialize Git and Push to GitHub

If you have Git installed, run the following in PowerShell from this folder:

```powershell
# Navigate to the portfolio folder
cd "C:\Users\ProxyPlus\.gemini\antigravity\scratch\miczthemike-portfolio"

# Initialize git repository
git init
git branch -M main

# Add all files and commit
git add .
git commit -m "Initial commit: Redesigned professional portfolio"

# Connect to your GitHub repository (replace with your actual GitHub repo URL)
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git

# Push to GitHub
git push -u origin main
```

*(Alternatively, you can drag and drop all files directly into your GitHub repository using GitHub's web interface or GitHub Desktop!)*

---

### Step 2: Enable GitHub Pages

1. Go to your repository on **GitHub.com**.
2. Click on **Settings** (top tab).
3. In the left sidebar, click on **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and `/ (root)`, then click **Save**.
5. Under **Custom domain**:
   - Verify that `miczthemike.online` is populated (from the `CNAME` file).
   - Check the box **Enforce HTTPS** (GitHub will automatically issue a free Let's Encrypt SSL certificate within a few minutes).

---

### Step 3: Configure DNS for `miczthemike.online`

At your domain registrar (Namecheap, GoDaddy, Cloudflare, Hostinger, etc.), ensure your DNS records point to GitHub Pages:

#### 1. Apex Domain A Records (`@` or `miczthemike.online`):
Add these 4 GitHub Pages IP addresses as **A** records:
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

#### 2. CNAME Record for `www`:
- **Type**: `CNAME`
- **Name / Host**: `www`
- **Target / Value**: `<YOUR_GITHUB_USERNAME>.github.io.`

---

## 🔒 Security & Local Testing

- To preview the site locally, you can open `index.html` directly in your browser or run:
  ```powershell
  python -m http.server 8080
  ```
  Then visit `http://localhost:8080` in your web browser.

