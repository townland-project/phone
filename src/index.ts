import { Module, RenderModule } from '@townland-project/dom'
import { Eventer } from '@townland-project/eventer'

import { NavigationComponent } from './components/navigation'
import { ScreenComponent } from './components/screen'
import { StatusComponent } from './components/status'
import { MainComponent } from './components/main'
import { AppsComponent } from './components/apps'
import { HomeComponent } from './components/home'
import { DockComponent } from './components/dock'
import { SetEventer } from './core/event'

@Module({
    Component: [
        AppsComponent,
        DockComponent,
        HomeComponent,
        NavigationComponent,
        ScreenComponent,
        StatusComponent
    ],
    Bootstrap: MainComponent
})
export class PhoneModule {}

export async function GeneratePhone(eventer: Eventer<any>): Promise<HTMLElement | undefined> {
    SetEventer(eventer)

    return RenderModule(PhoneModule)
}