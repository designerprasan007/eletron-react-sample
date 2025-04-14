// Import the 'app' and 'BrowserWindow' modules from Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = true; // Setting up default true for dev env

let mainWindow; // Global reference to the main application window


// Function to create the main browser window
function createWindow() {
  // Create a new browser window with specified dimensions and settings
  mainWindow = new BrowserWindow({
    fullscreen:true,
    resizable:true,
    minimizable:true,
    maximizable:true,
    title: "React-Electron App"
  });

  // Define the URL to load in the window (e.g., a local dev server)
  const startURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`;


  // Load the specified URL in the browser window
  mainWindow.loadURL(startURL);

  // Event: when the window is closed, dereference it (helps with memory management)
  mainWindow.on('closed', () => (mainWindow = null));
}

// Event: Electron has finished initialization and is ready to create browser windows
app.on('ready', createWindow);

// Event: All windows are closed
app.on('window-all-closed', () => {
  // On macOS, it's common for applications to stay open until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit(); // Quit the app for Windows/Linux
  }
});

// Event: App is activated (e.g., user clicks dock icon on macOS)
app.on('activate', () => {
  // On macOS, re-create the window if no other windows are open
  if (mainWindow === null) {
    createWindow();
  }
});