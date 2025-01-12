// export const COLOR_MAPPING = {
//   PCP: 'blue',
//   NDP: 'orange',
//   MLP: 'red',
//   GPM: 'green',
//   IND: '#354055',

import { ColDef } from "ag-grid-community";

//   PC: '#6839EF',
//   PQ: '#F69008',
//   LIB: '#D92C21',
//   QS: '#029955',
//   CAQ: '#354055',
//   DEFAULT: '#D82D21',
// };

// export const COLOR_MAPPING1 = {
//   PC: '#6839EF',
//   PQ: '#F69008',
//   LIB: '#D92C21',
//   QS: '#029955',
//   CAQ: '#354055',
//   DEFAULT: '#D82D21',
// };

// export function getPartyColor(value: string): string {
//   const upperValue = value.toUpperCase();
//   return COLOR_MAPPING[upperValue] || COLOR_MAPPING.DEFAULT;
// }

// export function getFNPartyColor(value: string): string {
//   if (value == "Progressive Conservative Party") {
//     return COLOR_MAPPING["PCP"];
//   }
//   else if (value == "New Democratic Party") {
//     return COLOR_MAPPING["NDP"];
//   }
//   else if (value == "Liberal Party") {
//     return COLOR_MAPPING["MLP"];
//   }
//   else if (value == "Green Party") {
//     return COLOR_MAPPING["GPM"];
//   }
//   else if (value == "India Association") {
//     return COLOR_MAPPING["IND"];
//   }

//   return COLOR_MAPPING.DEFAULT;
// }



//   cellRendererParams: (params) => ({
//     partyData: {
//         color:
//             params.value.toUpperCase() === "PC"
//                 ? "#6839EF"
//                 : params.value.toUpperCase() === "PQ"
//                 ? "#F69008"
//                 : params.value.toUpperCase() === "LIB"
//                     ? "#D92C21"
//                     : params.value.toUpperCase() === "QS"
//                         ? "#029955"
//                         : params.value.toUpperCase() === "CAQ"
//                             ? "#354055"
//                             : "#D82D21", // Default color
//         label: params?.value || "",
//         // fontSize: "20px",
//     },
// }),

export const RidingStatus = {
  KILLED: 'KILLED',
  RECONSIDER: 'RECONSIDER',
  ELECTED: 'ELECTED',
  UNCALLED: 'UNCALLED'
}

export function getRidingStatusData(value: number): any {
  var upperValue= '';// = value.toUpperCase();
  if(value===0)
    upperValue='UNCALLED'
  else if(value===-1)
    upperValue='RECONSIDER'
  else if(value===2)
    upperValue='CALLED'
  else
    upperValue='CALLED';
  //upperValue=upperValue.toUpperCase();
  //const convertedStatuses = convertStatus(upperValue);
  return { color: RIDING_STATUS_COLOR_MAPPING[upperValue], iconName: RIDING_STATUS_ICON_NAME_MAPPING[upperValue], label: RIDING_TITLE_MAPPING[upperValue] };
}

export const RIDING_STATUS_COLOR_MAPPING = {
  ELECTED: '#029955',
  KILLED: '#F14538',
  RECONSIDER: 'purple',//'#0AA5ED',
  CALLED: '#029955',
  DEFAULT: '#000000',
  UNCALLED: '#0AA5ED'
};

export const RIDING_TITLE_MAPPING = {
  ELECTED: 'Closed',
  KILLED: 'Killed',
  RECONSIDER: 'Reconsider',
  CALLED: 'Called',
  DEFAULT: '',
  UNCALLED: 'Elect',
};

export const RIDING_STATUS_ICON_NAME_MAPPING = {
  ELECTED: 'ri-check-line',//'ri-notification-line',
  KILLED: 'ri-close-circle-line',
  RECONSIDER: 'ri-restart-line',
  CALLED: 'ri-check-line',
  DEFAULT: 'ri-more-line',
  UNCALLED: 'ri-notification-line',
};

