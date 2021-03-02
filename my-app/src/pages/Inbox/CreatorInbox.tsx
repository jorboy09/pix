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


export function CreatorInbox() {
    let inboxAll = useSelector((state: RootState) => state.inbox.inboxAll)
    let nameLists = useSelector((state: RootState) => state.inboxNameList.inboxNameList)
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

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const inboxList: InboxInterface = {
            username: null,
            super_fans: false,
            creator: true,
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
            <div className="chatroomtitle"><h2 className="title">聊天室</h2></div>
            <div className="creator-message">
                <MessageBar />

                <div className="fansMessage creatorMessage">

                    <div className="messageArea">
                        {nameLists.length!==0 &&  inboxAll.map((inbox, i) =>
                            <div className='messagebox' key={i}>
                                <div className={inbox.creator ? "creatorView" : "fansView"} >
                                    <p> {inbox.message} </p>
                                    <p className='time'> {timeFunction(inbox.created_at)} </p>
                                </div>
                            </div>

                        )}
                        {
                            inboxAll[0] &&
                            <div className="typingBox">
                                <form onSubmit={handleSubmit} >
                                    <input {...text('message')} placeholder='請輸入信息內容' />
                                    <button>輸入</button>
                                </form>
                            </div>
                        }

                    </div>





                </div>
            </div>
        </div>
    )
}