@echo off
cd /d "C:\Users\Administrator\Documents\git\yh7004lee.github.io"

:: 변경된 파일 확인 후 추가
git add .

:: 현재 시간 기준 커밋 메시지 생성
set TIMESTAMP=%date% %time%
git commit -m "Update: %TIMESTAMP%"

:: 푸시
git push origin main
pause
