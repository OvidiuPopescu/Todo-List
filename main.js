window.addEventListener('load', () => {                                          /*metoda (add..) atasata de window care ruleaza o functie () cand fereastra este incarcata ('load') */
  todos = JSON.parse(localStorage.getItem('todos')) || [];                       /*todos = variabila globala (nu are var sau let);  In localStorage sunt stocate key si values ca string, asa ca getItem produce un string ce trebuie transformat in Javascript prin JSON.parsee; acest rezultat va fi stocat in variabila globala; sau (||) este un array gol; */
  const nameInput = document.querySelector('#name');                             /*declara variabila "constanta" ce va contine primul element ce are id-ul 'name' (querySelector) */
  const newTodoForm = document.querySelector('#new-todo-form');                  /*variabila ia form element-ul din html*/

  const username = localStorage.getItem('username') || '';

  nameInput.value = username;                                                    /*nameInput e intotdeuna elementul selectat, dar ce contine acesta poate fi modificat*/
  nameInput.addEventListener('change', e => {                                    /*metoda ruleaza functia cand se produce o schimbare*/
      localStorage.setItem('username', e.target.value);                          /*in localStorage 'username' este inlocuit cu noua valoare scrisa pe pagina in name slot (e.target.value - data de 'change')*/
  })                                                                             /*CONCLUZIE: pui input-ul pentru nume in o varaiabila 'nameInput', in variabila 'username' pui valoarea unei cheii 'username' din localStorage; valoarea variabilei 'nameInput' primeste valoarea variabilei 'username'; prin functie cheia 'username' primeste textul tiparit in inputul pentru nume astfel devenind o valoare persistenta;*/

  newTodoForm.addEventListener('submit', e =>{                                   /*ruleaza functia cand activezi submit event (aici apsarea unui submit input) in interiorul <form> element*/
    e.preventDefault();                                                          /*?*/

    const todo = {                                                               /*JSON object*/
      content: e.target.elements.content.value,                                  /* submited form (e.target), componenta a sa (elements), mai exact input-ul din html cu name = content, valoarea din acesta (value)*/
      category: e.target.elements.category.value,
      done: false,                                                               /*nu e un todo completat*/
      createdAt: new Date().getTime()                                            /* new date() -creaza obiect cu data actuala; metoda .getTime() spune cate milisecunde au trecut de la data stocata*/
    }

    todos.push(todo);                                                            /*obiectul creat (todo) este pushed in variabila globala array (todos)*/

    localStorage.setItem('todos',JSON.stringify(todos));                         /*creaza intrare in localStorage cu cheia 'todos' si valoarea = obiectele din 'todos' transformate in string (JSON.stringify)*/

    e.target.reset();

    DisplayTodos();                                                              /*display dupa modificare*/
  })

  DisplayTodos();                                                                /*display on page load*/

})

function DisplayTodos () {
  const todoList = document.querySelector('#todo-list');                         /*variabila cu sectiunea care va afis todos*/

  todoList.innerHTML = '';                                                       /*o golim*/

  todos.forEach(todo => {                                                        /*trecem prin fiecare elemnet (todo)  din todos array*/
      const todoItem = document.createElement('div');                            /*pentru fiecare cream html elements ca exemplele nefolosite din index.html; */
      todoItem.classList.add('todo-item')                                        /*div-ul ce contine todo items (componente: label-ul cu checkbox, div-ul cu text-ul sarcinii, div-ul cu actiunile de modificare)*/
                                                                                 /*elementului html ii adaugam clasa corespunzatoare din css*/
      const label = document.createElement('label');                             /*contine bifarea sarcinii*/
      const input = document.createElement('input');                             /*checkbox-ul din label*/
      const span = document.createElement('span');                               /*bula ce ia locul checkbox in label*/
      const content = document.createElement('div');                             /*div-ul ce contine input-ul cu textul sarcinii*/
      const actions = document.createElement('div');                             /*div-ul ce contine cele 2 butoane*/
      const edit = document.createElement('button');                             /*butoul de edit*/
      const deleteButton = document.createElement('button');                     /*butonul de delete*/

      input.type = 'checkbox';                                                   /*echivalent cu type="checkbox"*/
      input.checked = todo.done;                                                 /*cand lista e construita daca .done e true elementul va aparea ca checked*/
      span.classList.add('bubble');

      if (todo.category == 'personal') {                                         /*adauga clasa potrivita categoriei selectate cand a fost creat obiectul todo*/
        span.classList.add('personal');
      } else {
        span.classList.add('bussines');
      }

      content.classList.add('todo-content');
      actions.classList.add('actions');
      edit.classList.add('edit');
      deleteButton.classList.add('delete');

      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; /*vrei un string care sa arate continutul var todo pentru a-l trece in html, parametrul trebuie trecut in ${} si intreg strigul in `` pentru a citi parametrul (sa nu-l ia ca string); textu-ul original + rezultatul parametrului = string-ul trecut in html */
      edit.innerHTML = 'Edit';
      deleteButton.innerHTML = 'Delete';

      todoList.appendChild(todoItem);                                            /*cine contine pe cine in html*/

      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      label.appendChild(input);
      label.appendChild(span);

      actions.appendChild(edit);
      actions.appendChild(deleteButton);

      if (todo.done) {                                                           /*daca .done e true*/
        todoItem.classList.add('done');                                          /*elementul priemeste clasa .done si apare si ca greyed-out pe langa checked*/
      }

      input.addEventListener('click', e =>{                                      /*cand input e apasat*/
          todo.done = e.target.checked;                                          /*.done devine fasle sau true corepunzator cu unchecked si checked*/
          localStorage.setItem('todos', JSON.stringify(todos));                  /*todo-ul cu pricina este trecut in local storge cu .done false sau true*/

          if (todo.done){                                                        /*adds class when input is checked manually*/
            todoItem.classList.add('done');
          } else {                                                               /*daca e unchecked remove class*/
            todoItem.classList.remove('done');
          }

          DisplayTodos();                                                        /*display in urma schimbarii, nu pare sa aiba rost*/
      })

      edit.addEventListener('click', e => {                                      /*cand edit button e clicked*/
        const input = content.querySelector('input');                            /*punem intr-o variabila input-ul din content*/
        input.removeAttribute('readonly');                                       /*eliminam atributul 'readonly' => editabil*/
        input.focus();                                                           /*ca sa apara text editor bar prin selectia automata a input field*/
        input.addEventListener('blur', e => {                                    /*blur event = cand apesi in afara input field*/
          input.setAttribute('readonly', true);                                  /*input devine din nou readonly*/
          todo.content = e.target.value;                                         /*content key a todo object ia valoarea editata*/
          localStorage.setItem('todos', JSON.stringify(todos));                  /*si il punem in local storage cu cu aceasta valoare editata*/
          DisplayTodos();
        })
      })

      deleteButton.addEventListener('click', e => {                              /*cand delete button e clicked*/
        todos = todos.filter(t => t != todo);                                    /*variabila globala care este un array este trecuta printr-un filtru care ruleaza o functie; aceasta functie verifica daca fiecare element al array nu indeplineste o conditie, acea de a fi un todo; Presupun ca todo-ul clicked nu mai este egal cu un todo petru ca are un parametru dat de apasarea butonului => excluderea sa din array */
        localStorage.setItem('todos', JSON.stringify(todos));                    /*update in local storgefara todo-ul eliminat*/
        DisplayTodos();                                                          /*e nevoie de refersh ca sa apara lista fara el imediat dupa click*/
      })
  })
}
