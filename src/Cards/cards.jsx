import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "./box";

const useStyles = makeStyles((theme) => ({
  cards: {
    flexGrow: 1,
    marginBottom: 50,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

function Cards() {
  const classes = useStyles();

  const boxes = [
    "High Margin Recipes",
    "Low Margin Recipes",
    "Top Fluctuating Recipes",
  ];

  return (
    <Grid container className={classes.cards} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing="8">
          {boxes.map((value, index) => (
            <Box key={index} classname={classes} value={value} index={index} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Cards;
