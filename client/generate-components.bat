@echo off
REM Component Generator Script for ReStore (Windows)
REM This script installs all necessary shadcn/ui components

echo 🚀 Installing shadcn/ui components for ReStore...
echo.

REM List of all components needed
set components=input label badge card checkbox sheet select tabs radio-group slider textarea dialog dropdown-menu separator avatar toast form table skeleton alert alert-dialog aspect-ratio accordion calendar command context-menu hover-card menubar navigation-menu popover progress scroll-area switch toggle toggle-group tooltip

set count=0
for %%c in (%components%) do (
  set /a count+=1
  echo [!count!/37] Installing %%c...
  call npx shadcn@latest add %%c -y
)

echo.
echo ✅ All components installed successfully!
echo.
echo 📦 Components installed in: src/components/ui/
echo.
echo 🎨 You can now use these components in your React components!
echo Example: import { Button } from '@/components/ui/button'
pause
