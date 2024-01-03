import moment from 'moment';
const duration = ({ start, end }) => {

    const renderDays = d => {
        if (d < 1) {
            return '';
        }
        const returnString = d >= 2 ? 'dagar' : 'dag';
        return `${d} ${returnString}`;
    }

    const renderHours = h => {
        if (h < 1) {
            return '';
        }
        const returnString = h >= 2 ? 'timmar' : 'timme';
        return `${h} ${returnString}`;
    }

    const renderMinutes = m => {
        if (m < 1) {
            return '';
        }
        const returnString = m >= 2 ? 'minuter' : 'minut';
        return `${m} ${returnString}`;
    }
    var delta = Math.abs(new Date(end) - new Date(start)) / 1000;

    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // console.log('weeks', weeks)

    return `${renderDays(days)} ${renderHours(hours)} ${renderMinutes(minutes)}`;
}

export default duration;