import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    });

    component.ngOnInit();

    // expect(component.todos.length).toBeGreaterThan(0);
    // expect(component.todos.length).toBe(3);
    expect(component.todos).toBe(todos);
  });

  it('call add method', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 };
    /*
    let spy = spyOn(service, 'add').and.callFake(t => {
      return Observable.from([ todo ]);
    });
    */
    let spy = spyOn(service, 'add').and.returnValue( Observable.from([ todo ]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set message property if server returns error', () => {
    let error = 'error from the server';
    let spy = spyOn(service, 'add').and.returnValue( Observable.throw(error));

    component.add();

    expect(component.message).toBe(error);
  });
});