# Birthday Website for Anjali 🎂

A beautiful paper-themed birthday website with countdown timer, photo gallery, love letter, and personal messages. Built with React and designed to be deployed on GitHub Pages.

## ✨ Features

- **Countdown Timer**: Shows countdown until birthday (Feb 4, 2026)
- **Photo Gallery**: Upload and display photos (stored in browser localStorage as base64)
- **Password-Protected Love Letter**: Unlock with custom password
- **Personal Messages**: Add multiple message cards
- **Music Playlist**: Taylor Swift top 10 songs player
- **Admin Panel**: Manage all content through an easy-to-use interface
- **Paper Theme**: Beautiful vintage paper aesthetic throughout

## 🚀 Deploying to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you like (e.g., `anjali-birthday`)
3. Make it **public** (required for free GitHub Pages)
4. Don't initialize with README (we'll push existing code)

### Step 2: Configure GitHub Pages

Before pushing code, update the `homepage` field in `/app/frontend/package.json`:

```json
"homepage": "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME"
```

Replace:
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

Example:
```json
"homepage": "https://john.github.io/anjali-birthday"
```

### Step 3: Push Code to GitHub

```bash
cd /app/frontend
git init
git add .
git commit -m "Initial commit: Birthday website for Anjali"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
cd /app/frontend
yarn deploy
```

This command will:
1. Build the production version of your site
2. Create a `gh-pages` branch
3. Push the built files to GitHub Pages

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select `gh-pages` branch
5. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME`

## 🎨 Customizing the Website

### Admin Panel Access

1. Navigate to `/#/admin/login`
2. Default password: `admin123`
3. **Important**: Change the admin password in Settings tab after first login!

### Admin Panel Features

#### 📸 Photos Tab
- Drag & drop photos or click to upload
- Photos are converted to base64 and stored in browser localStorage
- Edit captions or delete photos
- **Note**: Large photos may slow down the site. Resize images to < 1MB before uploading

#### 💌 Love Letter Tab
- Write your heartfelt message
- Edit title and content
- Supports line breaks (use Enter key)

#### 💬 Messages Tab
- Add multiple personal message cards
- Each message has a title and content
- Edit or delete existing messages

#### ⚙️ Settings Tab
- Change girlfriend's name
- Set birthday date and time
- Change love letter unlock password
- Change admin password

## 📱 How It Works

### Data Storage
- All data is stored in browser's `localStorage`
- No backend server required
- No database needed
- Photos stored as base64 encoded strings

### Birthday Unlock
- Website shows countdown until the configured birthday date
- Once the date/time is reached, the full website automatically unlocks
- Visitors can see photos, read messages, and access the love letter (with password)

### Password Protection
- Love letter section requires a password
- Default password: "love"
- Can be changed in admin settings

## 🛠️ Local Development

```bash
cd /app/frontend
yarn start
```

Opens at `http://localhost:3000`

### Building for Production

```bash
yarn build
```

Creates optimized production build in `build/` folder

## 📦 Tech Stack

- **React 19** - UI framework
- **React Router** - Navigation (HashRouter for GitHub Pages compatibility)
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components
- **Lucide React** - Icons
- **React Dropzone** - File uploads
- **localStorage** - Data persistence

## 🎯 Important Notes

### Data Backup
Since all data is stored in browser localStorage:
- **Export your data**: Before clearing browser data or switching browsers
- **Screenshots**: Take screenshots of your content as backup
- **Browser-specific**: Data won't sync across different browsers/devices

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage must be enabled
- JavaScript must be enabled

### Photo Storage Limits
- localStorage has ~5-10MB limit per domain
- Each photo (as base64) takes ~1.3x its original size
- Recommended: Keep photos under 500KB each
- Maximum: ~20-30 photos depending on size

### Custom Domain (Optional)
To use a custom domain instead of github.io:
1. Add a `CNAME` file in `/app/frontend/public/` with your domain
2. Configure DNS settings with your domain provider
3. Follow [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 🎁 Surprise Tips

### Keeping It Secret
1. Use a private browsing window when editing
2. Clear browser history after editing
3. Use a different browser than what she uses
4. Don't share the admin login URL

### Making It Special
1. Upload high-quality photos of your favorite memories
2. Write a genuine, heartfelt love letter
3. Add specific messages about inside jokes or special moments
4. Set the unlock date/time to midnight on her birthday
5. Send her the link a few days before (so she sees the countdown)

## 📝 Troubleshooting

### Site Not Loading
- Check if GitHub Pages is enabled in repository settings
- Verify the `homepage` URL in package.json matches your GitHub Pages URL
- Wait 5-10 minutes after deployment for changes to propagate

### Photos Not Showing
- Check browser console for errors
- Ensure photos are under 1MB each
- Try clearing localStorage and re-uploading

### Forgot Admin Password
- Open browser console (F12)
- Type: `localStorage.clear()`
- Refresh page - this resets everything to defaults
- **Warning**: This deletes all your content!

### Changes Not Reflecting
- Run `yarn deploy` again to redeploy
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub Pages to update

## 📄 License

This is a personal project. Feel free to use it for your own romantic purposes! 💕

## 💝 Credits

Built with love for Anjali's birthday 🎂✨

---

**Happy Birthday Anjali! May this year bring you endless joy and beautiful memories! 🎉💖**
