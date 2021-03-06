import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgPipesModule } from 'ngx-pipes'

import { ToolbarButtonProvider, TabRecoveryProvider } from 'terminus-core'

import { HotkeyInputModalComponent } from './components/hotkeyInputModal.component'
import { MultiHotkeyInputComponent } from './components/multiHotkeyInput.component'
import { SettingsTabComponent } from './components/settingsTab.component'
import { SettingsTabBodyComponent } from './components/settingsTabBody.component'

import { ButtonProvider } from './buttonProvider'
import { RecoveryProvider } from './recoveryProvider'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule,
        NgPipesModule,
    ],
    providers: [
        { provide: ToolbarButtonProvider, useClass: ButtonProvider, multi: true },
        { provide: TabRecoveryProvider, useClass: RecoveryProvider, multi: true }
    ],
    entryComponents: [
        HotkeyInputModalComponent,
        SettingsTabComponent,
    ],
    declarations: [
        HotkeyInputModalComponent,
        MultiHotkeyInputComponent,
        SettingsTabComponent,
        SettingsTabBodyComponent,
    ],
})
export default class SettingsModule {
}

export * from './api'
export { SettingsTabComponent }
