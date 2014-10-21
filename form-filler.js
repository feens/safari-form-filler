function fillForm(e){
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
          safari.self.tab.dispatchMessage("getDataForType", {type:"email", inputName: inputs[i].name});
        }
      }
    }

  } else if(e.name == 'fillFormInput') {
    el = document.getElementsByName(e.message.inputName)[0];
    el.value = e.message.value;
  }

}
// alert('auto test');
if (window === window.top) {
  safari.self.addEventListener("message", fillForm, false);
}
