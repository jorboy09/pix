import client from 'socket.io-client'
import { addInboxMessage } from './redux/inbox/action'
import { store } from './redux/store'

const socket = client.connect(process.env.REACT_APP_BACKEND_URL!)



socket.on('add-message', (message: any) => {
    store.dispatch(addInboxMessage({
        ...message
    }))
})