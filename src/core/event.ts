import { Eventer } from '@townland-project/eventer'

export let Event: Eventer<TEvents>

export function SetEventer(eventer: Eventer<any>) {
    Event = eventer
}

export type TEvents =
    'phone:apps:set' | 'phone:apps:add' | 'phone:apps:reindex' | 'phone:apps:remove' | 'phone:apps:open' | 'phone:apps:clear' | 'phone:apps:toggle' |
    'phone:apps:on:show' | 'phone:apps:on:hide' |
    'phone:dock:show' | 'phone:dock:hide' | 'phone:dock:apps:set' | 'phone:dock:apps:add' | 'phone:dock:apps:remove' |
    'phone:time' | 'phone:app:recent' | 'phone:app:open' | 'phone:app:close' | 'phone:app:on:open' | 'phone:app:ready' |
    'phone:status:background' | 'phone:status:color' | 'phone:status:blur' | 'phone:status:set' | 'phone:status:reset' |
    'phone:navigation:home' | 'phone:navigation:back';