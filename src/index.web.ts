import { Eventer } from "@townland-project/eventer"
import { GeneratePhone } from "."
import { App, IApp } from "./core/apps";
import { Event } from "./core/event";

GeneratePhone(new Eventer())
    .then(element => {
        document.getElementById('root')?.appendChild(element!);
        return Promise.resolve()
    })
    .then(() => {
        FakeData()
    })

function FakeData() {
    SetTime()
    SetDockApps()
}

function SetTime() {
    let now = new Date()
    let timeout = 59 - now.getSeconds()
    emit(now)
    setTimeout(() => {
        setInterval(() => {
            emit()
        }, 60 * 1000)
    }, timeout);

    function emit(now: Date = new Date()) {
        let hour: any = now.getHours()
        hour = hour < 10 ? `0${hour}` : hour
        let min: any = now.getMinutes()
        min = min < 10 ? `0${min}` : min
        Event.emit('phone:time', `${hour}:${min}`)
    }
}

function SetDockApps(): void {
    let apps: IApp[] = [
        {
            id: 'xyz.townland.app',
            name: 'Application',
            external_url: 'https://application.townland.xyz',
            image: 'https://dapp.townland.xyz/id/xyz.townland.app/image.png',
        }
    ]

    Event.emit('phone:dock:apps:set', apps)
    App.Set(apps)
}