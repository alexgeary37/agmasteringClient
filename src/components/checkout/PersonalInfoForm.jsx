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
              name="artistName"
              label="Artist name"
              value={formData.artistName}
              onChange={handleChange}
              fullWidth
              autoFocus
              error={formErrors.artistName !== ""}
              helperText={formErrors.artistName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              required
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
