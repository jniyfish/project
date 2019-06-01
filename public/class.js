class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

  }
  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}


class AddressBook {
  constructor(containerElement) {
    this.containerElement = containerElement;
    var button = document.querySelector('#button');

    let node1 = document.createElement("button");
    let text1 = document.createTextNode("change user");
    let node2 = document.createElement("button");
    let text2 = document.createTextNode("delete");
    let node3 = document.createElement("button");
    let text3 = document.createTextNode("new friend");

    node1.classList.add('button');
    node2.classList.add('button');
    node3.classList.add('button');
    node1.appendChild(text1);
    button.appendChild(node1);
    node2.appendChild(text2);
    button.appendChild(node2);
    node3.appendChild(text3);
    button.appendChild(node3);

    node1.addEventListener("click", this.toEdit);
    node2.addEventListener("click", this.toEdit);
    node3.addEventListener("click", this.toEdit);

  }
  toEdit(event) {
    document.dispatchEvent(new CustomEvent('edit_open', { 'detail': this.textContent }));
  }
  show() {
    this.containerElement.classList.remove('inactive');
    let userAddB = document.querySelector('#user');
    let username = document.querySelector('input');
    userAddB.textContent = username.value + "'s Address Book ";
  }
  hide() {
    this.containerElement.classList.add('inactive');
  }
}

class EditMenu {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.Submit=this.Submit.bind(this);
    this.containerElement.addEventListener('submit', this.Submit);
    this.string="";
    this.times=0;

  }
  show(input) {
    this.containerElement.classList.remove('inactive');
    if (input == "delete") {
      let input = document.querySelector('#input');
      this.string="delete";
      var all_options = document.getElementById("method-input").options;
      for (var i = 0; i < all_options.length; i++) {
        if (all_options[i].id == "DELETE") {
          all_options[i].selected = true;
        }
      }
      this.Fakebox = document.createElement('input');
      this.Fakebox.setAttribute("type", "text");
      this.Fakebox.setAttribute("id", "fake");
      this.Fakebox.setAttribute("style", "border: 3px #FFAC55 solid");
      input.textContent = "Delete name : ";
      input.appendChild(this.Fakebox);
    }
    else if (input == "new friend") {
      
      this.string="new friend";
      let input = document.querySelector('#input');
      var all_options = document.getElementById("method-input").options;
      for (var i = 0; i < all_options.length; i++) {
        if (all_options[i].id == "POST") {
          all_options[i].selected = true;
        }
      }
      if(this.times==0){
      this.PostBox("owner","me");
      this.PostBox("name","GAGA");
      this.PostBox("email","LL##LL");
      this.PostBox("number","3333");
      this.times=1; 
      }     
    }
    else{
      history.go(0);
    }
  }
  

  hide() {
    this.containerElement.classList.add('inactive');
  }


  Submit(event) {
    event.preventDefault();
    let input = document.querySelector('#fake');
    let output = document.querySelector('#path-input');
    if(this.string=="delete")
    {
      var str = "/api/name/" + input.value;
    }
    else{
      var str = "/api";
    }
    console.log("submit");
    output.setAttribute("value", str);
    document.dispatchEvent(new CustomEvent('add_open'));
  }
  PostBox(input,input2)
  {
    const container = document.createElement('div');
    container.className = 'body-row';

    const key = document.createElement('input');
    key.type = 'text';
    key.className = 'key';
    key.placeholder = 'key';
  //  key.value=input;
    key.setAttribute("value",input);

    const value = document.createElement('input');
    value.type = 'text';
    value.className = 'value';
    value.placeholder = 'value';
   // value.value=input2;
    value.setAttribute("value",input2);

    container.append(key);
    container.append(' : ');
    container.append(value);
    const keysContainer = document.querySelector('#key-values');
    keysContainer.append(container);
  }

}
