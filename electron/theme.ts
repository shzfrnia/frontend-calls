import { ipcRenderer, ipcMain, nativeTheme } from "electron"

const applyTheme: Window["ipcRenderer"]["applyTheme"] = (theme) => {
  ipcRenderer.invoke("apply-theme", theme)
}

const getSystemTheme: Window["ipcRenderer"]["getSystemTheme"] = () => {
  return ipcRenderer.invoke("get-system-theme")
}

export const ipcMainEvents = () => {
  ipcMain.handle("apply-theme", (_event, theme) => {
    nativeTheme.themeSource = theme
  })

  ipcMain.handle("get-system-theme", () => {
    return nativeTheme.shouldUseDarkColors ? "dark" : "light"
  })
}

export default { applyTheme, getSystemTheme }
