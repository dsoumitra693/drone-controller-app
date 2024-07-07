import { COLORS } from "./theme";

export const batteryConfig = [
    {
        iconName: "battery-empty",
        color: COLORS.red,
        max: 4,
        min: 0,
    },
    {
        iconName: "battery-quarter",
        color: COLORS.red,
        max: 25,
        min: 5,
    },
    {
        iconName: "battery-half",
        color: COLORS.yellow,
        max: 50,
        min: 26,
    },
    {
        iconName: "battery-three-quarters",
        color: COLORS.green,
        max: 75,
        min: 51,
    },
    {
        iconName: "battery-full",
        color: COLORS.green,
        max: 100,
        min: 76,
    }
]

export const networkConfig = [
    {
        iconName: "signal-cellular-alt",
        color: COLORS.green,
        max: 0,
        min: -65, 
    },{
        iconName: "signal-cellular-alt-2-bar",
        color: COLORS.yellow,
        max: -66,
        min: -75,
    },{
        iconName: "signal-cellular-alt-1-bar",
        color: COLORS.red,
        max: -76,
        min: -85,
    },
    {
        iconName: "signal-cellular-alt",
        color: `${COLORS.white}60`,
        max: -86,
        min: -1000,
    }
]