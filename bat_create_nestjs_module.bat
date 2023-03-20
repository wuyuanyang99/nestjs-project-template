@echo off
set /P NameInput="请输入将要创建的模块名称"
echo 即将创建~

call nest g mo %NameInput% --no-spec 
call nest g co %NameInput% --no-spec 
call nest g s %NameInput% --no-spec

set BasePath=%~dp0src\%NameInput%

mkdir "%BasePath%\dto" 
type nul>%BasePath%\dto\index.dto.ts
mkdir "%BasePath%\entities"
type nul>%BasePath%\entities\index.entity.ts

echo 创建完成！