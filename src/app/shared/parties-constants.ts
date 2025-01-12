export const PARTIES_COLOR_MAPPING = {
  PC: '#2B569F',
  NDP: '#CF772E',
  MLP: '#D71920',
  BQ: '#2B569F',
  CFP: '#CF772E',
  CHP: '#D71920',
  GPM: '#00A222',
  GRN: '#00A222',
  KP: '#412165',
  LIB:'#D92C21',
  DEFAULT: '#EE161F'//'#CC0000'//'#D82D21',
};

export const PARTIES_LIGHT_COLOR_MAPPING = {
  PC: '#7c97c5',
  NDP: '#f7c297',
  MLP: '#fb9da0',
  GPM: '#85e098',
  GRN: '#85e098',
  KP: '#b47cf4',
  DEFAULT: '#f29295'
};

export function getPartyLightColor(value: string): string {
  const upperValue = value.toUpperCase();
  return PARTIES_LIGHT_COLOR_MAPPING[upperValue] || PARTIES_LIGHT_COLOR_MAPPING.DEFAULT;
}

export function getPartyColor(value: string): string {
  const upperValue =(value!=undefined)? value.toUpperCase():'DEFAULT';
  return PARTIES_COLOR_MAPPING[upperValue] || PARTIES_COLOR_MAPPING.DEFAULT;
}

export function getFNPartyLightColor(value: string): string | undefined {
  var color= getPartyLightColor(getPartyShortName(value)?? "");
  return  color;
}

export function getFNPartyColor(value: string): string | undefined {
  var color = PARTIES.parties.find(x => x.name == value)?.color;
  return color;
}

export function getPartyShortName(fullName: string): string | undefined {
  var shortName = PARTIES.parties.find(x => x.name == fullName)?.handle;
  return shortName;
}

export function getPartyFullName(shortName: string): string | undefined {
  var fullName = PARTIES.parties.find(x => x.handle == shortName)?.name;
  return fullName;
}


export const PARTIES = {
  parties: [
    {
      id: 1,
      handle: "PC",
      party: "party",
      name: 'Progressive Conservative Party of Manitoba (PC)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("PC"),
      tableRow: [
        {
          id: 1,
          leader: 'Heather Stefanson',
          leaderSince: 'October 30, 2021',
          leaderSeat: 'Tuxedo',
          leaderElection: '36/57 seats (63.2%)'
        }
      ]
    },
    {
      id: 2,
      handle: "NDP",
      party: "NDP",
      name: 'New Democratic Party of Manitoba (NDP)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("NDP"),
      tableRow: [
        {
          id: 2,
          leader: 'Web Kinew',
          leaderSince: 'September 16, 2017',
          leaderSeat: 'Fort Rouge',
          leaderElection: '18/57 seats (31.5%)'
        }
      ]
    },
    {
      id: 3,
      handle: "MLP",
      party: "MLP",
      name: 'Manitoba Liberal Party (MLP)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("MLP"),
      tableRow: [
        {
          id: 3,
          leader: 'Dougald Lamont',
          leaderSince: 'October 21, 2017',
          leaderSeat: 'St. Boniface',
          leaderElection: '3/57 seats (5.3%)'
        }
      ]
    },
    {
      id: 4,
      handle: "GPM",
      party: "GPM",
      name: 'Green Party of Manitoba (GPM)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("GPM"),
      tableRow: [
        {
          id: 4,
          leader: 'Jamine Gibson',
          leaderSince: 'March 26, 2023',
          leaderSeat: 'Wolseley',
          leaderElection: '0/57 seats (0%)'
        }
      ]
    },
    {
      id: 5,
      handle: "CPC-M",
      party: "CPC-M",
      name: 'Communist Party of Canada - Manitoba (CPC-M)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("CPC-M"),
      tableRow: [
        {
          id: 4,
          leader: 'Andrew Taylor',
          leaderSince: 'March 26, 2023',
          leaderSeat: 'Winnipeg',
          leaderElection: '0/57 seats (0%)'
        }
      ]
    },
    {
      id: 6,
      handle: "KP",
      party: "KP",
      name: 'Keystone Party (KP)',
      lastSync: '21:06:54 EDT 10/03/2023',
      color: getPartyColor("KP"),
      tableRow: [
        {
          id: 4,
          leader: 'Kevin Friesen',
          leaderSince: 'March 26, 2023',
          leaderSeat: 'Grunthal',
          leaderElection: '0/57 seats (0%)'
        }
      ]
    }
  ],
  partiesDropDown: [
    {
      id: 1,
      name: "PC"
    },
    {
      id: 2,
      name: "NDP"
    },
    {
      id: 3,
      name: "MLP"
    },
    {
      id: 4,
      name: "GPM"
    },
    {
      id: 5,
      name: "CPC-M"
    },
    {
      id: 6,
      name: "KP"
    }
  ],
  parties_color_list: ['#2B569F', '#CF772E', '#D71920', '#00A222', '#EE161F', '#412165'],
};
