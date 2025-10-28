#!/bin/bash

# Component Generator Script for ReStore
# This script installs all necessary shadcn/ui components

echo "🚀 Installing shadcn/ui components for ReStore..."
echo ""

# Array of all components needed
components=(
  "input"
  "label"
  "badge"
  "card"
  "checkbox"
  "sheet"
  "select"
  "tabs"
  "radio-group"
  "slider"
  "textarea"
  "dialog"
  "dropdown-menu"
  "separator"
  "avatar"
  "toast"
  "form"
  "table"
  "skeleton"
  "alert"
  "alert-dialog"
  "aspect-ratio"
  "accordion"
  "calendar"
  "command"
  "context-menu"
  "hover-card"
  "menubar"
  "navigation-menu"
  "popover"
  "progress"
  "scroll-area"
  "switch"
  "toggle"
  "toggle-group"
  "tooltip"
)

# Counter for progress
total=${#components[@]}
current=0

# Install each component
for component in "${components[@]}"; do
  current=$((current + 1))
  echo "[$current/$total] Installing $component..."
  npx shadcn@latest add $component -y
done

echo ""
echo "✅ All components installed successfully!"
echo ""
echo "📦 Components installed in: src/components/ui/"
echo ""
echo "🎨 You can now use these components in your React components!"
echo "Example: import { Button } from '@/components/ui/button'"
