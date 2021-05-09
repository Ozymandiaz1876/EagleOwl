import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles, withStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(245,249,252)",
    color: "rgb(162,177,253)",
  },
  selected: {
    backgroundColor: theme.palette.common.white,
    color: "rgb(162,179,191)",
  },
}));

export const StyledToggleButton = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButton);
