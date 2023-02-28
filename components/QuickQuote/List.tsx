import { DashboardCard } from "@/components/Dashboard/Card";
import { Restore } from "@mui/icons-material";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";

export type QuickQuote = {
  id: string;
  name: string;
  destination: string;
  amount: string;
};

export type Quote = QuickQuote & {
  email: string;
  origin: string;
  departDate: string;
  returnDate: string;
  adults: number;
  transportation?: string;
};

export function QuickQuoteList() {
  const [quoteList, setQuoteList] = useState<QuickQuote[]>([]);
  const [open, setOpen] = useState(false);
  const [quoteId, setQuoteId] = useState<string>();
  const [quoteData, setQuoteData] = useState<Quote>();
  const [quoteAmount, setQuoteAmount] = useState<string>();
  const handleOpen = (quoteId: string) => {
    setOpen(true);
    setQuoteId(quoteId);
  };
  const handleClose = () => {
    setOpen(false);
    setQuoteId(undefined);
    setQuoteData(undefined);
    setQuoteAmount(undefined);
  };

  useEffect(() => {
    if (quoteId) {
      axios
        .get(`/api/quotes/${quoteId}`)
        .then((res) => {
          const { quote }: { quote: Quote } = res.data;
          setQuoteData({
            ...quote,
            departDate: new Date(quote.departDate).toLocaleDateString(),
            returnDate: new Date(quote.returnDate).toLocaleDateString(),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [quoteId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const newValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/(\d+\.\d{2}).*/, "$1");

    setQuoteAmount(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .put(`/api/quotes/${quoteId}`, {
        amount: quoteAmount,
      })
      .then((res) => {
        setQuoteAmount(undefined);
        handleClose();
        fetchQuotes();
      })
      .catch((err) => {
        // TODO: Handle error feedback
        console.log(err);
      });
  };

  const fetchQuotes = () => {
    axios
      .get(`/api/quotes/`, {
        params: {
          limit: 9,
        },
      })
      .then((res) => {
        const { quotes }: { quotes: Quote[] } = res.data;
        setQuoteList(quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="row" justifyContent="center">
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  disabled
                  fullWidth
                  label="Name"
                  value={quoteData?.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  disabled
                  fullWidth
                  label="Email"
                  value={quoteData?.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled
                  variant="filled"
                  fullWidth
                  label="Origin"
                  name="origin"
                  value={quoteData?.origin}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  disabled
                  fullWidth
                  label="Destination"
                  name="destination"
                  value={quoteData?.destination}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={quoteData?.departDate}
                  disabled
                  label="Depart date"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={quoteData?.returnDate}
                  disabled
                  label="Return date"
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                  fullWidth
                  label="Adults"
                  disabled
                  type="number"
                  name="adults"
                  value={quoteData?.adults}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {quoteData?.transportation && (
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    fullWidth
                    label="Transportation"
                    name="transportation"
                    value={quoteData.transportation}
                  />
                )}
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={quoteAmount}
                  label="Price"
                  variant="filled"
                  placeholder="120000.00"
                  fullWidth
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
                    Send price
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <DashboardCard
        header={{
          avatar: <Restore sx={{ fontSize: 30 }} color="secondary" />,
          text: "Pending quotes",
          reloadContent: fetchQuotes,
        }}
        content={
          <TableContainer
            component={Paper}
            sx={(theme) => {
              return {
                "& *": {
                  color: theme.palette.grey[700],
                  fontSize: "0.6rem",
                },
              };
            }}
          >
            <Table
              sx={{ "td, th": { border: "none" } }}
              size="small"
              aria-label="simple table"
            >
              <TableHead
                sx={{
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                <TableRow>
                  <TableCell>ID#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quoteList.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell>{quote.id}</TableCell>
                    <TableCell>{quote.name}</TableCell>
                    <TableCell>{quote.destination}</TableCell>
                    <TableCell>
                      {quote.amount ? (
                        new Intl.NumberFormat("en-CA", {
                          style: "currency",
                          currency: "CAD",
                        }).format(Number(quote.amount))
                      ) : (
                        <Button
                          onClick={() => {
                            handleOpen(quote.id);
                          }}
                          variant="outlined"
                          size="small"
                        >
                          Quote
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
    </>
  );
}
