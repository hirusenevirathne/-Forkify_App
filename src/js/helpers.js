import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// Time out Promice
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// AJAX call
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Send API
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url); // fetch data

    // Fetch API
    // 01) Loading recipe
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // fetch data and time out
    const data = await res.json(); // convert to json

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // throw error if not ok
    return data; // return data
  } catch (err) {
    throw err;
  }
};
/*
// Fetch API
export const getJSON = async function (url) {
  try {
    // 01) Loading recipe
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // fetch data and time out
    const data = await res.json(); // convert to json
    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // throw error if not ok
    return data; // return data
  } catch (err) {
    throw err;
  }
};

// Send API
export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // fetch data and time out
    const data = await res.json(); // convert to json

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // throw error if not ok
    return data; // return data
  } catch (err) {
    throw err;
  }
};
*/
