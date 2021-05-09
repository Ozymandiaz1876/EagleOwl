import React from "react";
import { useStyles, StyledToggleButton } from "./buttonsStyles";

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
