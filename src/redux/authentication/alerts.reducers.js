import { ALERT_FAILURE, ALERT_SUCCESS, ALERT_CLEAR } from "./alerts.constants";

export function alertReducer(state = {}, action) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: "alert-success",
        message: action.message,
      };
    case ALERT_FAILURE:
      return {
        type: "alert-danger",
        message: action.message,
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
