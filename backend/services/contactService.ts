import knex from 'knex';

export class ContactService {
    constructor(private knex: knex) { }

    public async getContact() {
        const contact = await this.knex.select('email', 'phone').from('creator');
        const social_media = await this.knex.select("*").from('social_media');

        return { contact, social_media }
    }

    public editContact = async (email: string | undefined, phone: number | undefined) => {

        await this.knex('creator').update(
            {
                email: email,
                phone: phone
            }
        )
        return { result: true }
    }


    public deleteSocialMedia = async () => {
        await this.knex('social_media').delete()
    }

    public editSocialMedia = async (id: number, media: string | undefined, name: string | undefined) => {

        await this.knex('social_media').update({ custom_name: media, name: name }).where('id', id);
    }
}