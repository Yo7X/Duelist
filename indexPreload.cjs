const { ipcRenderer } = require("electron");
console.log('Preload script init')

window.onload = (() => {
    console.log('page fully loaded')

    document.getElementById("openSmartMouthButton").addEventListener("click", () => {
      ipcRenderer.invoke("openWindow", "smartMouthControls");
    });

    document.getElementById("openScreenOverlaysButton").addEventListener("click", () => {
      ipcRenderer.invoke("openWindow", "screenOverlayControls");
    });
})

console.log("Preload script executed");