export const RIDING_STATUS_LIST = [
  { id: 2, name: RIDING_TITLE_MAPPING.CALLED, icon: RIDING_STATUS_ICON_NAME_MAPPING.CALLED, color: RIDING_STATUS_COLOR_MAPPING.CALLED, description: "This Riding has been called" },
  { id: 3, name: RIDING_TITLE_MAPPING.UNCALLED, icon: RIDING_STATUS_ICON_NAME_MAPPING.UNCALLED, color: RIDING_STATUS_COLOR_MAPPING.UNCALLED, description: "This Riding has not been called yet" },
  { id: 4, name: RIDING_TITLE_MAPPING.RECONSIDER, icon: RIDING_STATUS_ICON_NAME_MAPPING.RECONSIDER, color: RIDING_STATUS_COLOR_MAPPING.RECONSIDER, description: "This Riding is being reconsidered" }
];

// export function convertStatus(status: string): string {
//   return status.toLowerCase().replace(/^\w/, c => c.toUpperCase());
// }

export function getRidingStatusDataOld(params) {
  let statusData = {
    color: params.value.toUpperCase() === RidingStatus.ELECTED
      ? "#029955"
      : params.value.toUpperCase() === RidingStatus.KILLED
        ? "#F14538"
        : params.value.toUpperCase() === RidingStatus.RECONSIDER
          ? "#0AA5ED"
          : "#000000", // Default color
    iconName:
      params.value.toUpperCase() === RidingStatus.ELECTED
        ? "ri-notification-line"
        : params.value.toUpperCase() === RidingStatus.KILLED
          ? "ri-close-circle-line"
          : params.value.toUpperCase() === "RECONSIDER"
            ? "ri-restart-line"
            : "ri-more-line",
  };
  return statusData;
}

export function removeCommasFromString(input: string): string {
  return input.replace(/,/g, '');
}

export function UnElectedMarginColor(value: string): any {
  var color = parseInt(removeCommasFromString(value)) >= 500 ? "#606366" : "#f3645a";
  return color;
}

export function HandleColumnVisibleChange(params: any) {
  const allColumns = params.columnApi.getAllColumns();
  const visibleColumns = allColumns.filter(col => col.isVisible());

  if (visibleColumns.length === 0) {
    params.columnApi.setColumnVisible(params.column.getColId(), true);
    // alert('At least one column must be visible.');
  }
}

export function getDefaultColDef(): ColDef<any> {
  return  {
    // resizable: false, // stop column width change manually
    resizable: true,
    filter: "agTextColumnFilter",
    //editable: true,
    // menuTabs: ['filterMenuTab', 'generalMenuTab'],
    menuTabs: ['filterMenuTab'],
  };
}


export const ALERT_CONSTANTS = {
  alertText: "Are you sure you want to",
  cancelEnglishAndFrenchStatement: "Are you sure you want to cancel the English and French call statement?",
  cancelEnglishStatement: "Are you sure you want to cancel the English call statement?",
  cancelFrenchStatement: "Are you sure you want to cancel the French call statement?",
  addCandidate: "Are you sure you want to add candidate?",
  addParty: "Are you sure you want to add party?",
  addCaller: "Are you sure you want to add caller?",
  deleteCandidate: "Are you sure you want to delete candidate",
  deleteParty: "Are you sure you want to delete party",
  deleteCaller: "Are you sure you want to delete caller",
  saveManageSetting: "Are you sure you want to save manage-settings changes?",
  cancelAlertText: "Are you sure you want to cancel?",
}

