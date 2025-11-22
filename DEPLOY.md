# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `EasySearch` (or your preferred name)
3. Description: "A modern search interface with Google Dorks support"
4. **Make sure to select "Public"**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, run these commands:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/EasySearch.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your `EasySearch` repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"
7. Your site will be live in minutes!

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# For production deployment:
vercel --prod
```

## Configuration

The `vercel.json` file is already configured for Vite. Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to a production URL

## After Deployment

Your app will be available at: `https://your-project-name.vercel.app`

You can also add a custom domain in Vercel settings.

