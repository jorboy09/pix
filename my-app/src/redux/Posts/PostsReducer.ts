import { PostsAction } from './PostsAction'
export interface Post {
    id: number
    title: string | null
    description: string | null
    text: string | null
    image_name: string | null
    video_name: string | null
    audio_name: string | null
    created_at: string | null
    scheduled_at: string | null
}

export interface Posts {
    posts: Post[]
}

const initPosts: Posts = {
    posts: []
}

export const postsReducer = (state: Posts = initPosts, action: PostsAction) => {
    if (action.type === '@@/GET_POSTS' && action.posts.length > 0) {
        const posts = action.posts
        return {
            ...state,
            posts: posts
        }
    }
    if (action.type === '@@/Posts/ADD_POSTS_SUCCESS_TEXT') {
        return {
            ...state
        }
    }
    if (action.type === '@@/Posts/ADD_POSTS_SUCCESS_IMAGE') {
        return {
            ...state
        }
    }
    if (action.type === '@@/Posts/ADD_POSTS_SUCCESS_VIDEO') {
        return {
            ...state
        }
    }
    if (action.type === '@@/Posts/ADD_POSTS_SUCCESS_AUDIO') {
        return {
            ...state
        }
    }
    return {
        ...state
    }
}