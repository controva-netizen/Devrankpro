Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\ANC\.gemini\antigravity-ide\brain\28c55f46-7e76-4dad-9e65-d5220019d4df\controva_logo_1785128366508.png"
$outPath1 = "c:\Users\ANC\Downloads\Kimi_Agent_devrankpro2\app\public\images\controva_logo_500x500.png"
$outPath2 = "C:\Users\ANC\.gemini\antigravity-ide\brain\28c55f46-7e76-4dad-9e65-d5220019d4df\controva_logo_500x500.png"

$img = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap(500, 500)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, 0, 0, 500, 500)
$bmp.Save($outPath1, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Save($outPath2, [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
$bmp.Dispose()
$g.Dispose()
Write-Host "Resized image to 500x500 successfully!"
