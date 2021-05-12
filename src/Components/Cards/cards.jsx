import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "./box";
import { URL_MARGIN_GROUP, URL_FLUCTUATING_GROUP } from "../../Config/config";

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
    ["High Margin Recipes", `${URL_MARGIN_GROUP}&order=top`],
    ["Low Margin Recipes", `${URL_MARGIN_GROUP}&order=bottom`],
    ["Top Fluctuating Recipes", `${URL_FLUCTUATING_GROUP}&order=top`],
  ];

  return (
    <Grid container className={classes.cards} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing="8">
          {boxes.map((item, index) => (
            <Box
              key={index}
              classname={classes}
              value={item[0]}
              url={item[1]}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Cards;
