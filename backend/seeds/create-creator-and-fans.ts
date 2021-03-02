import * as Knex from "knex";
import bcryptjs from 'bcryptjs'

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('fans_zone').del();
    await knex('inbox').del();
    await knex("creator").del();
    await knex('fans_zone').del()
    await knex("fans").del();
    await knex('products').del();
    await knex('board').del()
    await knex('social_media').del();
    await knex('posts').del();
    await knex('events').del()


    // Inserts seed entries
//     await knex("creator").insert([
//         {
//             email: 'sloth@tecky.com',
//             phone: 88888888,
//             username: 'Dog_boy',
//             password: await bcryptjs.hash('12345678', 10),
//             description: 'Lorem ipsum dolor sit amet',
//             board_category: 'products',
//             color_theme: 4,
//             profile_pic: 'pfp-1612945963667.jpeg',
//             cover_pic: 'cvp-1612945963674.jpeg',
//             color_inverted: false
//         }
//     ]);

//     let fansid = await knex('fans').insert([
//         {
//             username: 'John_Doe',
//             password: await bcryptjs.hash('12345678', 10),
//             description: 'Lorem ipsum dolor sit amet',
//             super_fans: false,
//             blacklisted: false
//         },
//         {
//             username: 'Jane_Doe',
//             password: await bcryptjs.hash('12345678', 10),
//             description: 'Morem ipsum color stand amen',
//             super_fans: false,
//             blacklisted: false
//         }
//     ]).returning('id')

//     await knex('inbox').insert([

//         {
//             fans_id: fansid[0],
//             creator: false,
//             message: 'abcdefg'
//         },
//         {
//             fans_id: fansid[0],
//             creator: true,
//             message: 'i am perfect catgirl'
//         },

//         {
//             fans_id: fansid[1],
//             creator: false,
//             message: 'hijklmnop'
//         }
//     ])


//     await knex('fans_zone').insert([
//         {
//             fans_id: fansid[0],
//             isCreator: false,
//             message: 'hi catcat, i am John'
//         },
//         {
//             fans_id: fansid[1],
//             isCreator: false,
//             message: 'hi catgirl, I am Jane'
//         },

//     ])

//     await knex('products').insert([
//         {
//             name: 'sloth',
//             image_name: 'sloth_figure',
//             description: 'sloth',
//             price: 50
//         },
//         {
//             name: 'pusheen',
//             image_name: 'pfp-slothprofile.jpeg',
//             description: 'pusheen',
//             price: 50
//         }
//     ])

    await knex('board').insert({
        title: 'Recommendation',
        media: '',
        description: ''
    })

    await knex('social_media').insert([
        {
            media: 'instagram',
            name: 'sloth',
        },
        {
            media: 'facebook',
            name: 'sloth',
        },
        
        {
            media: 'youtube',
            name: 'sloth',
        },
        {
            media: 'spotify',
            name: 'sloth',
        },
        {
            media: 'soundcloud',
            name: 'sloth',
        },
        {
            media: 'snapchat',
            name: 'sloth',
        },
        {
            media: 'other1',
            custom_name: 'Custom Media 1',
            name: 'sloth',
        },
        {
            media: 'other2',
            custom_name: 'Custom Media 2',
            name: ''
        },
        {
            media: 'other3',
            custom_name: 'Custom Media 3',
            name: '',
        }
    ])

};
