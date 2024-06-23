import { Fragment, useEffect } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

export default function PersonalInfoForm({
  formData,
  formErrors,
  handleChange,
  handleBack,
  handleNext,
}) {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Fragment>
      <Box component="form" sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              autoFocus
              error={formErrors.firstName !== ""}
              helperText={formErrors.firstName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              error={formErrors.lastName !== ""}
              helperText={formErrors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="artistName"
              label="Artist name"
              value={formData.artistName}
              onChange={handleChange}
              fullWidth
              error={formErrors.artistName !== ""}
              helperText={formErrors.artistName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              // autoComplete="email"
              fullWidth
              error={formErrors.email !== ""}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="moreAboutYou"
              label="Where can I find out more about you?"
              placeholder="Spotify, YouTube or Social Media link..."
              value={formData.moreAboutYou}
              onChange={handleChange}
              // autoComplete="moreAboutYou"
              fullWidth
              error={formErrors.moreAboutYou !== ""}
              helperText={formErrors.moreAboutYou}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button disabled onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
          BACK
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          sx={{ mt: 3, ml: 1 }}
        >
          NEXT
        </Button>
      </Box>
    </Fragment>
  );
}
