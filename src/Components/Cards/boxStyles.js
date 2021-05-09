import { makeStyles } from "@material-ui/core/styles";

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

export default useStyles;
