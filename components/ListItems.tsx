import Link from "@/components/Link";
import { AttachMoneyRounded, HomeRounded, Support } from "@mui/icons-material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Fragment } from "react";

export const mainListItems = (
  <Fragment>
    <ListItemButton LinkComponent={Link} href="/">
      <ListItemIcon>
        <HomeRounded />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} href="/quote">
      <ListItemIcon>
        <AttachMoneyRounded />
      </ListItemIcon>
      <ListItemText primary="Quotes" />
    </ListItemButton>
  </Fragment>
);

export const secondaryListItems = (
  <Fragment>
    <ListItemButton>
      <ListItemIcon>
        <Support />
      </ListItemIcon>
      <ListItemText primary="Support" />
    </ListItemButton>
  </Fragment>
);
