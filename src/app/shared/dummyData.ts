import {getPartyColor, getPartyLightColor} from "./parties-constants";

export const DUMMY_DATA = {
    VotingData: [
        {
            partyId: "PC",
            Votes: "1,894,715",
            Percentage: "47.2%",
            Elected: 18,
            Leading: 18,
            el: 36,
            elp: "63.2%",
        },
        {
            partyId: "NDP",
            Votes: "1,236,382",
            Percentage: "30.8%",
            Elected: 9,
            Leading: 9,
            el: 18,
            elp: "31.6%",
        },
        {
            partyId: "MLP",
            Votes: "614,177",
            Percentage: "15.3%",
            Elected: 2,
            Leading: 1,
            el: 3,
            elp: "5.3%",
        },
        {
            partyId: "GPM",
            Votes: "228,811",
            Percentage: "5.7%",
            Elected: 0,
            Leading: 0,
            el: 0,
            elp: "0%",
        },
        {
            partyId: "CPC-M",
            Votes: "30,107",
            Percentage: "0.75%",
            Elected: 0,
            Leading: 0,
            el: 0,
            elp: "0%",
        },
        {
            partyId: "KP",
            Votes: "10,035",
            Percentage: "0.25%",
            Elected: 0,
            Leading: 0,
            el: 0,
            elp: "0%",
        }],
    ManitobaData: [
        {
            partyId: "Progressive Conservative Party of Manitoba (PC)",
            Elected: 18,
            el: 36,
            elp: "67.2%",
            party_leader: "Heather Stefanson- south Winnipeg of Tuxedo",
            party_seat: "63.2%",
            view: "63.2%",
        },
        {
            partyId: "New Democratic Party of Manitoba (NDP)",
            Elected: 9,
            el: 18,
            elp: "31.6%",
            party_leader: "Wab Kinew- central Winnipeg riding of Fort Rouge",
            party_seat: "72.1%",
            view: "63.2%",
        },
        {
            partyId: "Manitoba Liberal Party (MLP)",
            Elected: 2,
            el: 3,
            elp: "5.3%",
            party_leader: "Dougald Lamont- central-eastern Winnipeg riding of St. Boniface",
            party_seat: "71.7%",
            view: "63.2%",
        },
        {
            partyId: "Green Party of Manitoba (GPM)",
            Elected: 0,
            el: 0,
            elp: "0%",
            party_leader: "Jamine Gibson- central Winnipeg riding of Wolseley",
            party_seat: "62.4%",
            view: "0%",
        },
        {
            partyId: "Communist Party of Canada - Manitoba (CPC-M)",
            Elected: 0,
            el: 0,
            elp: "0%",
            party_leader: "Andrew Taylor",
            party_seat: "51.7%",
            view: "0%",
        },
        {
            partyId: "Keystone Party (KP)",
            Elected: 0,
            el: 0,
            elp: "0%",
            party_leader: "Kevin Friesen",
            party_seat: "54.5%",
            view: "0%",
        }],
    DistrictVote: {
        "district_id": 1,
        "polls": {
            "total_polls": "126",
            "reported_polls": "125",
            "percentage_reported": "99"
        },
        candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
        { name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
        { name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
        { name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
        { name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
        { name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
        ]
    },
    DataBar: [
        {
            quarter: 'PC',
            gas: 36,
        },
        {
            quarter: 'NDP',
            gas: 18,
        },
        {
            quarter: 'MLP',
            gas: 5,
        },
        {
            quarter: 'GPM',
            gas: 0,
        },
        {
            quarter: 'CPC-M',
            gas: 0,
        },
        {
            quarter: 'KP',
            gas: 0,
        },
    ],
    ManitobaBarChartData: [{
        quarter: '12:00',
        pc: 36,
        ndp: 18,
        mlp: 3,
        gpm: 0,
        cpcm: 0,
        kp: 0,
    }
    ],
    ManitobaBarChartSeries: [
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'pc',
            yName: 'PC',
            fill: getPartyColor('PC'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('PC'),
                },
              },
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'ndp',
            yName: 'NDP',
            fill: getPartyColor('NDP'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('NDP'),
                },
              },
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'mlp',
            yName: 'MLP',
            fill: getPartyColor('MLP'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('MLP'),
                },
              },
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'gpm',
            yName: 'GPM',
            fill: getPartyColor('GPM'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('GPM'),
                },
              },
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'cpcm',
            yName: 'CPC-M',
            fill: getPartyColor('CPC-M'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('CPC-M'),
                },
              },
        },
        {
            type: 'column',
            xKey: 'quarter',
            yKey: 'kp',
            yName: 'KP',
            fill: getPartyColor('KP'),
            highlightStyle: {
                item: {
                  fill: getPartyLightColor('KP'),
                },
              },
        }
    ],
    ManitobaSsidChartData: [
        {
            quarter: '8:00',
            pc: 0,
            ndp: 0,
            mlp: 0,
            gpm: 0,
            cpcm: 0,
            kp: 0,
        },
        {
            quarter: '12:00',
            pc: 36,
            ndp: 18,
            mlp: 3,
            gpm: 0,
            cpcm: 0,
            kp: 0,
        },
    ],
    ManitobaSsidChartSeries: [
        {
            xKey: 'quarter',
            yKey: 'pc',
            yName: 'PC',
        },
        {
            xKey: 'quarter',
            yKey: 'ndp',
            yName: 'NDP',
        },
        {
            xKey: 'quarter',
            yKey: 'mlp',
            yName: 'MLP',
        },
        {
            xKey: 'quarter',
            yKey: 'gpm',
            yName: 'GPM',
        },
        {
            xKey: 'quarter',
            yKey: 'cpcm',
            yName: 'CPC-M',
        },
        {
            xKey: 'quarter',
            yKey: 'kp',
            yName: 'KP',
        }
    ],
    PARTIES_COLOR_List: [
        '#6838EE', '#F79009', '#D82D21', '#029955', 'red', 'purple'
    ],
    RidingData: [
        {
            districtId: "1",
            ridingName: "Flin Flon",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46%", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20%", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15%", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10%", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7%", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1%", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        },
        {
            districtId: "2",
            ridingName: "Thompson",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        }, {
            districtId: "3",
            ridingName: "Lakeside",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        }, {
            districtId: "4",
            ridingName: "Interlake-Gimli",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        }, {
            districtId: "5",
            ridingName: "Borderland",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        }, {
            districtId: "6",
            ridingName: "Dawson Trail",
            candidateNames: "Roulea, Desjardins, Sam, Byanca, Yves, Alex",
            candidates: [{ name: "Carlo Rouleau", vote_percentage: "46", party: "PC", votes: "12,156", margin: 6891, leading: "05:54" },
            { id: 1, name: "Jocelyn Desjardins", vote_percentage: "20", party: "NDP", votes: "5,265", margin: 2515, leading: "05:54" },
            { id: 2, name: "Sam Tremblay-Pepin", vote_percentage: "15", party: "MLP", votes: "2,750", margin: 946, leading: "05:54" },
            { id: 3, name: "Byanca Jeune", vote_percentage: "10", party: "GPM", votes: "1,804", margin: 1536, leading: "05:54" },
            { id: 4, name: "Yves Beaulieu", vote_percentage: "7", party: "CPM-C", votes: "268", margin: 186, leading: "05:54" },
            { id: 5, name: "Alex Di Pardo", vote_percentage: "1", party: "KP", votes: "82", margin: 6, leading: "05:54" },
            ]
        }
    ],
    RegionData: [
        { id: 1, polls: 4, name: "Northern Manitoba" },
        { id: 2, polls: 12, name: "South Eastern Manitoba" },
        { id: 3, polls: 9, name: "South Western Manitoba" },
        { id: 4, polls: 32, name: "Winnipeg" },
    ],
    UnElectedVotingData: [
        {
            id: 1,
            party: "PC",
            votes: "1,894,715",
            pop: "47.2%",
            elected: 18,
            leading: 18,
            el: 36,
            elPercentage: "63.2%",
        },
        {
            id: 2,
            party: "NDP",
            votes: "1,236,382",
            pop: "30.8%",
            elected: 9,
            leading: 9,
            el: 18,
            elPercentage: "31.6%",
        },
        {
            id: 3,
            party: "MLP",
            votes: "614,177",
            pop: "15.3%",
            elected: 2,
            leading: 1,
            el: 3,
            elPercentage: "5.3%",
        },
        {
            id: 4,
            party: "GPM",
            votes: "228,811",
            pop: "5.7%",
            elected: 0,
            leading: 0,
            el: 0,
            elPercentage: "0%",
        },
        {
            id: 5,
            party: "CPC-M",
            votes: "30,107",
            pop: "0.75%",
            elected: 0,
            leading: 0,
            el: 0,
            elPercentage: "0%",
        },
        {
            id: 6,
            party: "KP",
            votes: "10,035",
            pop: "0.25%",
            elected: 0,
            leading: 0,
            el: 0,
            elPercentage: "0%",
        },
    ],
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
            lastReport: "01:56"
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
        },
    ],
    CallerRidingData: [
        {
            districtId: "1",
            ridingName: "Flin Flon",
            caller: "Margot McClure"
        },
        {
            districtId: "2",
            ridingName: "Thompson",
            caller: "Tyler Griffin"
        }, {
            districtId: "3",
            ridingName: "Lakeside",
            caller: "Tyler Griffin"
        }, {
            districtId: "4",
            ridingName: "Interlake-Gimli",
            caller: "Margot McClure"
        }, {
            districtId: "5",
            ridingName: "Borderland",
            caller: "Elisha Bravo"
        }, {
            districtId: "6",
            ridingName: "Dawson Trail",
            caller: "Sullivan Castaneda"
        }],
    ManageSetting_Callers: [
        'Tyler Griffin', 'Margot McClure', 'Savanah King', 'Sulivian Castenida', 'Elisha Bravo'
    ],
    TableLegands: [
        {
            title: "Red \"X\":",
            value: "This Riding has had its call \"killed\" due to the most recent update in polling numbers"
        },
        {
            title: "Blue Bell:",
            value: "This Riding has either been called or should be called"
        },
        {
            title: "Green Checkmark:",
            value: "This Riding has been closed as 100% of the polls have been completed as per votes cast by that District"
        },
        {
            title: "Circular Purple Arrow:",
            value: "This Riding should potentially have its call \"killed\" - which is why it is currently in the \"Reconsider\" limbo as per the latest data"
        }
    ]
};
