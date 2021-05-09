import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { URL_MARGIN_GROUP, URL_FLUCTUATING_GROUP } from "../Config/config";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  inner: {
    height: 140,
    width: 450,
    boxShadow: "0 3px 5px 2px rgba(191, 191, 191, .7)",
    background: "#FEFEFE",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 450,
    height: 50,
    background: "#F5F4F9",
    boxShadow: "0 3px 5px 2px rgba(191, 191, 191, .7)",
    color: "#9BA3A9",
  },
  child: {
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    marginLeft: 5,
    marginRight: 5,
    float: "left",
    width: "30%",
  },
  childLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    marginLeft: 5,
    marginRight: 5,
    float: "left",
    width: "30%",
  },
  elementText: {
    display: "flex",
    justifyContent: "center",
    height: 35,
    textAlign: "center",
    fontSize: 15,
    marginTop: 10,
    color: "#888f94",
  },
  elementBar: {
    margin: "auto",
    height: 35,
    width: 70,
    marginTop: 10,
  },
}));

function Box(props) {
  const [data, setData] = useState({ data: [], fetching: true });

  async function fetchData(url) {
    const res = await fetch(`${url}`);

    const { results } = await res.json();

    setData({ data: results, fetching: false });
  }

  props.index === 0 && fetchData(`${URL_MARGIN_GROUP}&order=top`);
  props.index === 1 && fetchData(`${URL_MARGIN_GROUP}&order=bottom`);
  props.index === 2 && fetchData(`${URL_FLUCTUATING_GROUP}&order=top`);

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
