import { app, BrowserWindow, ipcMain, screen, desktopCapturer} from 'electron';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();

import { fork } from "child_process";

ipcMain.handle("test", async () => {
  const sources = await desktopCapturer.getSources({ types: ["screen"] });

  return {
    videoId: sources[0].id,
    audio: "loopback"
  };
});



function createScreenOverlaySettings() {
    const mainWindow = new BrowserWindow({
      title: "Screen Overlay Settings",
      width: 1000,
      height: 550,
      autoHideMenuBar: true,

      webPreferences: {
        preload: path.join(__dirname, "screenOverlaySettings.cjs"),
        nodeIntegration: true, //This is here so fs can be used in the ^prelaod script | sould be changed if ever making this a prod applciation
      },
    });

    mainWindow.loadFile("renderer/screenOverlaySettings.html");
};

let overlay_window
function create_overlay_window() {
  overlay_window = new BrowserWindow({
    title: "Overlay",
    width: 1280,
    height: 750,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "overlay.cjs"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      sandbox: true,
      backgroundThrottling: false
    },
  });

  overlay_window.loadFile("renderer/overlay.html");
}

function createExpScreenOverlaySettings() {
    const mainWindow = new BrowserWindow({
      title: "Screen Overlay Settings",
      width: 600,
      height: 800,
      autoHideMenuBar: true,

      webPreferences: {
        preload: path.join(__dirname, "x.cjs"),
      },
    });

    mainWindow.loadFile("renderer/expScreenOverlaySettings.html");
};

function create() {
  overlay_window = new BrowserWindow({
    title: "Overlay",
    width: 600,
    height: 800,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "expScreenOverlaySettings.cjs"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      sandbox: true,
      backgroundThrottling: false
    },
  });

  overlay_window.loadFile("renderer/expScreenOverlaySettings.html");
}

app.whenReady().then(() => {
  create()
  //createExpScreenOverlaySettings()
  //createScreenOverlaySettings();
});


ipcMain.handle("openWindow", (event, window) => {
  switch (window) {
    case "overlay":
      create_overlay_window();
    break;
    default:
      console.log("Default case triggered");
    break;
  }
});

ipcMain.handle("change_overlay_screen", (event, chosenScreen) => {
  overlay_window.webContents.send("changeScreen",chosenScreen);
  console.log(`Changing screen to ${chosenScreen}`)
});

ipcMain.handle("change_trailerState", (event, chosenState) => {
  overlay_window.webContents.send("toggleTrailers", chosenState);
  console.log(`Setting trailers to ${chosenState}`);
});

ipcMain.handle("change_timer", (event, chosenTime) => {
  overlay_window.webContents.send("changeTimer", chosenTime);
  console.log(`Changing the main screen timer to ${chosenTime}`);
});

ipcMain.handle("change_team_values", (event, team1, team2) => {
  overlay_window.webContents.send("changeTeamNames", team1, team2);
  console.log(`Changing team names to ${team1} and ${team2}`);
});

ipcMain.handle("change_logo_values", (event, team1, team2) => {
  overlay_window.webContents.send("changeTeamLogos", team1, team2);
  console.log(`Changing team logos to ${team1} and ${team2}`);
});

ipcMain.handle("change_guestSlotState", (event, chosenState) => {
  overlay_window.webContents.send("toggleGuestSlot", chosenState);
  console.log(`Setting trailers to ${chosenState}`);
});

ipcMain.handle("change_caster_names", (event, caster1, guest, caster2) => {
  overlay_window.webContents.send("changeCasterNames", caster1, guest, caster2);
  console.log(`Changing caster names to ${caster1}, ${caster2}, and ${guest}`);
});

const smartMouth = fork("smartMouth.cjs");

smartMouth.on("close", (code) => {
  console.log("Smart Mouth exited with the code: " + code);
});

ipcMain.handle("change_botConnectionStatus", (event, state) => {
  smartMouth.send({action: state});
  console.log(`Bot connection status set to ${state}`);
});

let commentatorId01 = "";
let commentatorId02 = "";
let guestId = "";

smartMouth.on("message", (msg) => {
  let change = null;
  switch (msg.id) {
    case commentatorId01:
      console.log(`Commentator 1 (${msg.id}) ${msg.type}ed talking`);
      change = "c1Change";
      break;
    case commentatorId02:
      console.log(`Commentator 2 (${msg.id}) ${msg.type}ed talking`);
      change = "c2Change";
      break;
    case guestId:
      console.log(`The guest (${msg.id}) ${msg.type}ed talking`);
      change = "guestChange";
      break;
    default:
      console.log(`A third party ${msg.type}ed talking`);
      break;
  }

  overlay_window.webContents.send("changeCasterImageState", change);
});

ipcMain.handle("change_caster_ids", (event, caster1, guest, caster2) => {
  commentatorId01 = caster1;
  commentatorId02 = caster2;
  guestId = guest;
  console.log(`Changing caster ids to ${caster1}, ${caster2}, and ${guest}`);
});

ipcMain.handle("change_caster_images", (event, c1_i1, c1_i2, c2_i1, c2_i2, g_i1, g_i2) => {
  overlay_window.webContents.send("changeCasterImages", c1_i1, c1_i2, c2_i1, c2_i2, g_i1, g_i2);
  console.log(`Changing caster images`);
});

ipcMain.handle("change_roundTitle", (event, title) => {
  overlay_window.webContents.send("changeRoundTitle", title);
  console.log(`Changing round title`);
});

ipcMain.handle("change_teamPoints", (event, t1, t2) => {
  overlay_window.webContents.send("changeTeamPoints", t1, t2);
  console.log(`Changing team points`, t1, t2);
});

ipcMain.handle("change_roundWins", (event, t1, t2) => {
  overlay_window.webContents.send("changeRoundWins", t1, t2);
  console.log(`Changing rounds`, t1, t2);
});

ipcMain.handle("reset_roundWins", (event) => {
  overlay_window.webContents.send("resetRoundWins");
  console.log(`Reseting rounds`, value);
});

ipcMain.handle("update_pick/bans", (event, t1, t2, current) => {
  overlay_window.webContents.send("updateP/b", t1, t2, current);
  console.log(`Update p/b`, t1, t2);
});

ipcMain.handle("update_globalBans", (event, template) => {
  overlay_window.webContents.send("updateGlobalBans", template);
  console.log(`2`, template);
});

// ipcMain.handle("update_globalBans", (event, template) => {
//   overlay_window.webContents.send("updateGlobalBans", template);
//   console.log(`2`, template);
// });

ipcMain.handle('update_pickedMap', (event, source) => {
  overlay_window.webContents.send("updateMapPick", source)
  console.log(`Map pick is now ${source}`)
})

ipcMain.handle('update_bannedMaps', (event, banList) => {
  overlay_window.webContents.send("updateMapBans", banList)
  console.log(`Banned maps are now ${source}`)
})