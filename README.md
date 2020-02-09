# 🗄️ Archiver

Easily archive your webpages on the Internet Archive

## 💡 How it works

1. [GitHub Actions](/.github/workflows/archive.yml) scheduler runs every week
2. Puppeteer launches a headless Chrome and logs you into Archive.org
3. Uses the HTML form to save, screenshot, and archive your URLs from [urls.yml](/urls.yml)

## 🛠️ Usage

1. Fork this repo
2. Add environment variables (or GitHub secrets) for `username` and `password`
3. Add URLs to archive on [urls.yml](/urls.yml)

## 📄 License

[MIT](/LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
