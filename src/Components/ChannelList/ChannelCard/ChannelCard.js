import React from 'react'
import { Link } from "react-router-dom";
import s from './ChannelCard.module.css';
import ChannelInfo from './ChannelInfo/ChannelInfo'


const ChannelCard = (props) => {
    const { xvid } = props.channel;

    return (
        <div className={s.channelListItem}>
            <ChannelInfo info={props.channel} />
            <div >
                <Link
                    to={{ pathname: `/channel/${xvid}`, state: { channel: props.channel } }}
                >
                    <div className={s.channelBtn}>Просмотреть</div>
                </Link>
            </div>
        </div>
    )
}


export default ChannelCard;