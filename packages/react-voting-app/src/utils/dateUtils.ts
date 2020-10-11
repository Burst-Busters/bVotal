import moment from 'moment';

const formatDateToBurst = (dateString: string) => {
    //receives mm/dd/yyyy
    // returns Sun Dec 10 2000
    const mdate = moment(dateString, "MM/DD/YYYY", true);
    return mdate.format("ddd MMM DD YYYY");
}

export {
    formatDateToBurst,
}