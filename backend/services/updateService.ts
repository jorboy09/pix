import * as Knex from 'knex'
import bcryptjs from 'bcryptjs'

type inputTypes = 'password' | 'description' | 'pfp' | 'cvp' | 'colour_theme' | 'invert'

function updateSuccess(message: inputTypes) {
    if (message === 'password') {
        return '@@/UpdateService/UPDATE_PASSWORD_SUCCESS' as '@@/UpdateService/UPDATE_PASSWORD_SUCCESS'
    }
    if (message === 'description') {
        return '@@/UpdateService/UPDATE_DESCRIPTION_SUCCESS' as '@@/UpdateService/UPDATE_DESCRIPTION_SUCCESS'
    }
    if (message === 'pfp') {
        return '@@/UpdateService/UPDATE_PFP_SUCCESS' as '@@/UpdateService/UPDATE_PFP_SUCCESS'
    }
    if (message === 'cvp') {
        return '@@/UpdateService/UPDATE_CVP_SUCCESS' as '@@/UpdateService/UPDATE_CVP_SUCCESS'
    }
    if (message === 'colour_theme') {
        return '@@/UpdateService/UPDATE_COLOUR_THEME_SUCCESS' as '@@/UpdateService/UPDATE_COLOUR_THEME_SUCCESS'
    }
    if (message === 'invert') {
        return '@@/UpdateService/INVERT_COLOUR_THEME_SUCCESS' as '@@/UpdateService/INVERT_COLOUR_THEME_SUCCESS'
    }
}

function updateFail(message: inputTypes) {
    if (message === 'password') {
        return '@@/UpdateService/UPDATE_PASSWORD_FAIL' as '@@/UpdateService/UPDATE_PASSWORD_FAIL'
    }
    if (message === 'description') {
        return '@@/UpdateService/UPDATE_DESCRIPTION_FAIL' as '@@/UpdateService/UPDATE_DESCRIPTION_FAIL'
    }
    if (message === 'pfp') {
        return '@@/UpdateService/UPDATE_PFP_FAIL' as '@@/UpdateService/UPDATE_PFP_FAIL'
    }
    if (message === 'cvp') {
        return '@@/UpdateService/UPDATE_CVP_FAIL' as '@@/UpdateService/UPDATE_CVP_FAIL'
    }
    if (message === 'colour_theme') {
        return '@@/UpdateService/UPDATE_COLOUR_THEME_FAIL' as '@@/UpdateService/UPDATE_COLOUR_THEME_FAIL'
    }
    if (message === 'invert') {
        return '@@/UpdateService/INVERT_COLOUR_THEME_FAIL' as '@@/UpdateService/INVERT_COLOUR_THEME_FAIL'
    }
}



export type updateMessage = ReturnType<typeof updateSuccess | typeof updateFail>

export default class UpdateService {
    constructor(private knex: Knex) { }

    public updateProfile_Query = async (username: string, body: any, type: inputTypes) => {
        if (type === 'password') {
            return this.updatePassword(username, body);
        }
        if (type === 'description') {
            return this.updateDescription(username, body);
        }
        if (type === 'pfp') {
            return this.updatePFP(username, body);
        }
        if (type === 'cvp') {
            return this.updateCVP(username, body);
        }
        if (type === 'colour_theme') {
            return this.updateColourTheme(username, body);
        }
        if (type === 'invert') {
            return this.invertColourTheme(username, body);
        }
    }

    private updatePassword = async (username: string, password: string): Promise<updateMessage> => {
        const pw = await bcryptjs.hash(password, 10);
        await this.knex('creator')
            .update({
                password: pw
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('password')
            .where('username', username))[0].password;
        if (check === pw) {
            return updateSuccess('password')
        } else {
            return updateFail('password')
        }
    }
    private updateDescription = async (username: string, description: string): Promise<updateMessage> => {
        await this.knex('creator')
            .update({
                description: description
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('description')
            .where('username', username))[0].description;
        if (check === description) {
            return updateSuccess('description')
        } else {
            return updateFail('description')
        }
    }
    private updatePFP = async (username: string, pfp): Promise<updateMessage> => {
        await this.knex('creator')
            .update({
                profile_pic: pfp.key
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('profile_pic')
            .where('username', username))[0].profile_pic;
        if (check === pfp.key) {
            return updateSuccess('pfp')
        } else {
            return updateFail('pfp')
        }
    }
    private updateCVP = async (username: string, cvp): Promise<updateMessage> => {
        await this.knex('creator')
            .update({
                cover_pic: cvp.key
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('cover_pic')
            .where('username', username))[0].cover_pic;
        if (check === cvp.key) {
            return updateSuccess('cvp')
        } else {
            return updateFail('cvp')
        }
    }
    private updateColourTheme = async (username: string, colour_theme: string): Promise<updateMessage> => {
        const pw = parseInt(colour_theme, 10)
        await this.knex('creator')
            .update({
                color_theme: pw
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('color_theme')
            .where('username', username))[0].color_theme;
        if (check === pw) {
            return updateSuccess('colour_theme')
        } else {
            return updateFail('colour_theme')
        }
    }
    private invertColourTheme = async (username: string, invert: boolean) => {
        await this.knex('creator')
            .update({
                color_inverted: invert
            }).where('username', username)
        const check = (await this.knex('creator')
            .select('color_inverted')
            .where('username', username))[0].color_inverted;
        if (check === invert) {
            return {
                message: updateSuccess('invert'),
                isInvert: invert
            }
        } else {
            return updateFail('invert')
        }
    }
}