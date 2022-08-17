import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(() => {}, DEBOUNCE_DELAY)
);

const addList = countries => {
  const markup = countries
    .map(
      country =>
        `<li class="country-item">
            <img
             class="country-flag"
             src="${country.flags.svg}"
             alt="${country.name.official} flag"
            />${country.name.official}
        </li>`
    )
    .join('');
  countryList.innerHTML = markup;
};

const addInfo = countries => {
  const markup = countries
    .map(
      country =>
        `<div class="info-heading">
          <img
            class="info-flag"
            src="${country.flags.svg}"
            alt="${country.name.official} flag"
          />
          <h1 class="info-headline">${country.name.official}</h1>
        </div>
        <ul class="info-list">
         <li class="info-item"><b>Capital: </b>${country.calital}</li>
         <li class="info-item"><b>Population: </b>${country.population}</li>
         <li class="info-item"><b>Languages: </b>${country.languages}</li>
        </ul>`
    )
    .join('');
  countryInfo.innerHTML = markup;
};
