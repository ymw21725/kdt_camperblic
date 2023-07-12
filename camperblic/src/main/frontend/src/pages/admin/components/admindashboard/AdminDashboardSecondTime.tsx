import React from 'react';
import '../../../../styles/adminStyles/admindashboard/AdminDashboardSecondTime.css';

const AdminDashboardSecondTime = () => {

    const todayTime = () => {
        let now= new Date();
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth()+1;
        let todayDate = now.getDate();
        const week = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
        let dayOfWeek = week[now.getDay()];
        let hours = now.getHours();
        let minutes = now.getMinutes();

        return todayYear+'.'+ todayMonth + '.' + todayDate + ' ' + dayOfWeek + ' ' + hours + '시' + minutes + '분';
    }

    return(
        <section className='adminsecondtime_main'>
            <span className='adminsecondtime_title'>접속시간 : </span>
            {todayTime().slice(0,9)}
            <span className='adminsecondtime_week'>{todayTime().slice(9,13)}</span>
            <span>{todayTime().slice(13,20)}</span>
        </section>
    );
};

export default AdminDashboardSecondTime;