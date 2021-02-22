import { Dispatch } from 'react';
import { RootState } from "../store"
import urljoin from 'url-join'
import { push } from 'connected-react-router';

function AddPostSuccessText(post: {
    title: string,
    description: string,
    text: string
}) {
    return {
        type: '@@/Posts/ADD_POSTS_SUCCESS_TEXT' as '@@/Posts/ADD_POSTS_SUCCESS_TEXT',
        post
    }
}
function AddPostSuccessImage(post: {
    title: string,
    description: string
}, file: File) {
    return {
        type: '@@/Posts/ADD_POSTS_SUCCESS_IMAGE' as '@@/Posts/ADD_POSTS_SUCCESS_IMAGE',
        post,
        file
    }
}
function AddPostSuccessVideo(post: {
    title: string,
    description: string
}, file: File) {
    return {
        type: '@@/Posts/ADD_POSTS_SUCCESS_VIDEO' as '@@/Posts/ADD_POSTS_SUCCESS_VIDEO',
        post,
        file
    }
}
function AddPostSuccessAudio(post: {
    title: string,
    description: string
}, file: File) {
    return {
        type: '@@/Posts/ADD_POSTS_SUCCESS_AUDIO' as '@@/Posts/ADD_POSTS_SUCCESS_AUDIO',
        post,
        file
    }
}

export function getPosts(posts: any[]) {
    return {
        type: '@@/GET_POSTS' as '@@/GET_POSTS',
        posts: posts
    }
}

export type PostsAction = ReturnType<
    typeof AddPostSuccessText |
    typeof AddPostSuccessImage |
    typeof AddPostSuccessVideo |
    typeof AddPostSuccessAudio |
    typeof getPosts
>

export function addPostText(post: {
    title: string,
    description: string,
    text: string
}, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/addPostsText'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(post)
        })
        const json = await res.json();
        if (json.result) {
            dispatch(AddPostSuccessText(post))
            dispatch(push("/creator-main"))
        }
    }
}
export function addPostImage(post: FormData, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/addPostsImage'), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: post
        })
        const json = await res.json();
        if (json.result) {
            dispatch(AddPostSuccessImage(json.post, json.file))
            dispatch(push("/creator-main"))
        }
    }
}
export function addPostVideo(post: FormData, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/addPostsVideo'), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: post
        })
        const json = await res.json();
        if (json.result) {
            dispatch(AddPostSuccessVideo(json.post, json.file))
            dispatch(push("/creator-main"))
        }
    }
}
export function addPostAudio(post: FormData, token: string | null) {
    return async (dispatch: Dispatch<any>) => {
        const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/addPostsAudio'), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: post
        })
        const json = await res.json();
        if (json.result) {
            dispatch(AddPostSuccessAudio(json.post, json.file))
            dispatch(push("/creator-main"))
        }
    }
}

export function fetchPosts() {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        
            const res = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`,'/getPosts'), {
                method: 'GET'
            })
            const json = await res.json();
            dispatch(getPosts(json.posts))
        
    }
}