"use strict";
const electron = require("electron");
const applyTheme = (theme) => {
  electron.ipcRenderer.invoke("apply-theme", theme);
};
const getSystemTheme = () => {
  return electron.ipcRenderer.invoke("get-system-theme");
};
const themeFunctions = { applyTheme, getSystemTheme };
const ipcRendererObject = {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  removeAllListeners(...args) {
    return electron.ipcRenderer.removeAllListeners(...args);
  },
  ...themeFunctions
};
electron.contextBridge.exposeInMainWorld("ipcRenderer", ipcRendererObject);
