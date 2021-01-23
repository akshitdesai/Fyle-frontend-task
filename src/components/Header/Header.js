import { AppBar, Toolbar, Typography, makeStyles, IconButton } from "@material-ui/core";
import { GitHub } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#282c34",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "wheat",
    margin: "auto",
  },
  Menu: {
      margin: "auto",
  }
}));

export default function Header() {
  const { header, logo, Menu } = useStyles();

  return (
    <header>
      <AppBar className={header}>
        <Toolbar>
            <Typography variant="h6" component="h1" className={logo}>
                Fyle - Banks In India 🇮🇳
            </Typography>
            <div className={Menu}>
                <IconButton href="https://github.com/codestromer" target="_blank"color="secondary">
                    <GitHub style={{ color: "wheat" }} />
                </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}