export const ERS_CONSTANTS = {
  groupElectionsList: [
    {
      id: 1,
      groupName: 'Active',
      name: '2024 British Columbia election'
    },
    {
      id: 2,
      groupName: 'Active',
      name: '2024 New Brunswick election'
    },
    {
      id: 3,
      groupName: 'Active',
      name: '2024 Saskatchewan election'
    },
    {
      id: 4,
      groupName: 'Active',
      name: '2025 Federal election'
    },
    {
      id: 5,
      groupName: 'Active',
      name: '2024 Elmwood—Transcona federal by-election'
    },
    {
      id: 6,
      groupName: 'Readonly',
      name: '2023 Langford-Juan de Fuca provincial by-election (Archive)'
    }
  ],
  ElectionsList: [
    {
      id: 1,
      name: '2024 British Columbia election',
      color: '#343a40',
      selectedColor: 'white'
    },
    {
      id: 2,
      name: '2024 New Brunswick election',
      color: '#343a40',
      selectedColor: 'white'
    },
    {
      id: 3,
      name: '2024 Saskatchewan election',
      color: '#343a40',
      selectedColor: 'white'
    },
    {
      id: 4,
      name: '2025 Federal election',
      color: '#343a40',
      selectedColor: 'white'
    },
    {
      id: 5,
      name: '2024 Elmwood—Transcona federal by-election',
      color: '#343a40',
      selectedColor: 'white'
    },
    {
      id:6,
      name:'2023 Langford-Juan de Fuca provincial by-election (Archive)',
      color: '#a0a0a5',
      selectedColor: '#a0a0a5'
      //disabled:true
    }
  ],
  ElectionGroupNames: {
    Active: 'Active',
    ReadOnly: 'Read-Only',
  },
};

export function getElectionDropDownBackgroundColor(groupName: string): any {

  let backgroundColor = 'default-color';
  if (groupName == ERS_CONSTANTS.ElectionGroupNames.Active) {
    backgroundColor = '#cc212c'
  }
  if (groupName == ERS_CONSTANTS.ElectionGroupNames.ReadOnly) {
    backgroundColor = 'gray'
  }
  return backgroundColor;
}

function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates (Knuth) Shuffle Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// export function reformatDate(dateTimeString: string): string {
//   // Split the string by space
//   const [date, time] = dateTimeString.split(' ');
  
//   // Create an array with the date and time components
//   const parts = [date, time];
  
//   // Shuffle the array
//   const shuffledParts = shuffleArray(parts);
  
//   // Join the shuffled parts back into a string
//   return shuffledParts.join(' ');
// }

export function reformatDate(originalDateString: string): string {
  // Parse the original date string
  const originalDate = new Date(originalDateString.replace(' ', 'T')); // Convert 'YYYY-MM-DD HH:MM:SS.SSSSSS' to ISO format
  
  // Extract components
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(originalDate.getDate()).padStart(2, '0');
  const hours = String(originalDate.getHours()).padStart(2, '0');
  const minutes = String(originalDate.getMinutes()).padStart(2, '0');
  const seconds = String(originalDate.getSeconds()).padStart(2, '0');
  //const milliseconds = String(originalDate.getMilliseconds()).padStart(3, '0');
  
  // Construct the new format
  // const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDate = `${year}-${month}-${day}`;
  
  return `${formattedTime} ${formattedDate}`;
}

export function getTimeDifferenceFromNow(inputDateString: string): string {
  // Parse the given timestamp into a Date object (assume EDT)
  const inputDate = new Date(inputDateString.replace(' ', 'T')); // 'YYYY-MM-DD HH:MM:SS.SSSSSS' => ISO format

  // Get current time in EDT
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  // Parse current date/time in EDT
  const currentEDTDate = new Date(new Intl.DateTimeFormat('en-US', options).format(now));

  // Calculate the difference in milliseconds
  const timeDifferenceMs = currentEDTDate.getTime() - inputDate.getTime();

  // Convert difference to hours, minutes, seconds
 // const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

  const days = Math.floor(hours / 24); // Calculate full days
  // if(days>0){
  //   const remainingHours = hours % 24; // Remaining hours after days
  //   if(remainingHours>0){
  //     return `Updated ${days} day ${remainingHours} hrs ago`;
  //   }
  //   else{
  //     if(days==1){
  //       return `Updated ${days} day ago`;
  //     }
  //     else{
  //       return `Updated ${days} days ago`;
  //     }
  //   }
  // }
  

  // Format hours, minutes, and seconds to always show two digits
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
  // Return a human-readable string showing time since the report
  // if (hours > 0) {
  //   return `${hours} hour(s) and ${minutes} minute(s) ago`;
  // } else if (minutes > 0) {
  //   return `${minutes} minute(s) and ${seconds} second(s) ago`;
  // } else {
  //   return `${seconds} second(s) ago`;
  // }


 // return `${hours}:${minutes}`;
}
