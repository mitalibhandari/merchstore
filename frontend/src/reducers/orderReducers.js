import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_CREATE_RESET,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                laoding: true,
            };

        case ORDER_CREATE_SUCCESS:
            return {
                laoding: false,
                success: true,
                order: action.payload,
            };

        case ORDER_CREATE_FAIL:
            return {
                laoding: false,
                error: action.payload,
            };
        
        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};


export const orderDetailsReducer = (state = {loading:true, orderItems:[], shippingAddress:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                laoding: true,
            };

        case ORDER_DETAILS_SUCCESS:
            return {
                laoding: false,
                order: action.payload,
            };

        case ORDER_DETAILS_FAIL:
            return {
                laoding: false,
                error: action.payload,
            };
        
        default:
            return state;
    }
};
