import React from "react";
import { Link } from "react-router-dom"
import ChannelDetail from './ChannelDetail/ChannelDetail'
import ChannelInfo from "../ChannelList/ChannelCard/ChannelInfo/ChannelInfo";
import back from '../../back.svg'
import s from './ChannelProgramm.module.css'

const ChannelProgramm = (props) => {
    const { xvid } = props.location.state.channel;

    return (
        <div className={s.container}>
            <div className={s.channelHeader}>
                <ChannelInfo info={props.location.state.channel} />
            </div>
            <ChannelDetail xvid={xvid} />
            <Link to="/">
                <div className={s.back}>
                    <img src={back} alt="" />
                </div>
            </Link>
        </div>
    );
};

export default ChannelProgramm;