import * as Knex from 'knex';
import express, { Request, Response } from 'express'
import updateService from '../services/updateService'

export default class UpdateController {
    constructor(private Service: updateService) { }

    public queryUpdatePassword = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['body'].password, 'password')
        res.status(200).json({ result: result })
    }

    public queryUpdateDescription = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['body'].description, 'description')
        res.status(200).json({ result: result })
    }

    public queryUpdatePFP = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['file'], 'pfp')
        res.status(200).json({ result: result })
    }

    public queryUpdateCVP = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['file'], 'cvp')
        res.status(200).json({ result: result })
    }

    public queryUpdateColourTheme = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['body'].colour_theme, 'colour_theme')
        res.status(200).json({ result: result })
    }

    public queryInvertColourTheme = async (req: Request, res: Response) => {
        const result = await this.Service.updateProfile_Query(req['body'].username, req['body'].invert, 'invert')
        res.status(200).json({ result: result })
    }
}