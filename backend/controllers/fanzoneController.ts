import { Request, Response } from 'express'
import { FanzoneService } from '../services/fanzoneService'
import SocketIO from 'socket.io'

export class FanzoneController {
    constructor(private fanzoneService: FanzoneService, private io: SocketIO.Server) { }

    getFanzone = async (req: Request, res: Response) => {
        try {
            let message = await this.fanzoneService.getFanzone();
            res.json(message)
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

    postFanzone = async (req: Request, res: Response) => {
        try {
            // const body =  {fansid: req.body.fansid, message: req.body.message}
            let message = await this.fanzoneService.postFanzone(req.body.fansid, req.body.message, req.body.isCreator);
            this.io.emit('fanboard-message', message)
            res.json({ result: true })
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }
}