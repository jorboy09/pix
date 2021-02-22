import * as Knex from 'knex'
import bcryptjs from 'bcryptjs'
import jwtSimple from 'jwt-simple';

function noUser() {
    return {
        message: '@@/LoginService/NO_USER' as '@@/LoginService/NO_USER'
    }
}

function incorrectPassword() {
    return {
        message: '@@/LoginService/INCORRECT_PASSWORD' as '@@/LoginService/INCORRECT_PASSWORD'
    }
}

function somethingVeryWrong() {
    return {
        message: '@@/LoginService/UH_OH' as '@@/LoginService/UH_OH'
    }
}

function editProfileSuccess() {
    return '@@/LoginService/EDIT_PROFILE_SUCCESS' as '@@/LoginService/EDIT_PROFILE_SUCCESS'
}

function editProfileFail() {
    return '@@/LoginService/EDIT_PROFILE_FAIL' as '@@/LoginService/EDIT_PROFILE_FAIL'
}

export type LSMessage = ReturnType<typeof noUser> | ReturnType<typeof incorrectPassword> | ReturnType<typeof somethingVeryWrong>
export type LSEditMessage = ReturnType<typeof editProfileFail | typeof editProfileSuccess>
export type IdUsername = { id: number, username: string }

export default class LoginService {
    constructor(private knex: Knex) { }

    getCreator = async () => {
        const curUser = await this.knex('creator')
            .select('*')
        return curUser[0];
    }

    loginCreator = async (username: string, password: string): Promise<IdUsername | LSMessage> => {
        const creator = await this.knex('creator').select('*').where('username', username);
        if (creator.length <= 0) {
            return noUser();
        }
        if (!(await bcryptjs.compare(password, creator[0].password))) {
            return incorrectPassword();
        }
        return {
            id: creator[0].id,
            username: creator[0].username
        }
    }

    loginFan = async (username: string, password: string): Promise<IdUsername | LSMessage> => {
        const fan = await this.knex('fans').select('*').where('username', username)
        if (fan.length <= 0) {
            return noUser();
        }
        if (!(await bcryptjs.compare(password, fan[0].password))) {
            return incorrectPassword();
        }
        return {
            id: fan[0].id,
            username: username
        }
    }

    getFan = async (id: number) => {
        // const t = localStorage.getItem('token');
        const curFan = await this.knex('fans')
            .select(
                '*'
            )
            .where('id', id);
        return curFan[0];
    }

    updateCategory = async (category: number, username: string) => {
        return (await this.knex('creator').update({ 'board_category': category }).where('username', username).returning('*'))
    }

    getPosts = async (): Promise<any[]> => {
        const array: any[] = (await this.knex('posts').select('*'))
        return array;
    }

    getFans = async (): Promise<any[]> => {
        const array: any[] = await this.knex('fans').select('*')
        return array;
    }

    getCreators = async (): Promise<any[]> => {
        const array: any[] =await this.knex('creator').select('*')
        return array;
    }
}