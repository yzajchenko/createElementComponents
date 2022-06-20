const elements = {
  elements: [],
  id: 1,
  action(e) {
    const action = e.target.dataset.element;
    const id = +e.target.name;
    const index = this.elements.findIndex((i) => i.id === id);
    if (action === "deleted") {
      this.elements.splice(index, 1);
      this.save();
      this.listElements();
    }
  },
  readonly(e) {
    const target = e.target;
    const createBtns = document.querySelectorAll(
      ".create_elemnt__btn, .delete"
    );
    const createInput = document.querySelector(".create_elemnt__input");
    if (target.checked) {
      createBtns.forEach((i) => (i.disabled = true));
      createInput.readOnly = true;
    } else {
      createBtns.forEach((i) => (i.disabled = false));
      createInput.readOnly = false;
    }
  },
  init() {
    if ("elements" in localStorage) {
      this.elements = JSON.parse(localStorage.getItem("elements"));
    }
    const createElementBtn = document.querySelector(".create_elemnt");
    createElementBtn.addEventListener("submit", (e) => {
      this.add(e);
    });
    this.listElements();
    const disaled = document.querySelector(".disabled");
    disaled.addEventListener("click", (e) => this.readonly(e));
    const elementList = document.querySelector(".element_list");
    elementList.addEventListener("click", (e) => this.action(e));
  },
  save() {
    localStorage.setItem("elements", JSON.stringify(this.elements));
  },
  add(e) {
    e.preventDefault();
    const elemText = document.querySelector(".create_elemnt__input").value;
    if (elemText !== "") {
      const newelem = {
        value: elemText,
        id: this.id++,
      };
      this.elements.push(newelem);
      document.querySelector(".create_elemnt__input").value = "";
      this.listElements();
      this.save();
    }
  },

  listElements() {
    const elementList = document.querySelector(".element_list");
    const element = this.elements.map((item) => {
      return `<li class="element_list__item">
            <span>${item.value}</span>
            <input type="button" class="delete" value="delete" name="${item.id}" data-element="deleted"/>
        </li>`;
    });
    elementList.innerHTML = element.join("");
  },
};

elements.init();
