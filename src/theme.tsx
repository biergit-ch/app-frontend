import amber from "@material-ui/core/colors/amber";
import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: amber[300],
            main: amber[500],
            dark: amber[700],
        },
        secondary: {
            light: red[300],
            main: red[500],
            dark: red[700],
        },
    },
});

export default theme;
