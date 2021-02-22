import style from '../../components/Contact/Contact.module.css'
import '../../App/rootColor.css'

import React from "react";
import { ShowContact } from "../../components/Contact/ShowContact";

export function PublicContact() {
  
  return (
    <div className={style.center_scroll_area}>
      <div className={style.title}>Contact</div>
      <div className={style.public_show_contact}>
        <ShowContact />
        </div>
    </div>

  )
}