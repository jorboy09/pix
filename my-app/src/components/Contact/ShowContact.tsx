import '../../App/rootColor.css'
import style from '../../components/Contact/Contact.module.css'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { loadContactThunk } from "../../redux/contact/action";
let { SocialIcon } = require('react-social-icons');
// import SocialIcon from 'react-social-icons'


export function ShowContact() {
    let contact = useSelector((state: RootState) => state.contact.contactList.contact)
    let social_media = useSelector((state: RootState) => state.contact.contactList.social_media)



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadContactThunk())
    }, [dispatch])


    return (
        <div className={style.showcontact_center_scroll_area}>
            <div className={style.contact_area}>
                <div className={style.public_phone_email}>
                    <div>電郵地址：{contact.email}</div>
                    {contact.phone && <div>電話號碼：{contact.phone}</div>}
                </div>

                <div className={style.public_social_media}>
                    {
                        <div className={style.each_social_media}>
                            {social_media.instagram?.name && <SocialIcon url={`http://instagram.com/${social_media.instagram?.name}`} bgColor="#747474" />}
                            {social_media.facebook?.name && <SocialIcon url={`http://facebook.com/${social_media.facebook.name}`} bgColor="#747474" />}
                            {social_media.youtube?.name && <SocialIcon url={`http://youtube.com/${social_media.youtube.name}`} bgColor="#747474" />}
                            {social_media.twitter?.name && <SocialIcon url={`http://twitter.com/${social_media.twitter.name}`} bgColor="#747474" />}
                            {social_media.pinterest?.name && <SocialIcon url={`http://pinterest.com/${social_media.pinterest.name}`} bgColor="#747474" />}
                            {social_media.linkedin?.name && <SocialIcon url={`http://linkedin.com/in${social_media.linkedin.name}`} bgColor="#747474" />}
                            {social_media.spotify?.name && <SocialIcon url={`http://spotify.com/${social_media.spotify.name}`} bgColor="#747474" />}
                            {social_media.soundcloud?.name && <SocialIcon url={`http://soundcloud.com/${social_media.soundcloud.name}`} bgColor="#747474" />}
                            {social_media.snapchat?.name && <SocialIcon url={`http://snapchat.com/${social_media.snapchat.name}`} bgColor="#747474" />}

                            {/* {social.name && social.media && <SocialIcon url={`http://${social.media}.com/${social.name}`} label="Our portfolio" bgColor="#E8BC66" />} */}

                        </div>
                    }
                </div>
            </div>

        </div>

    )
}