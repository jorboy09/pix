import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import '../../pages/Inbox/Inbox.css'
import { loadMessagesThunk } from '../../redux/inbox/action';
import { loadInboxNameListThunk } from '../../redux/inboxNameList/action';
import { RootState } from '../../redux/store'

export function MessageBar() {
    let nameLists = useSelector((state: RootState) => state.inboxNameList.inboxNameList)
    let isCreator = useSelector((state: RootState) => state.login.isCreator)
    let fansid = useSelector((state: RootState) => state.curFan.id)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadInboxNameListThunk())
    }, [dispatch])

    function handleLoad(nameListId: number) {
        const name = nameLists.find(nameList => nameList.id === nameListId);
        if (name) {
            dispatch(loadMessagesThunk(name.id))
        }
    }

    useEffect(() => {
        fansid &&
        dispatch(loadMessagesThunk(fansid))
    }, [fansid])

    return (
        <div className='message-bar'>
            {isCreator && <div className="messageNameList">
                <h5 className="message-contact title">聯絡人</h5></div>}
            {
                isCreator && nameLists.map((nameList, i) =>
                    <button key={nameList.id} type="button" onClick={() => handleLoad(nameList.id as number)}>
                        {nameList.username} </button>)
            }
        </div>

    )
}