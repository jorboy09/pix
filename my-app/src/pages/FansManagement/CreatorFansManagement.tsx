import { Fan } from '../../components/FanManagement/FanManagement_Fan'
import style from './CreatorFansManagement.module.css'
import search from '../../button_img/search.svg'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { fetchFanList } from '../../redux/fanlist/action'
import client from 'socket.io-client'

export function CreatorFansManagement() {
  const [searchFan, setSearchFan] = useState<string>('')
  const [datesearch, setDateSearch] = useState<string>('')
  const fanList = useSelector((state: RootState) => state.fanList.list);
  const dispatch = useDispatch();
  const socket = client.connect(process.env.REACT_APP_BACKEND_URL!)

  socket.on('new_fans', () => {
      dispatch(fetchFanList('', 'NaN-NaN-NaN'))
  })

  useEffect(() => {
    let date = new Date(datesearch)
    let searchdate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    dispatch(fetchFanList(searchFan, searchdate))
  }, [dispatch, searchFan, datesearch])

  return (
    <div className={style.container}>
      <div className={style.title}>粉絲管理</div>
      <div className={style.filter}>
        <div className={style.name_search}>
          <img src={search} alt='search' />
          <input type='text' value={searchFan} onChange={(event) => { setSearchFan(event.currentTarget.value) }}></input>
        </div>
        <div className={style.date_filter}>
          <label>篩選:
          <input type='date' value={datesearch} required onChange={(event) => { setDateSearch(event.currentTarget.value) }}>
            </input>
            <span className="validity"></span>
          </label>
        </div>
      </div>
      <div className={style.fans_list}>
        {fanList.length === 0 ? <div>(空白)</div> : fanList.map((fan, i) =>
          <Fan id={fan.id} name={fan.name} activity={fan.activity}
            super_fans={fan.super_fans} searchtext={searchFan} datesearch={datesearch} key={i} />)}
      </div>
    </div>
  )
}