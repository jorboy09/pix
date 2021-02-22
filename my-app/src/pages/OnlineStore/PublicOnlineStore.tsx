import './OnlineStore.css'
import {Product} from '../../components/Product/Product'

export function PublicOnlineStore() {
  return (
    <div className="center-scroll-area">
      <h1 className="title">商店</h1>
      <div><Product /></div>
    </div>
  )
}