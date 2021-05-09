import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles, withStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(245,249,252)",
    color: "rgb(162,177,253)",
  },
  selected: {
    backgroundColor: theme.palette.common.white,
    color: "rgb(162,179,191)",
  },
}));

const StyledToggleButton = withStyles((theme) => ({
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

export default function Buttons(props) {
  const [selectedBtn, setSelectedBtn] = React.useState([
    true,
    false,
    false,
    false,
  ]);
  const classes = useStyles();

  function urlGenerator(value) {
    switch (value) {
      case "incorrect":
        return "&is_incorrect='true'";
      case "untagged":
        return "&is_untagged='true'";
      case "disabled":
        return "&id_disabled='true'";
      default:
        return "";
    }
  }

  function handleChange(e) {
    if (!e.target.closest(".MuiToggleButton-root")) return;
    let btns = [false, false, false, false];
    btns[e.target.closest(".MuiToggleButton-root").id] = true;
    setSelectedBtn(btns);
    const value = e.target.closest(".MuiToggleButton-root").value;
    const url = urlGenerator(value);
    props.click(url);
  }

  const data = ["All recipes", "incorrect", "untagged", "disabled"];
  return data.map((button, index) => (
    <StyledToggleButton
      value={button}
      id={index}
      key={index}
      selected={selectedBtn[index]}
      onChange={handleChange}
      thumbSwitchedStyle={{ backgroundColor: "red" }}
      className={selectedBtn[index] && classes.selected}
    >
      <span>{button}</span>
    </StyledToggleButton>
  ));
}
