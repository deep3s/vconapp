import {Padding} from "ag-charts-community/dist/esm/es6/sparklines-util";
import {
    getFNPartyColor,
    getFNPartyLightColor,
    getPartyColor,
    getPartyLightColor,
    getPartyShortName
} from "./parties-constants";

// dynamicallyDrawBarChart
export function getOverviewBarChart(manitobaData: any, optionsBar: any): any {
    // Transform data to barChartData format
    const barChartData = manitobaData.map((manitoba, index) => ({
        quarter: getPartyShortName(manitoba.partyId),
        [`item${index}`]: parseInt(manitoba.el) // Convert vote_percentage to a number
    }));

    // Create barChartSeries dynamically
    const barChartSeries = manitobaData.map((manitoba, index) => ({
        type: "column",
        xKey: "quarter",
        yKey: `item${index}`, // Key corresponding to the dynamically generated item keys
        yName: getPartyShortName(manitoba.partyId), // Use candidate's name for yName
        stacked: true,
        cornerRadius: 10,
        fill: getFNPartyColor(manitoba.partyId),
        highlightStyle: {
            item: {
                fill: getFNPartyLightColor(manitoba.partyId),
            },
        },
    }));

    optionsBar = {
        ...optionsBar, // Preserve other options
        data: barChartData, // Update data
        series: barChartSeries
    };
    return optionsBar;
}

export function getRidingBarChart(candidates: any, optionsBar: any): any {
    const barChartData = candidates.map((candidate, index) => ({
        quarter: candidate.name,
        [`item${index}`]: parseInt(candidate.vote_percentage) // Convert vote_percentage to a number
    }));

    const barChartSeries = candidates.map((candidate, index) => ({
        type: "bar",
        xKey: "quarter",
        yKey: `item${index}`, // Key corresponding to the dynamically generated item keys
        yName: candidate.name, // Use candidate's name for yName
        stacked: true,
        cornerRadius: 10,
        strokeWidth: 0,
        fill: getPartyColor(candidate.party),
        highlightStyle: {
            item: {
                fill: getPartyLightColor(candidate.party),
            },
        },
    }));
    optionsBar = {
        ...optionsBar, // Preserve other options
        data: barChartData, // Update data
        series: barChartSeries
    };
    return optionsBar;
}

export function getRegionBarChart(candidates: any, optionsBar: any): any {
    const barChartData = candidates.map((candidate, index) => ({
        quarter: candidate.name,
        [`item${index}`]: parseInt(candidate.vote_percentage) // Convert vote_percentage to a number
    }));

    const barChartSeries = candidates.map((candidate, index) => ({
        type: "bar",
        xKey: "quarter",
        yKey: `item${index}`, // Key corresponding to the dynamically generated item keys
        yName: candidate.name, // Use candidate's name for yName
        stacked: true,
        cornerRadius: 10,
        strokeWidth: 0,
        fill: getPartyColor(candidate.party),
        highlightStyle: {
            item: {
                fill: getPartyLightColor(candidate.party),
            },
        },
    }));
    optionsBar = {
        ...optionsBar, // Preserve other options
        data: barChartData, // Update data
        series: barChartSeries
    };
    return optionsBar;
}

// dynamicallyDrawLineGraph
export function getRidingLineGraph(candidates: any, options: any): any {
    var lineGraphData = [
        {
            time: 8
        }, {
            time: 12
        }
    ];
    candidates.map(cdt => {
        lineGraphData[0][cdt.party] = 0;
        //lineGraphData[1][cdt.party] = parseInt(removeCommasFromString(cdt.votes));
        lineGraphData[1][cdt.party] = parseInt(cdt.votes);
    });
    var lineGraphSeries = candidates.map(cdt => {
        return {
            xKey: 'time',
            yKey: cdt.party,
            yName: cdt.name,
        };
    })

    options = {
        ...options, // Preserve other options
        data: lineGraphData, // Update data
        series: lineGraphSeries
    };

    return options;
}

export function getRegionLineGraph(candidates: any, options: any): any {
    var lineGraphData = [
        {
            time: 8
        }, {
            time: 12
        }
    ];
    candidates.map(cdt => {
        lineGraphData[0][cdt.party] = 0;
        lineGraphData[1][cdt.party] = parseInt(cdt.votes);
    });
    var lineGraphSeries = candidates.map(cdt => {
        return {
            xKey: 'time',
            yKey: cdt.party,
            yName: cdt.name,
        };
    })

    options = {
        ...options, // Preserve other options
        data: lineGraphData, // Update data
        series: lineGraphSeries
    };

    return options;
}


// dynamicallyDrawPieChart

export function getRidingPieChart(candidates: any, pieOptions: any): any {
    var pieChartData = candidates.map(cdt => {
        return {label: cdt.name, value: parseInt(cdt.vote_percentage), party: cdt.party};
    });

    pieOptions = {
        ...pieOptions, // Preserve other options
        data: pieChartData
    };

    return pieOptions;
}

export function getRegionPieChart(candidates: any, pieOptions: any): any {
    var pieChartData = candidates.map(cdt => {
        return {label: cdt.name, value: parseInt(cdt.vote_percentage)};
    });

    pieOptions = {
        ...pieOptions, // Preserve other options
        data: pieChartData
    };

    return pieOptions;
}


