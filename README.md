# Don't Nobody Give a Shit Jason - Simple Site

This is a straightforward static site implementation for dontnobodygiveashitjason.org.

## How It Works

1. The site displays text from `message.txt` in big ghostly letters
2. A floating image bounces around the screen
3. You can easily update the site by editing just the text file

## Deployment Instructions

### First-time Setup

1. Create a new GitHub repository
2. Upload these files to the repository:
   - `index.html` (the main site file)
   - `message.txt` (contains the text to display)
   - `jason-image.png` (your current site image)
3. Connect the repository to Vercel:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure the project (use default settings)
   - Deploy

### Updating the Site

To update the message displayed on the site:

1. Go to your GitHub repository on your phone
2. Navigate to the `message.txt` file
3. Click the edit button (pencil icon)
4. Update the text
5. Commit changes directly to the main branch
6. Vercel will automatically deploy the updated site

## Customizing the Site

You can easily customize the site by editing the HTML file:

- Change the background color in the CSS `body` section
- Adjust the text size with the `font-size` property in the `#message` section
- Modify the floating image animation in the `@keyframes bounce` section
- Adjust the text animation in the `@keyframes pulse` section

## Files

- `index.html` - The main HTML file with all the code
- `message.txt` - Contains the text to display on the site
- `jason-image.png` - Your image that bounces around the screen
