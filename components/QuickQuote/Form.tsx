import { DashboardCard } from "@/components/Dashboard/Card";
import { CountryAirportsList } from "@/utils/CountryAirportsList";
import { FastForwardOutlined } from "@mui/icons-material";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { useState } from "react";

export type QuickQuoteFormInput = {
  origin: string | null;
  destination: string | null;
  departDate: string | null;
  returnDate: string | null;
  adults: string;
  transportation: string;
  name: string;
  email: string;
};

export function QuickQuoteForm() {
  const [quickQuoteFormInput, setQuickQuoteFormInput] =
    useState<QuickQuoteFormInput>({
      origin: null,
      destination: null,
      departDate: null,
      returnDate: null,
      adults: "1",
      transportation: "",
      name: "",
      email: "",
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setQuickQuoteFormInput({ ...quickQuoteFormInput, [name]: value });
  };

  const handleCustomInputChange = (
    element: keyof QuickQuoteFormInput,
    newValue: string | null
  ) => {
    setQuickQuoteFormInput({
      ...quickQuoteFormInput,
      [element]: newValue,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post("/api/quotes", quickQuoteFormInput)
      .then((res) => {
        setQuickQuoteFormInput({
          origin: null,
          destination: null,
          departDate: null,
          returnDate: null,
          adults: "1",
          transportation: "",
          name: "",
          email: "",
        });
      })
      .catch((err) => {
        // TODO: Handle error feedback
        console.log(err);
      });
  };

  return (
    <DashboardCard
      header={{
        avatar: <FastForwardOutlined sx={{ fontSize: 35 }} color="secondary" />,
        text: "Quick Quote",
      }}
      content={
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="row" justifyContent="center">
            <Grid item xs={12} md={6}>
              <TextField
                required
                variant="filled"
                fullWidth
                label="Name"
                name="name"
                value={quickQuoteFormInput.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                variant="filled"
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={quickQuoteFormInput.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                options={CountryAirportsList}
                onChange={(_, newValue) => {
                  handleCustomInputChange("origin", newValue);
                }}
                value={quickQuoteFormInput.origin}
                getOptionDisabled={(option) =>
                  option === quickQuoteFormInput.destination
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    required
                    fullWidth
                    label="Origin"
                    name="origin"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                options={CountryAirportsList}
                onChange={(_, newValue) => {
                  handleCustomInputChange("destination", newValue);
                }}
                value={quickQuoteFormInput.destination}
                getOptionDisabled={(option) =>
                  option === quickQuoteFormInput.origin
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    required
                    fullWidth
                    label="Destination"
                    name="destination"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Depart Date"
                  value={quickQuoteFormInput.departDate}
                  disablePast
                  onChange={(newValue) => {
                    handleCustomInputChange("departDate", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="filled"
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Return Date"
                  value={
                    quickQuoteFormInput.returnDate === null
                      ? quickQuoteFormInput.departDate
                        ? quickQuoteFormInput.departDate
                        : quickQuoteFormInput.returnDate
                      : quickQuoteFormInput.returnDate
                  }
                  minDate={
                    quickQuoteFormInput.departDate
                      ? quickQuoteFormInput.departDate
                      : new Date().toLocaleDateString()
                  }
                  onChange={(newValue) => {
                    handleCustomInputChange("returnDate", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      variant="filled"
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                variant="filled"
                fullWidth
                label="Adults"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                name="adults"
                value={quickQuoteFormInput.adults}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="filled"
                fullWidth
                label="Transportation"
                name="transportation"
                value={quickQuoteFormInput.transportation}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ borderRadius: 30, height: 50 }}
              >
                <Typography
                  color="white"
                  variant="subtitle2"
                  component="span"
                  fontSize={20}
                  fontWeight={600}
                  textTransform="none"
                >
                  Create a quote
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      }
    />
  );
}
