import { OpenInFull } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

export type DashboardCardProps = {
  header: {
    text: string;
    avatar: JSX.Element;
    openInFull?: boolean;
  };
  content: JSX.Element;
};

export function DashboardCard({ header, content }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader
        action={
          header.openInFull && (
            <IconButton aria-label="expand">
              <OpenInFull
                sx={(theme) => ({
                  color: theme.palette.grey[400],
                })}
              />
            </IconButton>
          )
        }
        title={
          <Typography
            variant="h6"
            sx={(theme) => ({
              color: theme.palette.grey[600],
              fontWeight: 400,
            })}
          >
            {header.text}
          </Typography>
        }
        avatar={header.avatar || <></>}
      />

      <Divider />
      <CardContent>{content}</CardContent>
    </Card>
  );
}
