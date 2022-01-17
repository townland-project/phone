import { TEvent } from '@townland-project/app';
import { Event } from "./event";


export class CApp {
    private _list: IApp[] = [];
    private _openedIndex: number = -1;
    private _eventCallback: Callback = {};

    get Count(): number {
        return this._list.length
    }

    get Opened(): IApp | undefined {
        return this._list[this._openedIndex]
    }

    public Set(apps: IApp[]): void {
        this._list = apps
        Event.emit('phone:apps:set', apps)
    }

    public Add(app: IApp): void {
        this._list.push(app)
        Event.emit('phone:apps:add', app)
    }

    public Remove(id: string): void {
        let index = this._list.findIndex(app => app.id == id)
        this._list.splice(index, 1)
        Event.emit('phone:apps:remove', id)
    }

    public GetById(id: string): IApp | undefined {
        return this._list.find(app => app.id == id)
    }

    public Open(id: string): IApp | undefined {
        this._openedIndex = this._list.findIndex(app => app.id == id)
        return this.Opened
    }

    public Close(): void {
        this._openedIndex = -1;
    }

    public get Iframe(): HTMLIFrameElement {
        return document.getElementById('phone-app-iframe') as HTMLIFrameElement
    }

    public emit(name: TEvent, ...params: any[]): void {
        this.Iframe.contentWindow?.postMessage({ name, params }, this.Opened?.external_url!)
    }

    public on(name: TEvent, callback: CallbackFunction): void {
        if (name in this._eventCallback == false) this._eventCallback[name] = [callback]
        else this._eventCallback[name].push(callback)
    }

    public ListenToAppEvent(): void {
        window.addEventListener('message', (event: MessageEvent<IAppMessage>) => {
            let message = event.data

            if (message.name in this._eventCallback)
                this._eventCallback[message.name].forEach(callback => callback(...message.params))
        })
    }
}

export const App: CApp = new CApp()

export interface IApp {
    id: string
    name: string
    image: string
    external_url: string
}

interface IAppMessage {
    name: string
    params: any | any[]
}

interface Callback {
    [name: string]: CallbackFunction[]
}

interface CallbackFunction {
    (...params: any[]): void
}