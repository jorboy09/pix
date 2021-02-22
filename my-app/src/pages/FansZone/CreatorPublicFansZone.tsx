import './CreatorPublicFansZone.css';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import client from 'socket.io-client'

export function CreatorPublicFansZone() {
    const [createMessage, setCreateMessage] = useState<string>('')
    const [message, setMessage] = useState<{ time: string, fansid: number | null, message: string, username: string | null }[]>([])
    let fansid = useSelector((state: RootState) => state.curFan.id)
    let fansusername = useSelector((state: RootState) => state.curFan.username)
    const isLoggedinCreator = useSelector((state: RootState) => state.login.isCreator)
    const creatorName = useSelector((state: RootState) => state.curUser.username)

    const socket = client.connect(process.env.REACT_APP_BACKEND_URL!)

    socket.on('fanboard-message', (message: any) => {
        loadComment()
    })

    async function loadComment() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/fanszone`)
        let json = await res.json()

        let msgs = []
        for (let i = 0; i < json.length; i++) {
            let date = new Date(json[i].created_at)
            let time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            let msg = {
                'time': time,
                'username': json[i].username,
                'fansid': json[i].fansid,
                'message': json[i].message
            }
            msgs.push(msg)

        }
        setMessage(msgs);
    }

    useEffect(() => {
        loadComment()

    }, [])


    return (
        <div className="center-scroll-area">
            <div className="fanszone">
                <div className="fanszone-comment">
                    <div className='comment'>
                        <h3 className='title'>留言板</h3>
                    </div>
                    {
                        message.length > 0 ?
                            message.map((m, i) => (<div key={i} className='commentBoard'>
                                <div className='commentBoardComment'>{m.message}</div>
                                <div className='smallFlexBox'>
                                    { m.username ? <div> {m.username} </div> : <div> {creatorName} </div>}
                                    <div className='commentBoardTime'>  {m.time} </div>
                                </div>

                            </div>)) :
                            null
                    }
                </div>
                {
                    (fansid || isLoggedinCreator) &&
                    <div className="commentArea">
                        <h3 className="title">留言區</h3>

                        
                        <form onSubmit={async (event) => {
                            event.preventDefault()
                            await fetch(`${process.env.REACT_APP_BACKEND_URL}/fanszone`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    fansid: isLoggedinCreator ? null : fansid,
                                    message: createMessage,
                                    isCreator: isLoggedinCreator ? true : false
                                })
                            })

                            let date = new Date()
                            let id = fansid ? fansid : null
            
                                setMessage(
                                    [{
                                        time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                                        fansid: id,
                                        message: createMessage,
                                        username: fansusername
                                    }].concat(message))

                        }}>
                            <input name="content" placeholder="留言" value={createMessage} onChange={(event) => setCreateMessage(event.currentTarget.value)} />
                            <div className="commentAreabtn">
                                <button
                                    className="btn btn-primary"> 留言</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}