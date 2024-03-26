!macro customFinishPage
AutoCloseWindow true
Function StartApp
    ${if} ${isUpdated}
      StrCpy $1 "--updated"
    ${else}
      StrCpy $1 ""
    ${endif}
    ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function .onInstSuccess
    Call StartApp
FunctionEnd

!macroend
