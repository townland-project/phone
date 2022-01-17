import { Component, ComponentHelper, RenderOnDestroy, RenderOnInit } from '@townland-project/dom'
import { App } from '../../core/apps';
import { Event } from '../../core/event';

@Component({
    id: 'tl-phone-app',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class AppComponent extends ComponentHelper implements RenderOnInit, RenderOnDestroy {
    private timeout: number = 1000;

    RenderOnInit(): void {
        let start = Date.now()
        let iframe = App.Iframe

        iframe.onload = () => {
            // listen to iframe message
            App.ListenToAppEvent()
            
            let now = Date.now()

            setTimeout(() => {
                Event.emit('phone:app:ready')
                this.HideSplash()
            }, this.timeout - (now - start));
        }
    }

    RenderOnDestroy(): void {
        App.Close()
    }

    HideSplash(): void {
        this.Element.querySelector('div.splash')?.classList.add('hide')
    }
}
