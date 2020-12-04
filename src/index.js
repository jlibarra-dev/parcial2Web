import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PokemonList from './PokemonList';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import { IntlProvider } from 'react-intl';

let lanData = "";
let language = "";
console.log(window.navigator.language.split("-")[0]);
if (window.navigator.language.split("-")[0] === 'es') {
  language = localeEsMessages;
  lanData = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
}
else {
  language = localeEnMessages;
  lanData = "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";
}

ReactDOM.render(
  <IntlProvider locale={window.navigator.language.split("-")[0]} messages={language}>
    <PokemonList data={lanData} />
  </IntlProvider>
  , document.getElementById("root")

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
