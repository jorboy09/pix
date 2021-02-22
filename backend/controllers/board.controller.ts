import { Request, Response } from 'express'
import { BoardService } from '../services/board.service'

export class BoardController {
    constructor(private boardservice: BoardService) { }

    public getCustomBoard = async (req: Request, res: Response) => {
        try {
            let result = (await this.boardservice.getCustomBoard())
            res.json({ result: true, info: result })
        } catch (e) {
            res.json({ result: false })
        }
    }

    public customizeBoard = async (req: Request, res: Response) => {
        try {
            let result = (await this.boardservice.customizeBoard(req.body, req.file))
            if (result.length === 1) {
                res.json({ result: true, info: result[0] })
            } else {
                res.json({ result: false })
            }
        } catch (e) {
            res.json({ result: false })
        }
    }
}