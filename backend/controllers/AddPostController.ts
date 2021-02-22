import * as Knex from 'knex';
import express, { Request, Response } from 'express';
import AddPostService from '../services/AddPostService';

export default class AddPostController {
    constructor(private Service: AddPostService) { }

    public queryAddPostText = async (req: Request, res: Response) => {
        const result = await this.Service.addPostText(req.body);
        res.status(200).json({ result: result })
    }

    public queryAddPostImage = async (req: Request, res: Response) => {
        const result = await this.Service.addPostImage(req.body, req.file);
        res.status(200).json({ result: result, post: req.body, file: req.file })
    }

    public queryAddPostVideo = async (req: Request, res: Response) => {
        const result = await this.Service.addPostVideo(req.body, req.file);
        res.status(200).json({ result: result, post: req.body, file: req.file })
    }

    public queryAddPostAudio = async (req: Request, res: Response) => {
        const result = await this.Service.addPostAudio(req.body, req.file);
        res.status(200).json({ result: result, post: req.body, file: req.file })
    }
}