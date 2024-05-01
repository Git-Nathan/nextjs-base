import {User} from '../Users'
import {AppFetch} from './AppFetch'

export const appFetch = new AppFetch('Write api host here')

const user = new User()

export const Api = {user}
