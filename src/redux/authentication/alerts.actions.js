import { ALERT_CLEAR, ALERT_FAILURE, ALERT_SUCCESS } from "./alerts.constants";

export const alertSuccess = (message) => ({
  type: ALERT_SUCCESS,
  payload: message,
});

export const alertFailure = (message) => ({
  type: ALERT_FAILURE,
  payload: message,
});

export const clear = () => ({
  type: ALERT_CLEAR,
});
