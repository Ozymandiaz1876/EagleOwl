import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useStyles from "./boxStyles";

function Box(props) {
  const [data, setData] = useState({ data: [], fetching: true });

  //fetch data and change state
  useEffect(() => {
    async function getData() {
      const res = await fetch(props.url);

      const { results } = await res.json();

      setData({ data: results, fetching: false });
    }
    getData();
  }, [props.url]);

  const classes = useStyles();

  return (
    <Grid key={props.index} item>
      <div className={classes.text}>
        <p>
          <strong>{props.value}</strong>
        </p>
      </div>
      <div className={classes.inner}>
        {data.fetching
          ? [1, 2, 3].map((item) => (
              <div className={classes.childLoading} key={item}>
                <CircularProgress />
              </div>
            ))
          : data.data.map((item, index) => (
              <div key={index} className={classes.child}>
                <p className={classes.elementText}>
                  <strong>
                    {item.name.length < 27
                      ? item.name
                      : `${item.name.slice(0, 27)}...`}
                  </strong>
                </p>
                <div className={classes.elementBar}>
                  <CircularProgressbar
                    value={item.margin || item.fluctuation}
                    text={`${item.margin || item.fluctuation}%`}
                    styles={buildStyles(
                      (item.margin || item.fluctuation) > 50
                        ? {
                            pathColor: "#0F933A",
                            textColor: "#0F933A",
                          }
                        : {
                            pathColor: "#E41010",
                            textColor: "#E41010",
                          }
                    )}
                  />
                </div>
              </div>
            ))}
      </div>
    </Grid>
  );
}

export default Box;
