# 設備量測工具發布規則

此資料夾是 Web 與 Android 的唯一 UI 來源。禁止分別修改 Android assets。
每次功能修改完成後，先跑響應式版面與回歸測試，再同步並更新 GitHub Pages、簽章 APK / AAB、GitHub Release 與 Play 內部測試，不另行詢問整合。
Gradle preBuild 執行 scripts/sync_android_assets.py；發布前比較封裝內與網站的 index.html / CSS / JS 雜湊。
必須檢查 Play 的實際 versionCode，而非只看可自由填寫的版本名稱。
最終給使用者可點擊的網站與 APK 網址；不可僅回報本機路徑或把草稿稱為已發布。
保留原簽章，不輪替金鑰；所有測量與 XY 計算變更需另外確認規格。
