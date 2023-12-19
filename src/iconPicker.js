import { render, useState, useEffect } from "@wordpress/element";
import "./style.scss";
import App from "./components/app";

const el = document.getElementById("test_icon");

const newEl = document.createElement("div");
el.after(newEl);

render(<App data={el.dataset} el={el} />, newEl);
