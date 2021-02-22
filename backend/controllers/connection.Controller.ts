import { Request, Response } from 'express'
import { ConnectionService } from '../services/connection.service'

export class ConnectionController {
    constructor(private connectionservice: ConnectionService) { }

    public initialize = async (req: Request, res: Response) => {
        try {
            let result = (await this.connectionservice.initializeList(req.body.list))
            res.json({ result: true, list: result })
        } catch (e) {
            res.json({ result: false })
        }
    }

    public addNewDomain = async (req: Request, res: Response) => {
        try {
            let result = (await this.connectionservice.updateList(req.body.creator, req.body.front, req.body.api))
            if (result.length === 1) {
                res.json({ result: true })
            } else {
                res.json({ result: false })
            }
        } catch (e) {
            res.json({ result: false })
        }
    }

    public fetchToNewDomain = async (req: Request, res: Response) => {
        let newApi = 'https://' + req.body.api + '/initDomain'
        try {
            const list = await this.connectionservice.getAllDomain()
            let response = await fetch(newApi, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ list: list })
            })
            const json = await response.json()
            if (json.result) {
                res.json({ result: true })
            }
        } catch (e) {
            res.json({ result: false })
        }
    }

    public fetchToExistDomain = async (req: Request, res: Response) => {
        try {
            let domainApis = await this.connectionservice.getAllApis()
            for (let apiObj of domainApis) {
                try {
                    let api = 'https://' + apiObj.api + '/addNewDomain'
                    const response = await fetch(api, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ creator: req.body.creator, front: req.body.front, api: req.body.api })
                    })
                    await response.json()
                } catch (e) {
                    continue;
                }
            }
            res.json({ result: true })
        } catch (e) {
            res.json({ result: false })
        }
    }
}
