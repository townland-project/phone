import { IPhoneStatusTheme } from '@townland-project/app'
import { Bind, Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { App } from '../../core/apps'
import { Event } from '../../core/event'

@Component({
    id: 'tl-phone-status',
    template: require('./component.htmlx'),
    style: require('./component.scssx'),
    attr: {
        'style': '--row: 0;'
    }
})
export class StatusComponent extends ComponentHelper implements RenderOnInit {
    @Bind('time') time: string = '00:00'

    get Theme(): IPhoneStatusTheme {
        let root = getComputedStyle(document.querySelector('tl-phone')!)

        let background = this.Element.style.getPropertyValue('--townland-phone-status-background-color')
        let content = this.Element.style.getPropertyValue('--townland-phone-status-color')
        let blur = this.Element.style.getPropertyValue('--townland-phone-status-color')

        return {
            background: background.length == 0 ? root.getPropertyValue('--townland-phone-status-background-color').trim() : background.trim(),
            content: content.length == 0 ? root.getPropertyValue('--townland-phone-status-color').trim() : content.trim(),
            blur: blur.length == 0 ? parseInt(root.getPropertyValue('--townland-phone-status-blur').replace('px', '')) : parseInt(blur.replace('px', ''))
        }
    }

    RenderOnInit(): void {
        Event.on('phone:time', (time: string) => this.time = time)

        Event.on('phone:apps:on:show', () => this.Element?.classList.add('transparent'))

        Event.on('phone:apps:on:hide', () => this.Element?.classList.remove('transparent'))

        Event.on('phone:status:background', (color: string) => this.Element.style.setProperty('--townland-phone-status-background-color', color))

        Event.on('phone:status:color', (color: string) => this.Element.style.setProperty('--townland-phone-status-color', color))

        Event.on('phone:status:blur', (size: string) => this.Element.style.setProperty('--townland-phone-status-blur', `${size}px`))

        Event.on('phone:status:set', (background, color, blur) => {
            this.Element.style.setProperty('--townland-phone-status-background-color', background)
            this.Element.style.setProperty('--townland-phone-status-color', color)
            this.Element.style.setProperty('--townland-phone-status-blur', `${blur}px`)
        })

        Event.on(['phone:status:reset', 'phone:app:ready', 'phone:navigation:home'], () => this.Element.removeAttribute('style'))

        Event.on('phone:app:on:open', () => {
            this.Element.style.setProperty('--townland-phone-status-background-color', 'transparent')
            this.Element.style.setProperty('--townland-phone-status-color', '#000')
            this.Element.style.setProperty('--townland-phone-status-blur', `0px`)
        })

        App.on('phone:theme:status', () => {
            App.emit('phone:theme:status', this.Theme)
        })

        App.on('phone:theme:status:set', (value: IPhoneStatusTheme) => {
            if (value.background) this.Element.style.setProperty('--townland-phone-status-background-color', value.background)
            if (value.content) this.Element.style.setProperty('--townland-phone-status-color', value.content)
            if (value.blur) this.Element.style.setProperty('--townland-phone-status-blur', `${value.blur}pz`)
        })
    }
}
