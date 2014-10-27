var settings = {};

function handleMessage(e){
  if (e.name == 'fillForm') {
    var firstName = /first(.*)name/
    var lastName = /last(.*)name/
    var email = /email/
    var city = /city/
    var province = /province/
    var state = /state/
    var country = /country/
    var address = /address/
    var phone = /phone/
    var password = /password/


    var inputs = document.getElementsByTagName("input");

    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].value == ""){
        if(inputs[i].name.match(firstName)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"first", inputName: inputs[i].name});
        }else if(inputs[i].name.match(lastName)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"last", inputName: inputs[i].name});
        }else if(inputs[i].name.match(city)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"city", inputName: inputs[i].name});
        }else if(inputs[i].name.match(province)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"province", inputName: inputs[i].name});
        }else if(inputs[i].name.match(country)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"country", inputName: inputs[i].name});
        }else if(inputs[i].name.match(address)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"address", inputName: inputs[i].name});
        }else if(inputs[i].name.match(phone)) {
          safari.self.tab.dispatchMessage("getDataForType", {type:"phone", inputName: inputs[i].name});
        }else if(inputs[i].name.match(email)){
          safari.self.tab.dispatchMessage("getDataForType", {type:"email", inputName: inputs[i].name, options: {domain: settings.email_domain, prefix: settings.email_prefix}});
        }else if(inputs[i].name.match(password)){
          inputs[i].value = settings.default_password;
        }
      }
    }

    var selects = document.getElementsByTagName("select");

    for(var i = 0; i < selects.length; i++) {
      console.log(selects[i].name);
      if(selects[i].value == 0 || selects[i].value == ''){
        var random = Math.floor(Math.random() * (selects[i].options.length-2)) + 1;
        selects[i].value = selects[i].options[random].value;
        // selects[i].onchange();
        console.log(random);
        console.log(selects[i].options[random].value);
      }

    }

  } else if(e.name == 'fillFormInput') {
    var el = document.getElementsByName(e.message.inputName)[0];
    var value = e.message.value;
    if(typeof(e.message.options.prefix) != 'undefined') value = e.message.options.prefix + value;
    el.value = value;
  } else if(e.name == 'updateSettings') {
    settings = e.message;
  }

}
// alert('auto test');
if (window === window.top) {
  safari.self.addEventListener("message", handleMessage, false);
  safari.self.tab.dispatchMessage("getSettings");
}
