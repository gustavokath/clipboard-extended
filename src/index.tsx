import * as React from "react";
import * as ReactDOM from "react-dom";
import { StoredCopyList } from "./components/StoredCopyList";

ReactDOM.render(
    <StoredCopyList list={[]}/>,
    document.getElementById("example")
);

