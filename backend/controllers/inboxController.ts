import { Request, Response } from 'express'
import { InboxService } from '../services/inboxService';
import SocketIO from 'socket.io'

export interface InboxInterface {
    username: string | null,
    super_fans: boolean | null,
    creator: boolean | null,
    message: string | null,
    id: number,
    created_at: string,
    updated_at: string

}

export class InboxController {
    constructor(private inboxService: InboxService, private io: SocketIO.Server) { }

    getInboxMessage = async (req: Request, res: Response) => {
        try {
            let message = await this.inboxService.getInboxMessage(parseInt(req.params.id));
            res.json(message)
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

    getAllFansName = async (req: Request, res: Response) => {
        try {
            let nameList = await this.inboxService.getAllFansMessageNames();
            res.json(nameList)
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

    postInboxMessage = async (req: Request, res: Response) => {

        const body = req.body.inboxAll[0] as InboxInterface
        try {
            let message = await this.inboxService.postInboxMessage(body.creator, body.message, body.id);
            this.io.emit('add-message', message[0])
            
            res.json({ message: message, result: true })

        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }
}
