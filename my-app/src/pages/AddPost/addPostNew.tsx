import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import add from '../../button_img/add.svg'
import addCopy from '../../button_img/add copy.svg'
import { Posts } from '../../redux/Posts/PostsReducer'
import { addPostAudio, addPostImage, addPostText, addPostVideo } from '../../redux/Posts/PostsAction'
import './addPost.scss';
import { RootState } from '../../redux/store'

interface propsFA {
    onClick: () => void
    isCreator: boolean
}

interface lesPostes {
    posts: Posts
    onClick: () => void
    isCreator: boolean
}

interface addPostFrontProps {
    onCLickBack: () => void
    onClickText: () => void
    onClickImage: () => void
    onClickVideo: () => void
    onClickAudio: () => void
}

interface addPostProps {
    state: 'text' | 'image' | 'video' | 'audio' | ''
    onClick: () => void
}

export function FirstAdd(props: propsFA) {
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)

    return (
        <div className="big-add-container" style={{
            backgroundColor: themes[colour][0].colour
        }}>
            {props.isCreator && <div className="big-add">
                <button onClick={props.onClick} style={{
                    backgroundColor: themes[colour][0].colour
                }}>
                    <img src={add} alt="" />
                </button>
            </div>}
            <div style={{
                color: themes[colour][3].colour
            }}>
                {props.isCreator ?
                    <h5>You haven't made a post yet. Start posting here!</h5> :
                    <h5>This Creator hasn't posted yet.</h5>
                }
            </div>
        </div>
    )
}

