import moment from 'moment';
const timeSlot = 30;

// PARIS TIMEZONE
const localDatTime = moment().add(1, 'd')
console.log(localDatTime)

export const appointments = [
    {
        componentDidMount() {
            axios.get('https://appointmentsapi.herokuapp.com/api/v1/appointments')
            .then(response => {
                console.log(response)
                this.setState({
                    appointments: response.data
                })
            })

        } 
            }

    
]









function getTime(hour, minute) {
    return localDatTime.clone().startOf('day').hour(hour).minute(minute).format('HH:mm');
}
// randomly added booking
// export const timeSlices = [
//     { day: 'Monday', start: getTime(10, 0), end: getTime(18, 0) },
//     { day: 'Tuesday', start: getTime(9, 30), end: getTime(16, 0) },
//     { day: 'Wednesday', start: getTime(9, 30), end: getTime(17, 0) },
//     { day: 'Thursday', start: getTime(10, 30), end: getTime(16, 30) },
//     { day: 'Friday', start: getTime(8, 30), end: getTime(17, 30) },
//     { day: 'Saturday', start: getTime(10, 30), end: getTime(16, 30) },
//     { day: 'Sunday', start: getTime(8, 30), end: getTime(15, 30) }
// ];

export const timeExceptions = [
    // {
    //     startDate: localDatTime.clone().add(3, 'd').format('L'),
    //     endDate: localDatTime.clone().add(5, 'd').format('L'),
    //     startTime: getTime(9, 0),
    //     endTime: getTime(17, 0)
    // },
    // {
    //     startDate: localDatTime.clone().add(6, 'd').format('L'),
    //     endDate: localDatTime.clone().add(7, 'd').format('L'),
    //     startTime: getTime(11, 0),
    //     endTime: getTime(14, 0),
    //     off: true
    // }
];

export function componentDidMount() {
    axios.get('https://appointmentsapi.herokuapp.com/api/v1/appointments.json')
    .then(response => {
        console.log(response)
        this.setState({
            appointments: response.data
        })
    })
    .catch(error => console.log(error))
}

export const bookings = [
    {
        startDate: "Sun Jul 22 2018 12:00:00",
        
        endDate: "",
        title: "test"
    },
    {
        startDate: localDatTime.clone().add(+4, 'd').seconds(0).milliseconds(0).hours(10).minutes(0),
        
        endDate: localDatTime.clone().add(+4, 'd').seconds(0).milliseconds(0).hours(10).minutes(30),
        title: "test"
    }
    // ,
    // {
    //     startDate: localDatTime.clone().add(-2, 'd').seconds(0).milliseconds(0).hours(10).minutes(0),
    //     endDate: localDatTime.clone().add(-2, 'd').seconds(0).milliseconds(0).hours(10).minutes(30)
    // }
    // ,
    
    // {
    //     startDate: localDatTime.clone().add(2, 'd').seconds(0).milliseconds(0).hours(10).minutes(0),
    //     endDate: localDatTime.clone().add(2, 'd').seconds(0).milliseconds(0).hours(10).minutes(30)
    // }
    // ,
    // {
    //     startDate: localDatTime.clone().add(1, 'd').seconds(0).milliseconds(0).hours(12).minutes(0),
    //     endDate: localDatTime.clone().add(1, 'd').seconds(0).milliseconds(0).hours(13).minutes(30)
    // }
];
