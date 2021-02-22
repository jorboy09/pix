// import * as Knex from 'knex';
import RegisterService from '../services/RegisterService';
import { RSMessage, RSResponse, UhOh } from "../services/RegisterService";

// import LoginController from './LoginController';
import { Request, Response } from 'express'
import SocketIO from 'socket.io'

export interface successResponse {
    result: RSResponse
}
export interface failResponse {
    result: RSResponse,
    reason: RSMessage
}
export interface colossalFailure {
    result: RSResponse
    problem: UhOh
}

export default class RegisterController {
    constructor(private Service: RegisterService, private io: SocketIO.Server) { }
    // constructor(private Service: RegisterService) { }

    private isEMessage = (response: any): response is failResponse => {
        return (response as failResponse).reason !== undefined;
    }

    private isCF = (response: any): response is colossalFailure => {
        return (response as colossalFailure).problem !== undefined;
    }

    public queryFanRegister = async (req: Request, res: Response) => {
        const result: successResponse | failResponse = await this.Service.checkIfFanExists_Query({
            username: req.body.username,
            password: req.body.password,
            description: req.body.description
        })
        if (!this.isEMessage(result)) {
            this.io.emit('new_fans')
            res.status(200).json(result)
        } else {
            res.status(401).json(result)
        }
    }

    public queryCreatorRegister = async (req: Request, res: Response) => {
        let file1, file2;
        if (req['files']['pfp'] !== undefined) {
            file1 = req['files']['pfp'][0]
        } else {
            file1 = null;
        } 
        if (req['files']['cvp'] !== undefined) {
            file2 = req['files']['cvp'][0]
        } else {
            file2 = null;
        }
        const result: successResponse | failResponse = await this.Service
            .checkIfCreatorExists_Query(req.body, file1, file2);

        if (!this.isEMessage(result) && !this.isCF(result)) {
            res.status(200).json({
                result: result,
                body: req.body,
                pfp: file1.key,
                cvp: file2.key
            })
        } else {
            res.status(401).json(result)
        }
    }
}