export function RenderPosts(props: lesPostes) {
    const posts = props.posts.posts
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)

    const convertTime = (timestamp: string | null) => {
        if (timestamp !== null) {
            let date = new Date(timestamp)
            return (date.toString().substr(4, 11) + ` AT ` + date.toString().substr(16, 5))
        }
    }

    //     ${process.env.REACT_APP_DO_SPACE_URL}/${post.image_name}
    // <source src={`${process.env.REACT_APP_DO_SPACE_URL}/${post.video_name}`} />
    // <source src={`${process.env.REACT_APP_DO_SPACE_URL}/${post.audio_name}`} />

    return (
        <div className="posts-container">
            {props.isCreator && <div className="posts-foot">
                <button className="add-post-banner" onClick={props.onClick}>
                    <img src={addCopy} alt="" />
                </button>
                <div>
                    <h5>整個新post</h5>
                </div>
            </div>}
            <div className="posts">
                {posts.map(post => {
                    return (
                        <div className="post-container" style={{
                            backgroundColor: themes[colour][2].colour
                        }}>
                            <div className="post-preview-container">
                                {post.text !== null ? <div className="post-preview">
                                    {post.text}
                                </div> :
                                    post.image_name !== null ?
                                        <div className="post-preview" style={{
                                            // backgroundImage: `url(/creator_img/${post.image_name})`
                                            backgroundImage: `url(${process.env.REACT_APP_DO_SPACE_URL}/${post.image_name})`
                                        }}>
                                        </div> :
                                        post.video_name !== null ?
                                            <video className="post-preview" controls>
                                                {/* <source src={`/creator_video/${post.video_name}`} /> */}
                                                <source src={`${process.env.REACT_APP_DO_SPACE_URL}/${post.video_name}`} />
                                            </video> :
                                            post.audio_name !== null ?
                                                <audio className="post-preview" style={{
                                                    height: `130px`,

                                                }} controls>
                                                    {/* <source src={`/creator_audio/${post.audio_name}`} /> */}
                                                    <source src={`${process.env.REACT_APP_DO_SPACE_URL}/${post.audio_name}`} />
                                                </audio> :
                                                null
                                }
                            </div>
                            <div className="lower-half" >
                                <div className="top-row-post">
                                    <div className="post-time" style={{
                                        color: themes[colour][0].colour
                                    }}>
                                        上載時間: {convertTime(post.created_at)}
                                    </div>
                                </div>
                                <div className="bottom-row-post">
                                    <div className="post-title" style={{
                                        color: themes[colour][0].colour
                                    }}>
                                        <h4>{post.title}</h4>
                                    </div>
                                    <div className="isLocked" style={{
                                        color: themes[colour][0].colour
                                    }}>
                                        {post.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* {props.isCreator && <div className="posts-foot">
                <button className="add-post-banner" onClick={props.onClick}>
                    <img src={addCopy} alt="" />
                </button>
                <div>
                    <h5>整個新post</h5>
                </div>
            </div>} */}
        </div>
    )
}

export function AddPostFront(props: addPostFrontProps) {
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)

    return (
        <div className="add-post-front-container">
            <div className="back-button-banner" style={{
                backgroundColor: themes[colour][1].colour
            }}>
                <button className="back-button" onClick={props.onCLickBack}>back</button>
                <div className="add-post-front-header" style={{
                    color: themes[colour][3].colour
                }}>
                    <h4>選擇post類型</h4>
                </div>
            </div>
            <div className="type-choice-container" style={{
                backgroundColor: themes[colour][1].colour
            }}>
                <div className="t-c-buttons">
                    <div className="type-choice t-c-top">
                        <div className="text"
                            onClick={props.onClickText}
                            style={{
                                backgroundColor: themes[colour][0].colour,
                                border: `4px solid ${themes[colour][1].colour}`,
                                color: themes[colour][3].colour,
                                borderTop: `0`
                            }}
                        >
                            文字
                        </div>
                        <div className="image"
                            onClick={props.onClickImage}
                            style={{
                                backgroundColor: themes[colour][0].colour,
                                border: `4px solid ${themes[colour][1].colour}`,
                                color: themes[colour][3].colour,
                                borderTop: `0`
                            }}
                        >
                            圖片
                        </div>
                    </div>
                    <div className="type-choice t-c-bottom">
                        <div className="video"
                            onClick={props.onClickVideo}
                            style={{
                                backgroundColor: themes[colour][0].colour,
                                border: `4px solid ${themes[colour][1].colour}`,
                                color: themes[colour][3].colour
                            }}
                        >
                            影片
                        </div>
                        <div className="audio"
                            onClick={props.onClickAudio}
                            style={{
                                backgroundColor: themes[colour][0].colour,
                                border: `4px solid ${themes[colour][1].colour}`,
                                color: themes[colour][3].colour
                            }}
                        >
                            音樂
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AddPost(props: addPostProps) {
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)
    return (
        <div className="add-post-front-container">
            <div className="back-button-banner"
                style={{
                    backgroundColor: themes[colour][1].colour
                }}
            >
                <button className="back-button" onClick={props.onClick}>返回</button>
            </div>
            <div className="add-post-forms">
                {props.state === 'text' && <AddPostText />}
                {props.state === 'image' && <AddPostImage />}
                {props.state === 'video' && <AddPostVideo />}
                {props.state === 'audio' && <AddPostAudio />}
            </div>
        </div>
    )
}
export function AddPostText() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [text, setText] = useState<string>('')
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)
    const dispatch = useDispatch();

    return (
        <div className="text-form">
            <h2 className="text-form-heading" style={{
                color: themes[colour][0].colour
            }}>創造文字post</h2>
            <form action="" onSubmit={() => {
                dispatch(addPostText({
                    title: title,
                    description: description,
                    text: text
                }, localStorage.getItem('token')))
            }}>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            標題:
                        </h5>
                    </div>
                    <input type="text" name="title" id="title"
                        value={title}
                        onChange={event => setTitle(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            簡介(不超過250字):
                        </h5>
                    </div>
                    <textarea
                        maxLength={255}
                        rows={6}
                        name="description"
                        // id="description"
                        value={description}
                        onChange={event => setDescription(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            內容:
                        </h5>
                    </div>
                    <textarea
                        name="text"
                        id="text"
                        rows={7}
                        value={text}
                        onChange={event => setText(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <input type="submit" name="" id="text-submit" />
                </div>
            </form>
        </div>
    )
}
export function AddPostImage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<File | null>(null);
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)
    const dispatch = useDispatch();

    return (
        <div className="image-form">
            <h2 className="text-form-heading" style={{
                color: themes[colour][0].colour
            }}>創造圖片post</h2>
            <form action="" onSubmit={() => {
                let form = new FormData();
                form.append('title', title);
                form.append('description', description)
                if (image !== null) {
                    form.append('image', image);
                }
                dispatch(addPostImage(form, localStorage.getItem('token')))
            }}>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            標題:
                        </h5>
                    </div>
                    <input type="text" placeholder="title" name="title" id="title"
                        value={title}
                        onChange={event => setTitle(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            簡介(不超過250字):
                        </h5>
                    </div>
                    <textarea
                        placeholder="description (max 255 characters)"
                        maxLength={255}
                        rows={6}
                        name="description"
                        // id="description"
                        value={description}
                        onChange={event => setDescription(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            上載圖片:
                        </h5>
                    </div>
                    <div className="image-submit-container">
                        <input type="file" accept="image/*"
                            onChange={event => {
                                if (event.currentTarget.files !== null) {
                                    setImage(event.currentTarget.files[0])
                                }
                            }} />
                        <input type="submit" name="" id="" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export function AddPostVideo() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('')
    const [video, setVideo] = useState<File | null>(null);
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)
    const dispatch = useDispatch();

    return (
        <div className="image-form">
            <h2 className="text-form-heading" style={{
                color: themes[colour][0].colour
            }}>創造影片post</h2>
            <form action="" onSubmit={() => {
                let form = new FormData();
                form.append('title', title);
                form.append('description', description)
                if (video !== null) {
                    form.append('video', video);
                }
                dispatch(addPostVideo(form, localStorage.getItem('token')))
            }}>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            標題:
                        </h5>
                    </div>
                    <input type="text" placeholder="title" name="title" id="title"
                        value={title}
                        onChange={event => setTitle(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            簡介(不超過250字):
                        </h5>
                    </div>
                    <textarea
                        placeholder="description (max 255 characters)"
                        maxLength={255}
                        rows={6}
                        name="description"
                        // id="description"
                        value={description}
                        onChange={event => setDescription(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            上載影片(不超過10MB):
                        </h5>
                    </div>
                    <div className="image-submit-container">
                        <input type="file"
                            // accept="video/*"
                            formEncType="multipart/form-data"
                            onChange={event => {
                                if (event.currentTarget.files !== null) {
                                    setVideo(event.currentTarget.files[0])
                                }
                            }} />
                        <input type="submit" name="" id="" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export function AddPostAudio() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [audio, setAudio] = useState<File | null>(null);
    const themes = useSelector((state: RootState) => state.curUser.TA)
    const colour = useSelector((state: RootState) => state.curUser.colour_theme)
    const dispatch = useDispatch();

    return (
        <div className="image-form">
            <h2 className="text-form-heading" style={{
                color: themes[colour][0].colour
            }}>創造音樂Post</h2>
            <form action="" onSubmit={() => {
                let form = new FormData();
                form.append('title', title);
                form.append('description', description)
                if (audio !== null) {
                    form.append('audio', audio);
                }
                dispatch(addPostAudio(form, localStorage.getItem('token')))
            }}>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            標題:
                        </h5>
                    </div>
                    <input type="text" placeholder="title" name="title" id="title"
                        value={title}
                        onChange={event => setTitle(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            簡介(不超過250字):
                        </h5>
                    </div>
                    <textarea
                        placeholder="description (max 255 characters)"
                        maxLength={255}
                        rows={6}
                        name="description"
                        // id="description"
                        value={description}
                        onChange={event => setDescription(event.currentTarget.value)}
                    />
                </div>
                <div className="text-form-input">
                    <div className="text-form-header">
                        <h5 style={{
                            color: themes[colour][0].colour
                        }}>
                            上載音樂(不超過10MB):
                        </h5>
                    </div>
                    <div className="image-submit-container">
                        <input type="file" accept="audio/*"
                            formEncType="multipart/form-data"
                            onChange={event => {
                                if (event.currentTarget.files !== null) {
                                    setAudio(event.currentTarget.files[0])
                                }
                                console.log(audio)
                            }} />
                        <input type="submit" name="" id="" />
                    </div>
                </div>
            </form>
        </div>
    )
}

