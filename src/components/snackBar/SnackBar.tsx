import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useApp } from "../../context/appContext";

export interface State extends SnackbarOrigin {
  open: boolean;
}

type Props = {
  alert: string | null;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ alert }: Props) {
  const { alertMessage, closeAlert } = useApp();

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    closeAlert();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={alertMessage ? true : false}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={6000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
  );
}
