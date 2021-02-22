import { Request, Response } from 'express'
import { CalendarService } from '../services/calendar.service'

export class CalendarController {
    constructor (private calendarservice: CalendarService){}

    public getEventList = async (req: Request, res: Response) => {
        try {
            let result = (await this.calendarservice.getEventList())
            res.json({result: true, event: result})
        }catch(e) {
            res.json({result: false})
        }
    }

    public addEvent = async (req: Request, res: Response) => {
        try {
            let result = (await this.calendarservice.addEvent(req.body))
            if (result.length === 1){
                res.json({result: true})
            }else{
                res.json({result: false})
            }
        }catch(e){
            res.json({result: false})
        }
    }
}