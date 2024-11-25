@echo off
chcp 65001 >nul
set FILEBODY=index
echo [%FILEBODY%] 画像を生成します
call marp %FILEBODY%.md --image png  --theme themes\title_doubleline.css --allow-local-files
rem 出力画像のフルパスを取得
set OUTPUT_IMAGE=%CD%\%FILEBODY%.png
echo %OUTPUT_IMAGE%| clip
