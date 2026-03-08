import { ipcRenderer } from "electron"

const applyTheme: Window["ipcRenderer"]["applyTheme"] = (theme) => {
  ipcRenderer.invoke("apply-theme", theme)
}

const getSystemTheme: Window["ipcRenderer"]["getSystemTheme"] = () => {
  return ipcRenderer.invoke("get-system-theme")
}

export default { applyTheme, getSystemTheme }
