@echo off
call npx prisma generate --schema=./prisma/schemas/mihoyo.prisma
call npx prisma generate --schema=./prisma/schemas/system_user.prisma 
call xcopy "%~dp0prisma\generated\*" "%~dp0dist\prisma\generated\" /S /Y /I