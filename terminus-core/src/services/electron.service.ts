import { Injectable } from '@angular/core'
import { TouchBar } from 'electron'

@Injectable()
export class ElectronService {
    app: any
    ipcRenderer: any
    shell: any
    dialog: any
    clipboard: any
    globalShortcut: any
    screen: any
    remote: any
    TouchBar: typeof TouchBar
    private electron: any

    constructor () {
        this.electron = require('electron')
        this.remote = this.electron.remote
        this.app = this.remote.app
        this.screen = this.remote.screen
        this.dialog = this.remote.dialog
        this.shell = this.electron.shell
        this.clipboard = this.electron.clipboard
        this.ipcRenderer = this.electron.ipcRenderer
        this.globalShortcut = this.remote.globalShortcut
        this.TouchBar = this.remote.TouchBar
    }

    remoteRequire (name: string): any {
        return this.remote.require(name)
    }

    remoteRequirePluginModule (plugin: string, module: string, globals: any): any {
        return this.remoteRequire(this.remoteResolvePluginModule(plugin, module, globals))
    }

    remoteResolvePluginModule (plugin: string, module: string, globals: any): any {
        return globals.require.resolve(`${plugin}/node_modules/${module}`)
    }

    loseFocus () {
        if (process.platform === 'darwin') {
            this.remote.Menu.sendActionToFirstResponder('hide:')
        }
    }
}
