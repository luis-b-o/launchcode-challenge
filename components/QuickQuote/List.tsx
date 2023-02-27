import { DashboardCard } from "@/components/Dashboard/Card";
import { Restore } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";

export type Quote = {
  id: string;
  name: string;
  destination: string;
  price: number;
};

export function QuickQuoteList() {
  const [quoteList, setQuoteList] = useState<Quote[]>([]);

  useEffect(() => {
    axios
      .get("/api/quotes", {
        params: {
          limit: 9,
        },
      })
      .then((res) => {
        // TODO: Handle error feedback
        const { quotes }: { quotes: Quote[] } = res.data;

        console.log(quotes);
        setQuoteList([...quotes]);
      })
      .catch((err) => {
        // TODO: Handle error feedback
        console.log(err);
      });
  }, []);

  return (
    <DashboardCard
      header={{
        avatar: <Restore sx={{ fontSize: 30 }} color="secondary" />,
        text: "Pending quotes",
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
                    {new Intl.NumberFormat("en-CA", {
                      style: "currency",
                      currency: "CAD",
                    }).format(quote.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    />
  );
}
