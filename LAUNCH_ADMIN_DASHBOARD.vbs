Set WshShell = CreateObject("WScript.Shell")
' Get the directory where this script is located
scriptDir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
' Run the batch file hidden
WshShell.Run chr(34) & scriptDir & "\LAUNCH_ADMIN_DASHBOARD.bat" & Chr(34), 0
Set WshShell = Nothing
