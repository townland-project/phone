import { Bind, Component, ComponentHelper, RenderComponent, RenderOnInit } from '@townland-project/dom'
import { App, IApp } from '../../core/apps'
import { Event } from '../../core/event'
import { AppComponent } from '../app'

@Component({
    id: 'tl-phone-screen',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class ScreenComponent extends ComponentHelper implements RenderOnInit {
    private brightness: number = 100;

    RenderOnInit(): void {
        this.Element.style.setProperty('--brightness', `${this.brightness}%`)

        Event.on('phone:app:recent', () => {
            this.Element.querySelector('section')?.classList.add('show-app')
        })

        Event.on('phone:app:open', (id: string) => {
            if (App.Opened && App.Opened.id == id) {
                // open recent app
                this.Element.querySelector('section')?.classList.add('show-app')
            } else {
                let app = App.Open(id)
                if (app) {
                    Event.emit('phone:app:on:open')
                    this.SetApp(app)
                    this.Element.querySelector('section')?.classList.add('show-app')
                }
            }
        })

        Event.on('phone:app:close', () => {
            this.Element.querySelector('section')?.classList.remove('show-app')
        })

        Event.on('phone:navigation:home', () => this.Element.querySelector('section')?.classList.remove('show-app'))

        App.on('app:close', () => {
            Event.emit('phone:app:close')
            this.Element.querySelector('div#phone-app')!.innerHTML = '';
        })

        App.on('phone:brightness', () => {
            App.emit('phone:brightness', this.brightness)
        })

        App.on('phone:brightness:set', (value: number) => {
            this.brightness = value
            this.Element.style.setProperty('--brightness', `${value}%`)
        })
    }

    async SetApp(app: IApp): Promise<void> {
        let container = this.Element.querySelector('div#phone-app') as HTMLDivElement

        container.innerHTML = ''
        container.appendChild(
            await RenderComponent(
                AppComponent,
                {
                    Values: {
                        name: app.name,
                        image: app.image,
                        src: app.external_url
                    }
                }
            )
        )
    }
}
