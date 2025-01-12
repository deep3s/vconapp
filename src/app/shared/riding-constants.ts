export const RIDING_CONSTANTS = {
    status: {
        KILLED: 'KILLED',
        RECONSIDER: 'RECONSIDER',
        ELECTED: 'ELECTED'
    },
    RIDING_STATUS_COLOR_MAPPING: {
        ELECTED: '#029955',
        KILLED: '#F14538',
        RECONSIDER: 'purple',//'#0AA5ED',
        CALLED: '#0AA5ED',
        DEFAULT: '#000000',
    },
    RIDING_TITLE_MAPPING: {
        ELECTED: 'Closed',
        KILLED: 'Killed',
        RECONSIDER: 'Reconsider',
        CALLED: 'Callable/Called',
        DEFAULT: '',
    },
    RIDING_STATUS_ICON_NAME_MAPPING: {
        ELECTED: 'ri-check-line',//'ri-notification-line',
        KILLED: 'ri-close-circle-line',
        RECONSIDER: 'ri-restart-line',
        CALLED: 'ri-notification-line',
        DEFAULT: 'ri-more-line',
    },
    allRidings: {
        UndecidedRidingsData: [
            {
                districtId: 2,
                ridingName: "Flin Flon",
                party: "PC",
                reported_polls: "70",
                total_polls: 100,
                percentage_reported: 50,
                status: "KILLED",
                margin: "150",
                lastReport: "01:56",
                isEyeIcon: false,
                info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                updatedStatus:{
                    label:"01:56",
                    color:"#F14538"
                },
                ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 4,
                ridingName: 'Concordia',
                party: 'PC',
                reported_polls: 25,
                total_polls: 100,
                percentage_reported: 25,
                status: 'KILLED',
                margin: "100",
                lastReport: '18:00',
                isEyeIcon: false,
                updatedStatus:{
                    label:"18:00",
                    color:"#F14538"
                },
                ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 10,
                ridingName: 'Lakeside',
                party: 'MLP',
                reported_polls: 75,
                total_polls: 100,
                percentage_reported: 75,
                status: 'CALLED',
                margin: "600",
                lastReport: '06:47',
                isEyeIcon: true,
                updatedStatus:{
                    label:"06:47",
                    color:"#0AA5ED"
                },
                info:"This Riding has either been called or should be called",
                ridingIcon: { color: '#0AA5ED', iconName: 'ri-notification-line', label: 'Callable/Called' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 21,
                ridingName: 'Interlake-Gimli',
                party: 'GPM',
                reported_polls: 25,
                total_polls: 100,
                percentage_reported: 25,
                status: 'KILLED',
                margin: "100",
                lastReport: '18:00',
                isEyeIcon: false,
                updatedStatus:{
                    label:"18:00",
                    color:"#F14538"
                },
                info:"This Riding has had its call \"killed\" due to the most recent update in polling numbers",
                ridingIcon: { color: '#F14538', iconName: 'ri-close-circle-line', label: 'Killed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
        ],
        CalledRidingsData: [
            {
                districtId: 1,
                ridingName: 'Wolseley',
                party: 'NDP',
                reported_polls: 100,
                total_polls: 100,
                percentage_reported: 100,
                status: 'ELECTED',
                margin: "2,652",
                lastReport: '00:25',
                isEyeIcon: false,
                updatedStatus:{
                    label:"Completed",
                    color:"#029955"
                },
                ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                selectedViewOption: {}, 
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 3,
                ridingName: 'River Heights',
                party: 'MLP',
                reported_polls: 90,
                total_polls: 100,
                percentage_reported: 90,
                status: 'RECONSIDER',
                margin: "852",
                lastReport: '02:37',
                isEyeIcon: false,
                updatedStatus:{
                    label:"Updated:15+ min ago",
                    color:"gray"
                },
                ridingIcon: { color: 'purple', iconName: 'ri-restart-line', label: 'Reconsider' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                   // {icon: 'bar_chart', selected: false},
                ],
                info:"This Riding should potentially have its call \"killed\" - which is why it is currently in the \"Reconsider\" limbo as per the latest data",
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 8,
                ridingName: 'Thompson',
                party: 'NDP',
                reported_polls: 100,
                total_polls: 100,
                percentage_reported: 100,
                status: 'ELECTED',
                margin: "300",
                lastReport: '14:30',
                isEyeIcon: true,
                updatedStatus:{
                    label:"Completed",
                    color:"#029955"
                },
                ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                    {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
            {
                districtId: 5,
                ridingName: 'Southdale',
                party: 'PC',
                reported_polls: 100,
                total_polls: 100,
                percentage_reported: 100,
                status: 'ELECTED',
                margin: "771",
                lastReport: '06:58',
                isEyeIcon: false,
                updatedStatus:{
                    label:"Completed",
                    color:"#029955"
                },
                ridingIcon: { color: '#029955', iconName: 'ri-check-line', label: 'Closed' },
                viewOptions: [
                    {icon: 'data_table', selected: true},
                   // {icon: 'ssid_chart', selected: false},
                    {icon: 'bar_chart', selected: false},
                ],
                info:"This Riding has been closed as 100% of the polls have been completed as per votes cast by that District",
                selectedViewOption: {},
                options: {},
                optionsBar:  {},
                candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
                { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
                { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
                { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
                { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
                { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
                ]
            },
        ]
    }
}

export function getCellStyle(params: any): any {
    if (params.data != undefined) {
        if (params.data.party == 'PC') {
            return { color: 'rgb(43, 86, 159)', fontWeight: 'normal' };
        }
        else if (params.data.party == 'MLP') {
            return { color: 'rgb(215, 25, 32)', fontWeight: 'normal' };
        }
        else if (params.data.party == 'GPM') {
            return { color: 'rgb(0, 162, 34)', fontWeight: 'normal' };
        }
        else if (params.data.party == 'NDP') {
            return { color: 'rgb(207, 119, 46)', fontWeight: 'normal' };
        }
    }
    return { color: '#000', fontWeight: 'normal' }; // Default style
}

export function changeRowColor(params: any) : { background: any }| undefined{
    if (params.data.status === 'ELECTED') {
        return { background: '#d3d3d3' }; // Light gray for "ELECTED" status
    } else if (params.data.status === 'RECONSIDER') {
        return { background: '#d3d3d3' }; // Light gray for "RECONSIDER" status
    }
    return undefined; // Default row style
}

export function getRidingStatusData(value: string): any {
    const upperValue = value.toUpperCase();
    return { color: RIDING_CONSTANTS.RIDING_STATUS_COLOR_MAPPING[upperValue], iconName: RIDING_CONSTANTS.RIDING_STATUS_ICON_NAME_MAPPING[upperValue], label: RIDING_CONSTANTS.RIDING_TITLE_MAPPING[upperValue] };
}

export function getKilledRidingIcon(): any {
    return getRidingStatusData(RIDING_CONSTANTS.RIDING_TITLE_MAPPING.KILLED);
}

export function getCalledRidingIcon(): any {
    return getRidingStatusData(RIDING_CONSTANTS.RIDING_TITLE_MAPPING.CALLED);
}

export function getElectedRidingIcon(): any {
    return getRidingStatusData(RIDING_CONSTANTS.RIDING_TITLE_MAPPING.ELECTED);
}

export function getReconsiderRidingIcon(): any {
    return getRidingStatusData(RIDING_CONSTANTS.RIDING_TITLE_MAPPING.RECONSIDER);
}