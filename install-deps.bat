@echo off
echo Installing Tailwind Background Components Dependencies...
echo.

echo [1/7] Installing Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer

echo.
echo [2/7] Installing animation libraries...
call npm install framer-motion clsx tailwind-merge

echo.
echo [3/7] Installing utility libraries...
call npm install lucide-react class-variance-authority

echo.
echo [4/7] Installing Radix UI - Checkbox...
call npm install @radix-ui/react-checkbox

echo.
echo [5/7] Installing Radix UI - Label...
call npm install @radix-ui/react-label

echo.
echo [6/7] Installing Radix UI - Slider...
call npm install @radix-ui/react-slider

echo.
echo [7/7] All dependencies installed!
echo.
echo You can now run: npm run dev
echo.
pause
