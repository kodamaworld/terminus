import * as path from 'path'
import { Injectable } from '@angular/core'
import { HostAppService, Platform } from 'terminus-core'

import { ShellProvider, IShell } from '../api'

let Registry = null
try {
    Registry = require('winreg')
} catch (_) { } // tslint:disable-line no-empty

@Injectable()
export class Cygwin32ShellProvider extends ShellProvider {
    constructor (
        private hostApp: HostAppService,
    ) {
        super()
    }

    async provide (): Promise<IShell[]> {
        if (this.hostApp.platform !== Platform.Windows) {
            return []
        }

        let cygwinPath = await new Promise<string>(resolve => {
            let reg = new Registry({ hive: Registry.HKLM, key: '\\Software\\Cygwin\\setup', arch: 'x86' })
            reg.get('rootdir', (err, item) => {
                if (err || !item) {
                    return resolve(null)
                }
                resolve(item.value)
            })
        })

        if (!cygwinPath) {
            return []
        }

        return [{
            id: 'cygwin32',
            name: 'Cygwin (32 bit)',
            command: path.join(cygwinPath, 'bin', 'bash.exe'),
            env: {
                TERM: 'cygwin',
            }
        }]
    }
}
