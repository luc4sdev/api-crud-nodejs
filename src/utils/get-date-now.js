export function getDateNow() {


    function addZeroDate(date) {
        if(date < 10) {
            return '0' + date
        }
        else {
            return date
        }
    }

    const dateNow = new Date();
    const day = addZeroDate(dateNow.getDate())
    const month = addZeroDate(dateNow.getMonth() + 1)
    const year = addZeroDate(dateNow.getFullYear())
    const hours = addZeroDate(dateNow.getHours())
    const minutes = addZeroDate(dateNow.getMinutes())


    const formattedDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes

    return formattedDate
}