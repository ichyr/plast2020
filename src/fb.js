import {firebaseConfig} from "./config.js"
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

database.ref('d_bars').once('value').then(snapshot => {
  const objects = snapshot.val();

  Object.keys(objects).forEach((key, index) => {
    const { description, sum, percents } = objects[key];
    console.log(`d_sum-${index}`);
    let sumEl = document.getElementById(`d_sum-${index+1}`);
    let dscEl = document.getElementById(`d_dsc-${index+1}`);
    let barEl = document.getElementById(`d_bar-${index+1}`);

    sumEl.innerText = sum;
    dscEl.innerText = description;
    barEl.style.width = `${percents}%`;
  });
});
