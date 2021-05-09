import React, {
  useEffect,
  useReducer,
  useCallback,
  useRef,
  useState,
} from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Tables from "./table";
import Buttons from "./Buttons/buttons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { URL_RECIPES } from "../Config/config";

const useStyles = makeStyles({
  table: {
    borderRadius: 8,
    backgroundColor: "rgb(255,255,255)",
  },
  tableContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default function List() {
  const [tagUrl, changeTagUrl] = useState("");

  const classes = useStyles();

  // set default for tab switch
  useEffect(() => {
    rowDispatch({ type: "RESET" });
    pagerDispatch({ type: "RESET" });
  }, [tagUrl]);

  // get url with the tag
  const GetURL = useCallback(() => {
    return `${URL_RECIPES}${tagUrl}`;
  }, [tagUrl]);

  const listReducer = (state, action) => {
    switch (action.type) {
      case "RESET":
        return { data: [], fetching: true };
      case "STACK_ROWS":
        return { ...state, data: state.data.concat(action.data) };
      case "FETCHING_ROWS":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const pageReducer = (state, action) => {
    switch (action.type) {
      case "RESET":
        return { page: 1, fetching: true };
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1, fetching: action.fetching };
      case "FETCHING_ROWS":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };

  const [pager, pagerDispatch] = useReducer(pageReducer, {
    page: 1,
    fetching: false,
  });

  const [rowData, rowDispatch] = useReducer(listReducer, {
    data: [],
    fetching: true,
  });

  // fetch data and call dispatch
  useEffect(() => {
    async function getData() {
      try {
        const url = GetURL();
        const res = await fetch(`${url}&page=${pager.page}`);

        const { results } = await res.json();
        const data = [];

        results.map((item) =>
          data.push({
            id: item.id,
            name: item.name,
            lastUpdate: item.last_updated.date.slice(0, 10),
            cogs: `${item.cogs}%`,
            costPrice: item.cost_price.toFixed(3),
            salePrice: item.sale_price.toFixed(3),
            grossMargin: `${item.gross_margin.toFixed(3)}%`,
            tagsAction: "none",
          })
        );
        rowDispatch({ type: "STACK_ROWS", data: data });
        rowDispatch({ type: "FETCHING_ROWS", fetching: false });
        pagerDispatch({ type: "FETCHING_ROWS", fetching: false });
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [pager.page]);

  // Observer APi for loading next page recipes
  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!rowData.fetching && en.intersectionRatio > 0) {
            pagerDispatch({ type: "ADVANCE_PAGE", fetching: true });
          }
        });
      }).observe(node);
    },
    [pagerDispatch, rowData.fetching]
  );
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div>
      <div>
        <Buttons click={changeTagUrl} />
      </div>
      <div className={classes.table} component={Paper}>
        <div className={classes.tableContainer}>
          {!rowData.fetching && (
            <div>
              <Tables data={rowData.data} reference={bottomBoundaryRef} />
            </div>
          )}
          {(rowData.fetching || pager.fetching) && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
}
