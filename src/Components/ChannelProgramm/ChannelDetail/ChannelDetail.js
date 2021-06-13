import React from "react";
import s from './ChannelDetail.module.css'
import * as moment from 'moment';
import { Line } from 'rc-progress';
import classNames from 'classnames';
import { connect } from "react-redux";
import { getProgramms } from './../../Redux/actions'


const currentTime = moment().unix();

class ChannelDetail extends React.Component {
    componentDidMount() {
        if (!this.state.test) {
            const time = getTime();
            this.props.fetchProgramms(time.from, time.to, this.props.xvid)
            this.setState({ test: true })
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            visiblePopup: false,
            test: false,
        };
    }


    render() {
        let programmsArray = [];
        for (const [key, value] of Object.entries(this.props.programms)) {
            if (value[this.props.xvid]) {
                value[this.props.xvid].map((x) => (
                    programmsArray.push(x)
                ))
            }
        }

        const percent = (startTime, currentTime, duration) => {
            const percent = (currentTime - startTime) * 100 / duration
            return Math.round(percent)
        }

        const toggleVisiblePopup = () => {
            this.setState({ visiblePopup: !this.state.visiblePopup });
        }

        // Displaying current programm
        const renderChannelProgram = programmsArray.map((programm, index) => {
            const time = moment(programm.start).format('HH:mm');
            const startTime = moment(programm.start).unix();

            return (
                <div key={index}>
                    {(startTime + Number(programm.duration)) > currentTime &&
                        <div>
                            <div className={classNames({
                                [s.containerTitle]: (currentTime >= startTime && currentTime <= startTime + Number(programm.duration)),
                            }, s.channelHeader)}>
                                <div className={s.date}>{time} </div>
                                <div className="">{programm.title}</div>
                            </div>
                            {(currentTime >= startTime && currentTime <= startTime + Number(programm.duration)) &&
                                <Line percent={percent(startTime, currentTime, programm.duration)} strokeWidth="0.5" strokeColor="blue" />
                            }
                            <div className={s.content}>
                                <img referrerPolicy="no-referrer" src={`https://domru.ru/epgservice/ertelecomipfile/pic/${programm.icon} `} alt="Нет изображения" />
                                <div className="">
                                    <div>
                                        {programm.desc}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )
        });
        //Completed programs
        const dontVissibleProgramm = programmsArray.map((programm, index) => {
            const startTime = moment(programm.start).unix();
            return (
                <div key={index}>
                    {(startTime + Number(programm.duration)) < currentTime &&
                        <div className={s.channelTitle}>
                            {programm.title}
                        </div>
                    }
                </div>
            )
        })

        return (
            <div className={s.channelProgrammList}>
                <div className={this.state.visiblePopup ? s.visseble : s.dontVisseble}>
                    {dontVissibleProgramm}
                </div>
                <div className={s.popup}>
                    <svg
                        className={this.state.visiblePopup ? `${s.rotated}` : ""}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="#2C2C2C"
                        />
                    </svg>
                    <span onClick={toggleVisiblePopup}>{this.state.visiblePopup ? "Скрыть прошедшие передачи" : "Показать прошедшие  перередачи"}</span>
                </div>
                {renderChannelProgram}
            </div>
        );
    }
}

function getTime() {
    const time = 24 - moment().hour();
    const dateFrom = moment().format('YYYY-MM-DD');
    const dateTo = moment().add(time, 'hours').format('YYYY-MM-DD+HH');

    return { from: dateFrom, to: dateTo }
}

const mapStateToProps = state => {
    return {
        programms: state.channels.programms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProgramms: (dateFrom, dateTo, xxvid) => dispatch(getProgramms(dateFrom, dateTo, xxvid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);