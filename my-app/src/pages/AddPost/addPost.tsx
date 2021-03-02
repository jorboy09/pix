import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchPosts } from '../../redux/Posts/PostsAction'
import { RootState } from '../../redux/store'
import { FirstAdd, RenderPosts, AddPostFront, AddPost } from './addPostNew'
import { Posts } from '../../redux/Posts/PostsReducer'
import './addPost.scss';

interface formNature {
    isCreator: boolean
}

export default function AddForm(props: formNature) {
    const p: Posts = useSelector((state: RootState) => state.posts)
    const [formType, setFormType] = useState<'' | 'text' | 'image' | 'video' | 'audio'>('');
    const dispatch = useDispatch();
    const [cond, setCond] = useState<
        '' |
        'chooseForm' |
        'form'>('');
    const [condInit, setCondInit] = useState<
        'init' |
        'initNoPost' |
        'initWithPost'
    >('initNoPost');

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    useEffect(() => {
        if (p.posts.length === 0) {
            setCondInit('initNoPost');
        }
        if (p.posts.length > 0) {
            setCondInit('initWithPost')
        }
    }, [dispatch, p])

    return (
        <div>
            {condInit === 'initNoPost' && <FirstAdd
            isCreator={props.isCreator}
                onClick={props.isCreator ? () => {
                    setCond('chooseForm');
                    setCondInit('init');
                }: () => {

                }}
            />}
            {condInit === 'initWithPost' && <RenderPosts
            isCreator={props.isCreator}
                posts={p}
                onClick={props.isCreator ? () => {
                    setCond('chooseForm');
                    setCondInit('init');
                } : () => {

                }}
            />}
            {cond === 'chooseForm' && <AddPostFront
                onCLickBack={() => {
                    setCond('');
                    if (p.posts.length === 0) {
                        setCondInit('initNoPost');
                    } else if (p.posts.length > 0) {
                        setCondInit('initWithPost')
                    }
                }}
                onClickAudio={() => {
                    setFormType('audio')
                    setCond('form')
                }}
                onClickVideo={() => {
                    setFormType('video')
                    setCond('form')
                }}
                onClickImage={() => {
                    setFormType('image')
                    setCond('form')
                }}
                onClickText={() => {
                    setFormType('text')
                    setCond('form')
                }}
            />}
            {cond === 'form' && <AddPost state={formType} onClick={() => {
                setCond('chooseForm');
                setFormType('')
            }} />}
        </div>
    )
}