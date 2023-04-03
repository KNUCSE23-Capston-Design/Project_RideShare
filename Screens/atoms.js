import { atom } from "recoil";

export const isLoggedInState = atom({
    key: "isLoggedInState",
    default: false,
});
export const showOtherComponentState = atom({
    key: "showOtherComponentState",
    default: false,
});
export const isMapLoadingState = atom({
    key: "isMapLoadingState",
    default: false,
});
export const getLocationState = atom({
    key: "getLocationState",
    default: {
        latitude: null,
        longitude: null,
    },
});
export const taxiDataState = atom({
    key: "taxiDataState",
    default: [],
});
export const carpoolDataState = atom({
    key: "carpoolDataState",
    default: [],
});
