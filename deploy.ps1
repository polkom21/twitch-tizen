$tizen = "F:\tizen-studio\tools\ide\bin\tizen.bat"
$widget = "Twitch"
$package = "y2L9ixMUyV"
$folder = "C:\Users\KrzysztofReniecki\workspace\twitchapp\"
$buildFolder = "$($folder)build\"
$buildResultFolder = "$($buildFolder).buildResult"

Set-Location $folder
npm run build
Remove-Item "$($buildFolder)\static\js\*.map"

Write-Host "-- Clean"
&$tizen clean -- $buildFolder
Write-Host "-- Build"
Copy-Item "$($folder)\icon.png" $buildFolder
Copy-Item "$($folder)\config.xml" $buildFolder

&$tizen build-web -- $buildFolder
Write-Host "-- Package"
&$tizen package --type wgt --sign kreniecki -- $buildResultFolder
Write-Host "-- Install"
&$tizen install -- $buildResultFolder -t UE75RU7092UXXH -n "$($widget).wgt"
Write-Host "-- Run"
&$tizen run -p $package -t UE75RU7092UXXH