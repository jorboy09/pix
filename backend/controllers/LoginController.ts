import * as Knex from 'knex';
import LoginService, { LSMessage, IdUsername, LSEditMessage } from '../services/LoginService'
import express, { Request, Response } from 'express'
import jwtSimple from 'jwt-simple';

export default class LoginController {
    constructor(private Service: LoginService) { }

    private isNotEMessage = (message: LSMessage | IdUsername): message is IdUsername => {
        return (message as IdUsername).id !== undefined;
    }

    public queryLoginCreator = async (req: express.Request, res: Response) => {
        const result = await this.Service.loginCreator(req.body.username, req.body.password)
        if (this.isNotEMessage(result)) {
            res.json({
                token: jwtSimple.encode({
                    id: result.id,
                    username: result.username,
                    isCreator: true
                }, process.env.JWT_SECRET!)
            })
        } else {
            res.status(401).json({ result: result.message })
        }
    }

    public queryGetCreators = async (req: Request, res: Response) => {
        try{
            const result: { creators: any[] } = { creators: (await this.Service.getCreators()) };
            res.json(result)
        }catch(e){
        }
    }

    public queryGetCreator = async (req: Request, res: Response) => {
        // const payload = req['user'];
        const result = await this.Service.getCreator();
        res.json({
            id: result.id,
            username: result.username,
            description: result.description,
            profile_pic: result.profile_pic,
            cover_pic: result.cover_pic,
            colour_theme: result.color_theme,
            board_category: result.board_category,
            colourInvert: result.color_inverted
        })
    }



    public queryLoginFan = async (req: Request, res: Response) => {
        const result = await this.Service.loginFan(req.body.username, req.body.password);
        if (this.isNotEMessage(result)) {
            res.json({
                token: jwtSimple.encode({
                    id: result.id,
                    username: result.username,
                    isCreator: false
                }, process.env.JWT_SECRET!)
            })
        } else {
            res.status(401).json({ result: result.message })
        }
    }

    public queryGetFan = async (req: Request, res: Response) => {
        try {
            const payload = req['user'];
            const result = await this.Service.getFan(payload.id);
            res.json({
                id: result.id,
                username: result.username,
                description: result.description,
                profile_pic: result.profile_pic,
                super_fans: result.super_fans,
                blacklisted: result.blacklisted
            })
        } catch (e) {
        }
    }

    public queryUpdateCategory = async (req: Request, res: Response) => {
        try {
            const result = await this.Service.updateCategory(req.body.category, req.body.username)
            if (result.length === 1) {
                res.json({ result: true })
            } else {
                res.json({ result: false })
            }
        } catch (e) {
            res.json({ result: false })
        }
    }

    public queryGetPosts = async (req: Request, res: Response) => {
        const payload = await this.Service.getPosts()
        const json: { posts: any[] } = { posts: payload }
        res.json(json);
    }


    public queryFetchFans = async (req: Request, res: Response) => {
        const json: { fans: any[] } = { fans: (await this.Service.getFans()) };
        res.json(json)
    }
}
