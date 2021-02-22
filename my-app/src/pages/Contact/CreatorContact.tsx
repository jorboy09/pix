import React from 'react'
import { EditContact } from '../../components/Contact/EditContact'
import { ShowContact } from '../../components/Contact/ShowContact'

import style from '../../components/Contact/Contact.module.css'
import '../../App/rootColor.css'

export function CreatorContact() {

  return ( 
    <div className={style.center_scroll_area}>
      <div className={style.title}>聯絡我們</div>
      <div className={style.title_bar}>
        <EditContact />
        <ShowContact />

        <div className={style.circle3}
        // style={{
        //       background: `linear-gradient(to right bottom, ${
        //         themes[CUColour][3].colour
        //       }, ${
        //         themes[CUColour][2].colour
        //       })`,
        //       opacity: 0.8
        //     }}
            
            ></div>
            <div className={style.circle4}
            // style={{
            //   background: `linear-gradient(to right bottom, ${
            //     themes[CUColour][3].colour
            //   }, ${
            //     themes[CUColour][2].colour
            //   })`,
            //   opacity: 0.8
            // }}
            
            ></div>

      </div>
    </div>
  )
}