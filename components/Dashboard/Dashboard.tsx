import { mainListItems, secondaryListItems } from "@/components/ListItems";
import { QuickQuoteForm } from "@/components/QuickQuote/Form";
import { QuickQuoteList } from "@/components/QuickQuote/List";
import {
  AccountCircleRounded,
  ChatBubble,
  SearchOutlined,
  Settings,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationIcon from "@mui/icons-material/Notifications";
import { InputAdornment, TextField } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth: number = 200;

const icons = [
  <NotificationIcon key={1} />,
  <ChatBubble key={2} />,
  <Settings key={3} />,
  <AccountCircleRounded key={4} />,
];

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: theme.palette.grey[300],
  },
}));

const SideBarList = styled(List)(({ theme }) => ({
  "& *": {
    color: theme.palette.primary.main,
  },
  "& .MuiListItemButton-root": {
    marginBottom: "1rem",
    alignItems: "center",
    "& .MuiListItemIcon-root": {
      justifyContent: "center",
      minWidth: "3rem",
    },
  },
}));

function DashboardContent() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            size="large"
            sx={{
              marginRight: "16px",
            }}
          >
            <DashboardIcon sx={{ width: "2.5rem", height: "2.5rem" }} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Wet Bat
          </Typography>
          <TextField
            hiddenLabel
            size="small"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "30rem",
              div: {
                borderRadius: "10px",
                maxHeight: "2rem",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ml: 1,
            }}
          >
            {icons.map((icon, index) => (
              <IconButton
                color="inherit"
                key={index}
                size="small"
                sx={{ ml: 2 }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open>
        <Toolbar
          sx={{
            display: "flex",
          }}
        ></Toolbar>
        <SideBarList>
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </SideBarList>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <QuickQuoteForm />
            </Grid>
            <Grid item xs={12} md={5}>
              <QuickQuoteList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export function Dashboard() {
  return <DashboardContent />;
}
