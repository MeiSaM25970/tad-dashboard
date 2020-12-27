import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export function PaginationC() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const changeHandler = async (event, value) => {
    await setPage(value);
  };
  return (
    <div>
      <Pagination
        count={10}
        color="secondary"
        showFirstButton
        showLastButton
        onChange={changeHandler}
        size="small"
        className="ir-r"
      />
    </div>
  );
}
