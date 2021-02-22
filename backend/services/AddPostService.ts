import * as Knex from 'knex';

function postSuccessText() {
    return '@@/AddPostService/POST_SUCCESS_TEXT' as '@@/AddPostService/POST_SUCCESS_TEXT'
}
function postSuccessImage() {
    return '@@/AddPostService/POST_SUCCESS_IMAGE' as '@@/AddPostService/POST_SUCCESS_IMAGE'
}
function postSuccessVideo() {
    return '@@/AddPostService/POST_SUCCESS_VIDEO' as '@@/AddPostService/POST_SUCCESS_VIDEO'
}
function postSuccessAudio() {
    return '@@/AddPostService/POST_SUCCESS_AUDIO' as '@@/AddPostService/POST_SUCCESS_AUDIO'
}

export type APMessage = ReturnType<
    typeof postSuccessText |
    typeof postSuccessImage |
    typeof postSuccessVideo |
    typeof postSuccessAudio
>;

export default class AddPostService {
    constructor(private knex: Knex) { }

    addPostText = async (body): Promise<APMessage> => {
        await this.knex('posts').insert({
            title: body.title,
            description: body.description,
            text: body.text,
            image_name: null,
            video_name: null,
            audio_name: null
        })
        return postSuccessText();
    }

    addPostImage = async (body, file): Promise<APMessage> => {
        await this.knex('posts').insert({
            title: body.title,
            description: body.description,
            text: null,
            image_name: file.key,
            video_name: null,
            audio_name: null
        })
        return postSuccessImage();
    }

    addPostVideo = async (body, file): Promise<APMessage> => {
        await this.knex('posts').insert({
            title: body.title,
            description: body.description,
            text: null,
            image_name: null,
            video_name: file.key,
            audio_name: null
        })
        return postSuccessVideo();
    }

    addPostAudio = async (body, file): Promise<APMessage> => {
        await this.knex('posts').insert({
            title: body.title,
            description: body.description,
            text: null,
            image_name: null,
            video_name: null,
            audio_name: file.key
        })
        return postSuccessAudio();
    }
}