export function getERSBarChart(manitobaData: any, optionsBar: any): any {
    // Create the object dynamically
    const barChartDataObj = manitobaData.overview_party_details.reduce((acc, party) => {
        const shortName = party.party_short_eng // Get short name using function
        if (shortName) {
            acc[shortName] = party.elected + party.leading; // Use short name as key and el as value
        }
        return acc;
    }, {});
    barChartDataObj["quarter"] = "L&E";

    // Extract key-value pairs, filter for number type values, sort, and then combine with non-number properties
    /*let sortedData = {
        quarter: barChartDataObj.quarter,
        ...Object.fromEntries(
            Object.entries(barChartDataObj)
                .filter(([key, value]) => typeof value === 'number')
                // .sort(([, a], [, b]) => (b as number) - (a as number))
                .sort(([, a], [, b]) => (b as number) - (a as number))
        )
    };

    let barChartData = [sortedData];*/
    let barChartData = [barChartDataObj];

    let calledRidings = 0;

    let barChartSeries = Object.keys(barChartDataObj).filter(key => key !== "quarter").map(key => {
        calledRidings += barChartDataObj[key];
        return {
            type: "bar",
            le: barChartDataObj[key],
            xKey: "quarter",
            yKey: key,
            yName: key,
            normalizedTo: manitobaData.total_ridings,
            stacked: true,
            stroke: 'grey', // Set the border color
            strokeWidth: 0, // Set the border width
            // fill: getPartyColor(key),
            // highlightStyle: {
            //     item: {
            //         fill: getPartyLightColor(key),
            //     },
            // },
            fill: barChartDataObj[key] === 0 ? "#FFFFFF" : getPartyColor(key), // Use white if value is 0
            highlightStyle: {
                item: {
                    fill: barChartDataObj[key] === 0 ? "#FFFFFF" : getPartyLightColor(key),
                },
            },
            // Optional tooltip settings
            // tooltip: {
            //     enabled: true,
            //     // Additional tooltip configurations
            // }
        }
    });
    barChartSeries = barChartSeries.sort((a, b) => b.le - a.le)


    barChartDataObj['blank'] = manitobaData.total_ridings - calledRidings;
    barChartSeries.push(
        {
            type: "bar",
            le: manitobaData.total_ridings - calledRidings,
            xKey: "quarter",
            yKey: 'blank',
            yName: 'blank',
            normalizedTo: manitobaData.total_ridings,
            stacked: true,
            stroke: 'grey', // Set the border color
            strokeWidth: 1, // Set the border width
            // fill: getPartyColor(key),
            // highlightStyle: {
            //     item: {
            //         fill: getPartyLightColor(key),
            //     },
            // },
            fill: "#FFFFFF", // Use white if value is 0
            highlightStyle: {
                item: {
                    fill: "#FFFFFF",
                },
            },
            // Optional tooltip settings
            // tooltip: {
            //     enabled: true,
            //     // Additional tooltip configurations
            // }
        }
    )

    let lom = manitobaData.total_ridings / 2;
    if (manitobaData.total_ridings % 2 === 0) {
        lom = lom + 1;
    } else {
        lom = lom + 0.5;
    }

    optionsBar = {
        ...optionsBar, // Preserve other options
        data: barChartData, // Update data
        series: barChartSeries,
        height: 150, // Set the height of the canvas (chart) in pixels
        axes: [
            {
                type: 'category',
                position: 'left',
                line: {
                    width: 0 // Removes the x-axis line
                },
                // Optionally, remove ticks and labels as well
                tick: {width: 0},
                label: {enabled: false},

            },
            {
                type: 'number',
                position: 'bottom',
                line: {
                    width: 0 // Removes the y-axis line
                },
                // Optionally, remove ticks and labels as well
                tick: {width: 0},
                label: {enabled: false},
                crossLines: [
                    {
                        value: 0, // The value where the crossLine should appear
                        fill: 'none',
                        stroke: 'grey', // The color of the crossLine
                        strokeWidth: 2, // Optional: thickness of the line
                        lineDash: [0, 4], // Optional: makes the line dashed
                        label: {
                            text: 'Leading and Elected', color: 'black',
                            position: 'topRight', padding: 2,
                            fontWeight: 'bold', fontSize: 16, fontFamily: 'LatoMedium'
                        }
                    },
                    {
                        value: lom, // The value where the crossLine should appear
                        fill: 'none',
                        stroke: 'grey', // The color of the crossLine
                        strokeWidth: 2, // Optional: thickness of the line
                        lineDash: [4, 2], // Optional: makes the line dashed
                        label: {
                            text: `Line of majority (${lom} seats)`, color: 'black',
                            position: 'topRight', padding: 5,
                            // fontWeight: 'bold', fontSize: 16
                            fontWeight: 'bold', fontSize: 16, fontFamily: 'LatoMedium'
                        }
                    }
                ]
            }
        ],
        legend: {
            enabled: false // Disables the color legend
        }
    };

    return optionsBar;
}
