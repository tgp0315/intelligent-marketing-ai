; HM NIS Edit Wizard helper defines
!include "MUI2.nsh"
; ; MUI Settings
!define MUI_ABORTWARNING
; 欢迎页面
!insertmacro MUI_PAGE_WELCOME
; 选择安装目录页面
!insertmacro MUI_PAGE_DIRECTORY
; 安装页面
!insertmacro MUI_PAGE_INSTFILES
; 安装完成页面
!insertmacro MUI_PAGE_FINISH
ShowInstDetails show
ShowUnInstDetails show
SpaceTexts show
; 安装脚本
!macro customInstall
!macroend
