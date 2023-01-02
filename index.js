/**
 * Nate Chen
 * 2/11/2022
 * Section AE
 *
 * JavaScript file for my CP3 submission. Manages the fetch request and response to PokeAPI, and
 * parses the received Pokémon data to print the name and type(s) of the Pokémon.
 */

"use strict";
(function() {

  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
  window.addEventListener("load", init);

  /**
   * Initializes the page, adding functionality to the "Get Types" button.
   */
  function init() {
    qs("button").addEventListener("click", makeRequest);
  }

  /**
   * Makes a request to PokeAPI, receiving information for the Pokémon inputted.
   */
  function makeRequest() {
    let pokemon = id("pokemon").value;
    fetch(BASE_URL + pokemon.toLowerCase())
      .then(statusCheck)
      .then(res => res.json())
      .then(getTypes)
      .catch(handleError);
  }

  /**
   * Prints the type(s) of the input Pokémon to the page.
   * @param {String} res - The PokeAPI response in JSON format
   */
  function getTypes(res) {
    if (qs("#bad-request")) {
      id("types").removeChild(id("bad-request"));
    }

    // Special handling for Flabébé, the only Pokémon name with diacritical marks
    if (res.name === "flabebe") {
      id("pokemon-name").textContent = "Flabébé";
    } else {
      id("pokemon-name").textContent = capitalize(res.name);
    }

    const type1 = document.createElement("p");
    type1.setAttribute("id", "type-1");
    type1.textContent = "Primary type: " + capitalize(res.types[0].type.name);
    id("types").replaceChild(type1, id("type-1"));

    const type2 = document.createElement("p");
    type2.setAttribute("id", "type-2");
    if (res.types.length > 1) {
      type2.textContent = "Secondary type: " + capitalize(res.types[1].type.name);
    } else {
      type2.textContent = "No secondary type";
    }

    id("types").replaceChild(type2, id("type-2"));
  }

  /**
   * Capitalizes the first character of a string.
   * @param {String} str - the input string
   * @returns {String} the input string with the first character capitalized
   */
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Checks the status of the response of the fetch request to PokeAPI.
   * @param {Response} res - the fetch response status code
   * @returns {Response} the fetch response, if the response was ok
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.json());
    }
    return res;
  }

  /**
   * Error handler for failed fetch request/response, printing a message to the user on the page.
   */
  function handleError() {
    const err = document.createElement("p");
    err.setAttribute("id", "bad-request");
    err.textContent =
      "Error retrieving data, or input was malformed. Please re-enter your input or refresh " +
      "the page and try again.";
    id("types").appendChild(err);
  }

  /**
   * Provided helper function. Retrieves the HTML element with the given ID.
   * @param {String} id - the input ID
   * @returns {HTMLElement} - the element matching the input ID
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Provided helper function. Retrieves the first HTML element matching the given CSS selector.
   * @param {String} selector - the input CSS selector
   * @returns {HTMLElement} - the first element matching the input CSS selector
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();