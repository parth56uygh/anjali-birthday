#!/bin/bash

echo "========================================="
echo "Birthday Website Deployment Script"
echo "========================================="
echo ""

# Configuration
GITHUB_USERNAME="parth56uygh"
REPO_NAME="anjali-birthday"

echo "Step 1: Configuring Git..."
git config --global user.email "your-email@example.com"
git config --global user.name "$GITHUB_USERNAME"

echo ""
echo "Step 2: Initializing Git repository..."
git init

echo ""
echo "Step 3: Adding files..."
git add .

echo ""
echo "Step 4: Creating commit..."
git commit -m "Initial commit: Birthday website for Anjali"

echo ""
echo "Step 5: Setting main branch..."
git branch -M main

echo ""
echo "Step 6: Adding remote repository..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

echo ""
echo "========================================="
echo "IMPORTANT: Next Steps"
echo "========================================="
echo ""
echo "Run these commands manually:"
echo ""
echo "1. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "2. Deploy to GitHub Pages:"
echo "   yarn deploy"
echo ""
echo "When prompted for credentials:"
echo "  Username: $GITHUB_USERNAME"
echo "  Password: [Your Personal Access Token]"
echo ""
echo "========================================="
