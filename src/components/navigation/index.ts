import { Component } from '@townland-project/dom'
import { App } from '../../core/apps'
import { Event } from '../../core/event'

@Component({
    id: 'tl-phone-navigation',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class NavigationComponent {

    Back(): void {
        App.emit('app:back')
    }

    Home(): void {
        Event.emit('phone:navigation:home')
    }

    Recent(): void {
        if (App.Opened)
            Event.emit('phone:app:recent')
    }
}
