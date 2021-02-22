import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import '../../App/rootColor.css'
import { addMessagesThunk, loadMessagesThunk } from '../../redux/inbox/action';
import { RootState } from '../../redux/store'

import './Inbox.css'
import { useFormState } from 'react-use-form-state';
import { InboxMessage, InboxInterface } from '../../redux/inbox/reducer';
import React from 'react';
import { MessageBar } from '../../components/inbox/messageBar';
import { fetchFan, fetchFans } from '../../redux/CurUser/CurUSerAction';


export function PublicInbox() {
    let inboxAll = useSelector((state: RootState) => state.inbox.inboxAll)
    const fansid = useSelector((state: RootState) => state.curFan.id)
    const fansUsername = useSelector((state: RootState) => state.curFan.username)

    const [formState, { text }] = useFormState(null, {
        onChange(e, stateValues, nextStateValues) {
            const { name, value } = e.target;

        }
    });


    function timeFunction(time: string) {

        let date = new Date(time)
        let dateAndTime = ` ${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}  ${date.getHours()}:${date.getMinutes()}`

        return dateAndTime
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(fetchFans())
        if (token !== null) {
            dispatch(fetchFan(token))
        }

        if (fansid != null){
            dispatch(loadMessagesThunk(fansid))
        }
        
        // dispatch(loadMessagesThunk(40))

    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const inboxList: InboxInterface = {
            username: inboxAll[0].username,
            super_fans: inboxAll[0].super_fans,
            creator: false,
            message: formState.values.message,
            id: inboxAll[0].id,
            created_at: '',
            updated_at: ''
        }

        const InboxMessage: InboxMessage = {
            inboxAll: [inboxList]
        }

        dispatch(addMessagesThunk(InboxMessage))
        formState.setField('message', '')
    }

    return (

        <div className='message-center-scroll-area'>
            <div className="chatroomtitle"><h2 className="title">聊天室</h2>
            
            {/* <button onClick={() => {
                console.log(`fansid: ${fansid} username: ${fansUsername}`)
            }}>test see fansid in console</button> */}
            </div>

            <div className="creatorMessage">

                <div className="messageArea">


                    {inboxAll.map((inbox, i) =>
                        <div className='messagebox'>
                            <div className={!inbox.creator ? "creatorView" : "fansView"} >
                                <p> {inbox.message} </p>
                                {/* {!inbox.creator && <p className='username'> {inbox.username} </p>} */}
                                {/* <p className='id'> {inbox.id} </p> */}

                                <p className='time'> {timeFunction(inbox.created_at)} </p>
                            </div>
                        </div>


                    )}
                </div>

                <div className="typingBox">
                    <form onSubmit={handleSubmit} >
                        <input {...text('message')} placeholder='請輸入信息內容' />
                        <button>輸入</button>
                    </form>
                </div>
            </div>

        </div>

    )
}