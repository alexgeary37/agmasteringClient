import { Fragment } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function ProjectInfoForm({
  formData,
  formErrors,
  handleChange,
  handleBack,
  handleNext,
}) {
  return (
    <Fragment>
      <Box component="form" sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="projectTitle"
              label="Project title"
              value={formData.projectTitle}
              onChange={handleChange}
              margin="normal"
              fullWidth
              error={formErrors.projectTitle !== ""}
              helperText={formErrors.projectTitle}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Project type</InputLabel>
              <Select
                name="projectType"
                value={formData.projectType}
                label="Project type"
                onChange={handleChange}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="ep">EP</MenuItem>
                <MenuItem value="album">Album</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="numberSongs"
              label="How many songs do you want mixed/mastered?"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={formData.numberSongs}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={
                <Checkbox
                  checked={formData.alternateMixes}
                  name="alternateMixes"
                  onChange={handleChange}
                />
              }
              label="Yes I want alternate mixes"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="songTitles"
              label="List song titles in order:"
              value={formData.songTitles}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              error={formErrors.songTitles !== ""}
              helperText={formErrors.songTitles}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="referenceTrack"
              label="Link to a reference track"
              placeholder="Paste a Spotify or YouTube link here..."
              value={formData.referenceTrack}
              onChange={handleChange}
              fullWidth
              error={formErrors.referenceTrack !== ""}
              helperText={formErrors.referenceTrack}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              name="referenceReason"
              label="What do you like about this reference track?"
              value={formData.referenceReason}
              onChange={handleChange}
              fullWidth
              error={formErrors.referenceReason !== ""}
              helperText={formErrors.referenceReason}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              name="additionalNotes"
              label="Additional notes"
              value={formData.additionalNotes}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              required
              error={formErrors.foundMe !== ""}
              sx={{ mt: 3 }}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">How did you find me?</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "website"}
                      onChange={handleChange}
                      name="website"
                    />
                  }
                  label="My website"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "instagram"}
                      onChange={handleChange}
                      name="instagram"
                    />
                  }
                  label="Instagram"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "facebook"}
                      onChange={handleChange}
                      name="facebook"
                    />
                  }
                  label="Facebook"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "spotify"}
                      onChange={handleChange}
                      name="spotify"
                    />
                  }
                  label="Spotify"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "referral"}
                      onChange={handleChange}
                      name="referral"
                    />
                  }
                  label="Referral"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "soundBetter"}
                      onChange={handleChange}
                      name="soundBetter"
                    />
                  }
                  label="SoundBetter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.foundMe === "other"}
                      onChange={handleChange}
                      name="other"
                    />
                  }
                  label="Other"
                />
              </FormGroup>
            </FormControl>
            {formData.foundMe === "other" && (
              <TextField
                name="foundMeOther"
                label="How you found me"
                value={formData.foundMeOther}
                onChange={handleChange}
                fullWidth
                error={formErrors.foundMeOther !== ""}
                helperText={formErrors.foundMeOther}
              />
            )}
            {formErrors.foundMe !== "" && (
              <Typography
                variant="body2"
                color="error"
                style={{ marginTop: 4, fontSize: "0.75rem" }}
              >
                {formErrors.foundMe}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
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
