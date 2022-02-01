const src = "../schueler.json";

class ParentComponent extends HTMLElement {

  static get observedElements() {
    return [];
  }

  async download() {
    var response = await fetch(src)
    var todos = await response.json()
    console.log(todos)
    return todos;
  }

  constructor() {
    super();
    console.log('HelloComponent constructor');
    this.attachShadow({mode: 'open'});

    this.download().then(r => {
      const ul = document.createElement('ul');
      this.shadowRoot.appendChild(ul);

      for (const json of r) {
        const child = document.createElement('list-component');
        const li = document.createElement('li');

        child.setAttribute('text', `${json.firstname} ${json.lastname}`);

        child.setAttribute('detailtext',
            `${json.firstname} ${json.lastname} wohnt in ${json.wohnort} und ist ${json.age} Jahre alt \n`);

        child.setAttribute('evenMoreDetailedText',
            `${json.firstname} besucht die HTL Leonding im Zweig ${json.zweig} \n`)

        child.setAttribute('email',
            `Um ${json.firstname} zu erreichen kannst du eine Email an ${json.email} senden`)

        child.addEventListener('list-item-clicked', e => {
          console.log('list-item-clicked', e.detail.detailtext, this);
          console.log('list-item-clicked', e.detail.evenmoredetailedtext, this);
          console.log('list-item-clicked', e.detail.email, this);
          document.getElementById('main').innerText = `${e.detail.detailtext}`;
          document.getElementById('main').innerText += `${e.detail.evenmoredetailedtext}`;
          document.getElementById('main').innerText += `${e.detail.email}`;
        });

        li.appendChild(child);
        ul.appendChild(li);
      }
    })
  }

}

customElements.define('parent-component', ParentComponent);
