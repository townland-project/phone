import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { IApp } from '../../core/apps'
import { Event } from '../../core/event'

@Component({
    id: 'tl-phone-apps',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class AppsComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        Event.on('phone:apps:set', (apps: IApp[]) => {
            this.ClearApps()
            apps.forEach(app => this.AddApp(app));
        })
        Event.on('phone:apps:add', (app: IApp) => this.AddApp(app))
        Event.on('phone:apps:reindex', () => this.ReIndex())
        Event.on('phone:apps:remove', (id: string) => this.RemoveApp(id))
        Event.on('phone:apps:open', (id: string) => this.ClickApp(id))
        Event.on('phone:apps:clear', () => this.ClearApps())
    }

    ReIndex() {
        this.Element?.querySelectorAll('div.app').forEach((app, index) => {
            (app as HTMLDivElement).style.setProperty('--index', index.toString())
        })
    }

    AddApp(app: IApp) {
        let index = this.Element?.querySelectorAll('div.app').length

        let div = document.createElement('div')
        div.className = 'app'

        let icon = document.createElement('div')
        icon.className = 'icon'

        div.appendChild(icon)

        let span = document.createElement('span')
        span.innerText = app.name

        div.appendChild(span)

        div.setAttribute('app-id', app.id)
        div.style.setProperty('--index', index.toString())
        div.style.setProperty('--image', `url('${app.image}')`)

        div.onclick = () => Event.emit('phone:app:open', app.id)

        this.Element?.appendChild(div)
    }

    RemoveApp(id: string) {
        this.Element?.removeChild(this.Element?.querySelector(`div.app[app-id="${id}"]`)!)
        this.ReIndex()
    }

    ClickApp(id: string) {
        let app: HTMLDivElement = this.Element?.querySelector(`div.app[app-id="${id}"]`)!
        app.click()
    }

    ClearApps() {
        this.Element.innerHTML = '';
    }
}
