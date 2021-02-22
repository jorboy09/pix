import { Request, Response } from 'express'
import { FanListService } from '../services/fanlist.service'

export class FanListController {
    constructor(private fanListService: FanListService) { }

    public getFanList = async (req: Request, res: Response) => {
        try {
            let result = (await this.fanListService.getfanList(req.body.searchtext, req.body.date)).rows
            res.json({ result: true, list: result })
        }catch(e){
            res.json({result: false})
        }
    }

    public setSuperFan = async (req: Request, res: Response) =>{
        try {
            let result = await this.fanListService.setSuperFan(parseInt(req.body.id))
            if (result.length === 1) {
                res.json({result: true})
            }else {
                res.json({result: false})
            }
        }catch (e){
            res.json({result: false})
        }
    }

    public banFan = async (req: Request, res: Response) =>{
        try {
            let result = await this.fanListService.banFan(parseInt(req.body.id))
            if (result.length === 1) {
                res.json({result: true})
            }else {
                res.json({result: false})
            }
        }catch (e){
            res.json({result: false})
        }
    }
}