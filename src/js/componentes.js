import { Todo } from "../classes";
import {todoList} from "../index";

//Referencias en el HTML
const divTodoList      = document.querySelector('.todo-list');
const txtInput         = document.querySelector('.new-todo');
const btnBorrar        = document.querySelector('.clear-completed');
const ulFiltros        = document.querySelector('.filters');
const anchorFiltros    = document.querySelectorAll('.filtro');


export const crearTodoHtml = (todo) => {
    const todoHtml = `
    <li class="${(todo.completado)? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''} >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div     = document.createElement('div');
    div.innerHTML = todoHtml;

    divTodoList.append (div.firstElementChild);

    return div.firstElementChild;
};

txtInput.addEventListener('keyup',(event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo (nuevoTodo); 
        // console.log(todoList);

        crearTodoHtml (nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event)=>{

    const elemento     = event.target.localName;
    const toDoElemento = event.target.parentElement.parentElement;
    const toDoId       = toDoElemento.getAttribute('data-id');

    if ( elemento.includes('input')){
        todoList.marcarCompletado(toDoId);
        toDoElemento.classList.toggle('completed');

    }else if (elemento.includes('button')){
        
       todoList.eliminarTodo(toDoId); 
       divTodoList.removeChild(toDoElemento);
    };

    
});

btnBorrar.addEventListener('click', ()=>{

    todoList.eliminarCompletado();

    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        
        const elemento = divTodoList.children[i];
        
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }
});

ulFiltros.addEventListener('click', (event) => {
    
    const filtro = event.target.text;
    if ( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
    
        switch ( filtro ){

            case 'Pendientes':        
                if ( completado ){
                    elemento.classList.add('hidden');
                }            
            break;

            case 'Completados':        
                if ( !completado ){
                    elemento.classList.add('hidden');
                }            
            break;
        }
    }
});