import * as Knex from 'knex'
import bcryptjs from 'bcryptjs'
import { failResponse, successResponse, colossalFailure } from '../controllers/RegisterController'


function userAlreadyExists() {
    return '@@/RegisterService/USER_ALREADY_EXISTS' as '@@/RegisterService/USER_ALREADY_EXISTS'
}

function noUser() {
    return '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME' as '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME'
}

function registerSuccess() {
    return '@@/RegisterService/REGISTER_SUCCESS' as '@@/RegisterService/REGISTER_SUCCESS'
}

function registerFail() {
    return '@@/RegisterService/REGISTER_FAIL' as '@@/RegisterService/REGISTER_FAIL'
}

function somethingVeryWrong() {
    return '@@/RegisterService/SOMETHING_VERY_WRONG' as '@@/RegisterService/SOMETHING_VERY_WRONG'
}

export interface RegisterForm {
    username: string,
    password: string,
    description: string
}

export type RSMessage = ReturnType<typeof userAlreadyExists> |
    ReturnType<typeof noUser> 
export type RSResponse = ReturnType<typeof registerSuccess> |
    ReturnType<typeof registerFail> 
export type UhOh = ReturnType<typeof somethingVeryWrong>; 

export default class RegisterService {
    constructor(private knex: Knex) { }

    private checkIfFanExists = async (username: string): Promise<RSMessage> => {
        const fan = await this.knex('fans')
            .select('*')
            .where('username', username);
        if (fan.length > 0) {
            return userAlreadyExists();
        } else {
            return noUser();
        }
    }

    checkIfFanExists_Query = async (registerForm: RegisterForm): Promise<successResponse | failResponse> => {
        const username = registerForm.username;
        const checkResult = await this.checkIfFanExists(username);
        const addResult = await this.addFan(registerForm, checkResult);
        if (addResult === '@@/RegisterService/REGISTER_SUCCESS') {
            return {
                result: addResult
            }
        } else {
            return {
                result: addResult,
                reason: checkResult
            }
        }
    }

    private addFan = async (registerForm: RegisterForm, message: RSMessage): Promise<RSResponse> => {
        if (message === '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME') {
            await this.knex('fans').insert({
                username: registerForm.username,
                password: await bcryptjs.hash(registerForm.password, 10),
                description: registerForm.description,
                super_fans: false,
                blacklisted: false
            });
            return registerSuccess();
        } else {
            return registerFail();
        }
    }

    private checkIfCreatorExists = async (username: string): Promise<RSMessage> => {
        const creator = await this.knex('creator')
            .select('*')
            .where('username', username);

        if (creator.length > 0) {
            return userAlreadyExists();
        } else {
            return noUser();
        }
    }

    checkIfCreatorExists_Query = async (body, pfp, cvp): Promise<successResponse | failResponse | colossalFailure> => {
        const username = body.username;
        if (username !== null) {
            const checkResult = await this.checkIfCreatorExists(username)
            let file1, file2;
            if (pfp !== null) file1 = pfp.key;
            else file1 = pfp;
            if (cvp !== null) file2 = cvp.key;
            else file2 = cvp;
            const addResult = await this.addCreator(body, file1, file2, checkResult);
            if (addResult === '@@/RegisterService/REGISTER_SUCCESS') {
                return {
                    result: addResult
                }
            } else {
                if (addResult === '@@/RegisterService/REGISTER_FAIL') {
                    return {
                        result: addResult,
                        reason: checkResult
                    }
                } else {
                    return {
                        result: '@@/RegisterService/REGISTER_FAIL',
                        problem: '@@/RegisterService/SOMETHING_VERY_WRONG'
                    }
                }
            }
        } else {
            return {
                result: registerFail(),
                problem: somethingVeryWrong()
            }
        }
    }

    private addCreator = async (registerInfo: any, pfp: any, cvp: any, message: RSMessage): Promise<RSResponse| UhOh> => {
        if (message === '@@/RegisterService/NO_USER_EXISTS_BY_USERNAME') {
            if (registerInfo.password !== null) {
                await this.knex('creator').insert({
                    username: registerInfo.username,
                    password: await bcryptjs.hash(registerInfo.password, 10),
                    description: registerInfo.description,
                    profile_pic: pfp,
                    cover_pic: cvp,
                    email: registerInfo.email,
                    color_theme: parseInt(registerInfo.ct, 10),
                    color_inverted: false
                });
                await this.knex('domains').insert({
                    creator: registerInfo.username,
                    api: registerInfo.api,
                    front: registerInfo.domain,
                });
                return registerSuccess();
            } else {
                return somethingVeryWrong();
            }
        } else {
            return registerFail();
        }
    }
}