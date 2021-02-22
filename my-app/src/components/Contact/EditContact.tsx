import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormState } from 'react-use-form-state';
import { editContactThunk, loadContactThunk } from '../../redux/contact/action';
import { RootState } from '../../redux/store';
import '../../App/rootColor.css'
import style from '../../components/Contact/Contact.module.css'

export function EditContact() {
    // const contactList = useSelector((state: RootState) => state.contact.contactList)
    const contact = useSelector((state: RootState) => state.contact.contactList.contact)
    const social_media = useSelector((state: RootState) => state.contact.contactList.social_media)

    const dispatch = useDispatch();

    const [formState, { label, text, email, number }] = useFormState(null, {
        onChange(event, stateValues, nextStateValues) {
            const { name, value } = event.target;

        }
    }
    );

    useEffect(() => {

        dispatch(loadContactThunk())

        formState.setField('email', contact.email)
        formState.setField('phone', contact.phone)
        formState.setField('instagram', social_media.instagram?.name)
        formState.setField('facebook', social_media.facebook?.name)
        formState.setField('youtube', social_media.youtube?.name)
        formState.setField('spotify', social_media.spotify?.name)
        formState.setField('soundcloud', social_media.soundcloud?.name)
        formState.setField('snapchat', social_media.snapchat?.name)
        formState.setField('twitter', social_media.twitter?.name)
        formState.setField('pinterest', social_media.pinterest?.name)
        formState.setField('linkedin', social_media.linkedin?.name)
        formState.setField('mewe', social_media.mewe?.name)
        let i = 0
        for (let soc in social_media) {
            if (soc === 'other1' || soc === 'other2' || soc === 'other3') {
                i += 1
                formState.setField(`other${i}`, social_media[soc]?.media)
                formState.setField(`other${i}_socialmediaacc`, social_media[soc]?.name)

            }
        }
    }, [dispatch, contact.email])

    const handleSubmit = (event: any) => {

        event.preventDefault();

        const contactList = {
            contact: {
                email: formState.values.email,
                phone: formState.values.phone,
            },
            social_media: {
                instagram: { id: null, media: 'instagram', name: formState.values.instagram },
                facebook: { id: null, media: 'facebook', name: formState.values.facebook },
                youtube: { id: null, media: 'youtube', name: formState.values.youtube },
                spotify: { id: null, media: 'spotify', name: formState.values.spotify },
                soundcloud: { id: null, media: 'soundcloud', name: formState.values.soundcloud },
                snapchat: { id: null, media: 'snapchat', name: formState.values.snapchat },
                twitter: { id: null, media: 'twitter', name: formState.values.twitter },
                pinterest: { id: null, media: 'pinterest', name: formState.values.pinterest },
                linkedin: { id: null, media: 'linkedin', name: formState.values.linkedin },
                mewe: { id: null, media: 'mewe', name: formState.values.mewe },
                other1: { id: null, media: formState.values.other1, name: formState.values.other1_socialmediaacc },
                other2: { id: null, media: formState.values.other2, name: formState.values.other2_socialmediaacc },
                other3: { id: null, media: formState.values.other3, name: formState.values.other3_socialmediaacc },

            }
        }

        dispatch(editContactThunk(contactList))

    }

    return (
        <div className={style.contact_section}>
            <form onSubmit={handleSubmit}>
                <div className={style.contact_main}>
                    <label {...label('email')}>*電郵地址: </label>
                    <input {...email('email')} required />

                </div>
                <div className={style.contact_main}>
                    <label {...label('phone')}>電話號碼: </label>
                    <input {...number('phone')} />
                </div>
                <div className={style.social_media}>
                    <div className={style.big_social}>
                        <h2>社交媒體</h2>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('instagram')}>Instagram: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('instagram')} />
                                </div>
                            </div>
                        </div>

                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('facebook')}>Facebook: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('facebook')} />
                                </div>
                            </div>
                        </div>

                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('twitter')}>Twitter: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('twitter')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('pinterest')}>Pinterest: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('pinterest')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('youtube')}>Youtube: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('youtube')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('spotify')}>Spotify: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('spotify')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('soundcloud')}>Soundcloud: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('soundcloud')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('linkedin')}>Linkedin: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('linkedin')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('snapchat')}>Snapchat: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('snapchat')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <label {...label('mewe')}>Mewe: </label>
                                <div className={style.soc_span}>
                                    <span>@</span>
                                    <input {...text('mewe')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.other}>
                        <h2>其他</h2>

                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <input {...text('other1')} />
                                <div className={style.soc_span}>
                                    <span>@ </span>
                                    <input {...text('other1_socialmediaacc')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <input {...text('other2')} />
                                <div className={style.soc_span}>
                                    <span>@ </span>
                                    <input {...text('other2_socialmediaacc')} />
                                </div>
                            </div>
                        </div>
                        <div className={style.social_media_box}>
                            <div className={style.social}>
                                <input {...text('other3')} />
                                <div className={style.soc_span}>
                                    <span>@ </span>
                                    <input {...text('other3_socialmediaacc')} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.btn}>
                    <button className={style.subbtn}>Submit</button>
                </div>
            </form>
        </div>
    )
}
