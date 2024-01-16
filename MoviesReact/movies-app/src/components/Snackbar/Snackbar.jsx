import { useRef } from "react";
import { SnackbarProvider as NotistackProvider, SnackbarKey } from "notistack";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
//
//
import StyledNotistack from "./styles";

// ----------------------------------------------------------------------

export default function SnackbarProvider({ children }) {
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <StyledNotistack />

      <NotistackProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        preventDuplicate
        autoHideDuration={3000}
        // TransitionComponent={isRTL ? Collapse : undefined}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // With close as default
      >
        {children}
      </NotistackProvider>
    </>
  );
}

// ----------------------------------------------------------------------
