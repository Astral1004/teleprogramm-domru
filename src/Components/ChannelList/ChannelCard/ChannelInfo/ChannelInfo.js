import React from 'react'
import s from './ChannelInfo.module.css';

const ChannelInfo = (props) => {
    const { logo, title } = props.info;

    return (
        <div className={s.container}>
            <div className={s.channelInfo} >
                <img src={`https://epg.domru.ru${logo}`} alt='' />
                <h2>
                    {title}
                </h2>
            </div>
            <div>
                <p>
                    {props.info.description}
                </p>
            </div>
        </div>
    )

}

export default ChannelInfo;