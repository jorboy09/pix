import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomizeBoard } from '../../redux/Board/action'
import { RootState } from '../../redux/store'
import style from './EditCustomBoard.module.css'

export function EditCustomBoard(props:{
    ondone: ()=> void
}){
    const customInfo = useSelector((state: RootState)=> state.customBoard)
    const [title, setTitle] = useState<string>(customInfo.title)
    const [file, setFile] = useState<File | null>(null)
    const [description, setDescription] = useState<string | null>(customInfo.description)
    const dispatch = useDispatch();
    
    return (
        <form className={style.form} onSubmit={(event)=>{
            event.preventDefault()
            let custom = new FormData()
            custom.append('title', title)
            if (file){
                custom.append('media', file)
            }
            if (description){
                custom.append('description', description)
            }
            dispatch(CustomizeBoard(custom))
            props.ondone()
        }}>
            <label>Title: <input type='text' name='title' value={title} onChange={(event)=>setTitle(event.currentTarget.value)}></input></label>
            <label>Photo: <input type='file' name='photo' onChange={(event)=>{
                if (event.currentTarget.files !== null){
                    setFile(event.currentTarget.files[0])
                }
                }}></input></label>
            <label className={style.description}>Description: <textarea name='description' value={description? description: ''} onChange={(event)=>{
                setDescription(event.currentTarget.value)
                if(event.currentTarget.value===''){
                    event.currentTarget.style.cssText= 'height : 100px;'
                }else{
                    event.currentTarget.style.cssText= 'height :' + event.currentTarget.scrollHeight + 'px;'}
                }
                }></textarea></label>
            <button type='submit'>Done!</button>
        </form>
    )
}