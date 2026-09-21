# Editing the Portfolio Site

This guide explains how to update the portfolio site without needing any coding expertise.

## How to Update Content
All the site's text content (skills, projects, dates, text) lives in a single file: `src/data/resume.ts`. 
To change anything, simply edit that file. The site will automatically reflect the new information.

## How to Update the Resume PDF
If you need to update the downloadable resume:
1. Replace the file `public/DebanshuPanda_Resume_2027.pdf` with your new PDF. 
2. Ensure you keep the exact same file name. If you must change the file name, make sure to update the `resumeFile` and `resumeName` properties inside `src/data/resume.ts`.

## How to Update the Portrait Photo
To change the portrait photo on the site, you need to replace the following four images in the `public/` folder with your new images (keeping the exact same filenames):
- `public/profile-560.jpg`
- `public/profile-560.webp`
- `public/profile-1000.jpg`
- `public/profile-1000.webp`

## How to Apply Your Changes

### Method A: Directly on GitHub (Easiest)
1. Go to your repository on GitHub.
2. Navigate to the file you want to edit (e.g., `src/data/resume.ts`).
3. Click the pencil icon to edit the file.
4. Make your changes and commit them.
5. The site will automatically redeploy in about a minute.

### Method B: Locally (For larger changes)
1. In your terminal, run `npm run dev` to start the local development server and preview your changes.
2. Once satisfied, open your terminal and run:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```

## Checking Deployments & Rolling Back
- **Check a deploy:** Go to the "Actions" tab in your GitHub repository. You will see the progress of the deployment. A green checkmark means it successfully deployed.
- **Rollback:** If you make a mistake and need to undo a change, you can roll back the commit locally using `git revert <commit-hash>`, or simply edit the file back to its previous state and commit again.
