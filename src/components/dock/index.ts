import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { IApp } from '../../core/apps'
import { Event } from '../../core/event'

@Component({
    id: 'tl-phone-dock',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class DockComponent extends ComponentHelper implements RenderOnInit {

    RenderOnInit(): void {
        Event.on('phone:apps:toggle', () => {
            this.Element?.classList.toggle('show-apps')
            Event.emit(this.Element?.classList.contains('show-apps') ? 'phone:apps:on:show' : 'phone:apps:on:hide')
        })

        Event.on('phone:dock:hide', () => this.Element.classList.add('hide'))

        Event.on(['phone:dock:show', 'phone:app:close', 'phone:navigation:home'], () => this.Element.classList.remove('hide'))

        Event.on('phone:dock:apps:add', (app: IApp) => this.AddApp(app))

        Event.on('phone:dock:apps:set', (apps: IApp[]) => apps.forEach(app => this.AddApp(app)))

        Event.on('phone:dock:apps:remove', (id: string) => this.RemoveApp(id))

        Event.on(['phone:app:open', 'phone:app:recent'], () => {
            this.Element.classList.add('hide')
            this.Element?.classList.remove('show-apps')
        })
    }

    ToggleApps() {
        Event.emit('phone:apps:toggle')
    }

    AddApp(app: IApp): void {
        let div = document.createElement('div')
        div.setAttribute('app-id', app.id)
        div.className = 'item'
        div.title = app.name
        div.style.setProperty('--image', `url('${app.image}')`)
        div.onclick = () => Event.emit('phone:app:open', app.id)

        this.Element.querySelector('#dock-break-line')?.insertAdjacentElement('afterend', div)
    }

    RemoveApp(id: string): void {
        let element = this.Element.querySelector(`div.item[app-id="${id}"]`)
        element?.classList.add('remove')
        setTimeout(() => {
            element?.parentElement?.removeChild(element!)
        }, 300);
    }
}
