import { shell, ipcMain, ipcRenderer } from "electron"

const openExternal: Window["ipcRenderer"]["openExternal"] = (url) => {
  ipcRenderer.invoke("open-external", url)
}

export const ipcMainEvents = () => {
  ipcMain.handle("open-external", (_event, url) => {
    shell.openExternal(url)
  })
}

export default { openExternal }
