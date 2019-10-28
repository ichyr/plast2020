
let config = {
  apiKey: "AIzaSyALWyYaC1ErKY9yS2zT9pcbjLhpuWm3zuY",
  databaseURL: "",
  authDomain: "plast2020-b4dba.firebaseapp.com",
  projectId: "plast2020-b4dba",
  storageBucket: "plast2020-b4dba.appspot.com",
  messagingSenderId: "523106828501",
  appId: "1:523106828501:web:cd7aef6195db23f696a25c"
};


window.onload = function () {
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    config.databaseURL = document.querySelector('input').value;
    firebase.initializeApp(config)
    try {
      const database = firebase.database();
      database.ref('d_bars').once('value').then(snapshot => {
        const objects = snapshot.val();

        let my_form = document.createElement('form');
        my_form.name = 'myForm';
        my_form.className = 'mainForm';


        let str = "";

        Object.keys(objects).forEach((key, index) => {
          const { description, sum, percents } = objects[key];
          console.log(`d_sum-${index}`);
          str += "<div class='input_wrapper'>"
          str += "<div class='input_left'>"
          str += `<label for=d_sum-${index + 1}>${description}:</label>`
          str += `<input type='TEXT' id=d_sum-${index + 1} value=${sum}></input>`
          str += "</div>"
          str += "<div class='input_right'>"
          str += `<label for=d_bar-${index + 1}>Проценти:</label>`
          str += `<input type='TEXT' id=d_bar-${index + 1} value=${percents}></input>`
          str += "</div>"
          str += '</div>'
        });

        str += "<input class='mainSubmit' type='submit' value='Підтвердити'></input>"
        my_form.innerHTML = str;
        my_form.addEventListener('submit', event => {
          event.preventDefault();

          Object.keys(objects).forEach((key, index) => {
            const { description } = objects[key];
            const num = index + 1;
            const sum = this.document.getElementById(`d_sum-${index + 1}`).value;
            const percents = this.document.getElementById(`d_bar-${index + 1}`).value;
            firebase.database().ref('d_bars/d_bar-' + num).set({
              percents,
              description,
              sum
            });
          })
        })
        const formEl = this.document.getElementById('form');
        formEl.parentNode.removeChild(formEl);

        this.document.getElementById('inner_p').appendChild(my_form);

      })
    } catch (e) {
      this.alert('Данні не вірні. Спробуйте знову.')
      document.location.reload();
    }
  })
}

