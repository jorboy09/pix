import { Request, Response } from 'express'
import { ContactService } from '../services/contactService'

export interface ContactObject {
    email: string | undefined,
    phone: number | undefined
}

export interface social {
    id: number, media: string, name: string
}

export interface SocialObject {
    instagram: social | undefined,
    facebook: social | undefined,
    twitter: social | undefined,
    pinterest: social | undefined,
    linkedin: social | undefined,
    youtube: social | undefined,
    mewe: social | undefined,
    spotify: social | undefined,
    soundcloud: social | undefined,
    snapchat: social | undefined,
    // other1media?: social | undefined,
    // other2media?: social | undefined,
    // other3media?: social | undefined,
    other1: social | undefined,
    other2: social | undefined,
    other3: social | undefined
}

export interface ContactList {
    contact: ContactObject,
    social_media: SocialObject
}

export interface ContactAll {
    contactList: ContactList
}

export class ContactController {
    constructor(private contactService: ContactService) { }

    getContact = async (req: Request, res: Response) => {
        try {
            let contactAndSocial = await this.contactService.getContact();
            let contact = contactAndSocial.contact[0]
            let soc = contactAndSocial.social_media

            const convertArrayToObject = (array, key) => {
                const initialValue = {};
                let i = 0
                return array.reduce((obj, item) => {
                    i = i + 1
                    if (i <= array.length - 3) {
                        return {
                            ...obj,
                            [item[key]]: item,
                        };
                    } else {
                        let objkey = `other${(parseInt(array.length) - i +1).toString()}`
                        return {
                            ...obj,
                            [objkey]: item,

                        }
                    }

                }, initialValue);
            };

            let social_media = convertArrayToObject(soc, 'media')

            res.json({ contactList: { contact, social_media } })
        } catch (error) {
            res.json(error.message)
        }
    }

    editContact = async (req: Request, res: Response) => {

        const all = req.body as ContactList

        try {
            await this.contactService.deleteSocialMedia()

            await this.contactService.editContact(all.contact.email, all.contact.phone);
            for (let soc in all.social_media) {

                await this.contactService.editSocialMedia(all.social_media[soc].media, all.social_media[soc].name);
            }

            res.json({ result: true })
        } catch (error) {
            res.json({ result: false, message: error.message })
        }
    }

}
