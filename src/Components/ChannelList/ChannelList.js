import React from "react";
import s from './ChannelList.module.css'
import ChannelCard from './ChannelCard/ChannelCard'
import { connect } from 'react-redux'
import { getChannels } from "../Redux/actions"

class ChannelList extends React.Component {
    componentDidMount() {
        this.props.fetchChannels();
    };

    render() {
        let channelArray = []
        for (const [key, value] of Object.entries(this.props.channels)) {
            value.map((x) => (
                channelArray.push(x)
            ))
        }
        const renderChannelList = channelArray.map((channel) => {
            return (
                <ChannelCard
                    channel={channel}
                    key={channel.id} />
            )
        });

        return (
            <div>
                <h1 className={s.title}>Телепрограмма</h1>
                <div className={s.channelList}>
                    {renderChannelList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        channels: state.channels.channels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChannels: () => dispatch(getChannels())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)