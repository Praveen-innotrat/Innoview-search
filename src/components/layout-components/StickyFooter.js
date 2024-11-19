import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EnquiryForm from "../EnquiryForm";

export default function StickyFooter() {
  const [openEnquiryForm, setOpenEnquiryForm] = React.useState(false);

  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        width: "100vw",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
      }}
    >
      {/* Links to Terms and Conditions, Contact Us, Privacy Policy, and Refund Policies */}
      <Typography variant="body1" fontSize="1.5rem">
        <Link href="/terms_policies" color="inherit" underline="hover">
          Terms and Conditions
        </Link>{" "}
        |{" "}
        <Link
          href="#"
          color="inherit"
          underline="hover"
          onClick={handleOpenEnquiryForm} // Open the Enquiry Form dialog
        >
          Enquiry
        </Link>{" "}
        | © Innotrat 2023
      </Typography>
      <Dialog
        open={openEnquiryForm}
        onClose={handleCloseEnquiryForm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            margin: "auto", // Center the dialog horizontally
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DialogTitle>
          Enquiry Form
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEnquiryForm}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <EnquiryForm onClose={handleCloseEnquiryForm} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseEnquiryForm} color="primary">
            Close
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
