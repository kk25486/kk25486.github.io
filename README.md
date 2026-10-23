# me.hurricane.tw

Hurricane 的個人簡介網站，純靜態（HTML / CSS / 少量 vanilla JS），不需要建置流程。

## 檔案結構

```
.
├─ index.html          單頁內容（關於、學經歷、活動、聯絡）
├─ 404.html            找不到頁面的備援頁
├─ favicon.svg         網站圖示
├─ robots.txt
├─ sitemap.xml
└─ assets
   ├─ styles.css       版型、淺色／深色主題、響應式與列印樣式
   └─ main.js          進場動畫、複製 Discord ID、導覽列目前區塊
```

## 本機預覽

直接用瀏覽器打開 `index.html` 即可；若要測試複製功能等需要 http 的行為：

```powershell
python -m http.server 8123
# 瀏覽 http://127.0.0.1:8123/
```

## 修改內容

- 文字內容都在 `index.html`，依區塊註解尋找即可。
- 配色集中在 `assets/styles.css` 最上方的 `:root` 變數（`--accent` 為主要強調色）。
- 深色模式的數值在 `@media (prefers-color-scheme: dark)` 區塊。

## 部署

整份資料夾即為網站根目錄，上傳到任何靜態主機即可（Cloudflare Pages、Netlify、GitHub Pages、Synology Web Station 等）。

若使用 Cloudflare Pages／Netlify：直接連結 Git repo 或拖曳資料夾，建置指令留空、輸出目錄設為 `/`。

`index.html` 內的 `canonical`、Open Graph URL 與 `sitemap.xml` 已指向 `https://me.hurricane.tw/`，更換網域時記得同步修改。
