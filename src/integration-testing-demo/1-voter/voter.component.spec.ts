import { VoterComponent } from './voter.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('VoterComponent', () => {
  let mycomponent: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });

    fixture = TestBed.createComponent(VoterComponent);
    mycomponent = fixture.componentInstance;
    // fixture.nativeElement;
    // fixture.debugElement;
  });

  it('should render total votes', () => {
    mycomponent.othersVote = 20;
    mycomponent.myVote = 1;
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(21);
  });

  it('should highlight the upvote button', () => {
    mycomponent.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon'));

    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase totalvotes when I clicked upvote button', () => {
    
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(mycomponent.totalVotes).toBe(1);
  });
});
