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
  debounce(() => {
    let typedInput = input.value.trim();
    if (typedInput === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }
    return fetchCountries(typedInput)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
        }
        if (countries.length <= 10 && countries.length >= 2) {
          addList(countries);
          countryInfo.innerHTML = '';
        }
        if (countries.length === 1) {
          countryList.innerHTML = '';
          addInfo(countries);
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      });
  }, DEBOUNCE_DELAY)
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
            class="country-flag"
            src="${country.flags.svg}"
            alt="${country.name.official} flag"
          />
          <h1 class="info-headline">${country.name.official}</h1>
        </div>
        <ul class="info-list">
         <li class="info-item"><b>Capital: </b>${country.capital}</li>
         <li class="info-item"><b>Population: </b>${country.population}</li>
         <li class="info-item"><b>Languages: </b>${Object.values(country.languages).join(', ')}</li>
        </ul>`
        )
    .join('');
  countryInfo.innerHTML = markup;
};
