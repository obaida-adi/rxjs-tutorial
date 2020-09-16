import { Component } from "@angular/core";
import { of, Subject, from, Observable, Subscriber } from "rxjs";
import { takeWhile, map, tap, take } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  i: number = 0;
  takeValues = true;
  myFirstObserver: any;
  mySecondObserver: any;
  mySubject: Subject<number> = new Subject<number>();
  mySubjectObserver: any;
  mySubjectObserver2: any;

  constructor() {
    this.myFirstObserver = this.getObservable().subscribe((value) => {
      console.log("First Observer - Subscription Log: " + value);
    });

    this.mySecondObserver = this.getObservable().subscribe((value) => {
      console.log("Second Observer - Subscription Log: " + value);
    });

    // this.mySubjectObserver = this.mySubject
    //   .pipe(
    //     take(1),
    //     takeWhile(() => this.takeValues),
    //     tap((value) => {
    //       console.log("Subject Tap Log: " + value);
    //     }),
    //     map((value) => {
    //       return value * 2;
    //     })
    //   )
    //   .subscribe((value) => {
    //     console.log("Subject Observer 1 - Subscription Log: " + value);
    //     this.mySubject.next(value + 5);
    //   });

    // this.mySubjectObserver2 = this.mySubject.subscribe((value) => {
    //   console.log("Subject Observer 2 - Subscription Log: " + value);
    // });
  }

  // Setup observables
  private getObservable(): Observable<number | number[]> {
    return new Observable<number>((subscriber) => {
      // Imagine this is some asynchronous code
      subscriber.next(1),
        subscriber.next(2),
        subscriber.next(3),
        setTimeout(() => {
          subscriber.next(4);
          subscriber.complete();
        }, 5000);
    }).pipe(
      takeWhile(() => this.takeValues),
      tap((value: number) => {
        console.log("Tap Log: " + value);
      })
    );

    /**
     * What is the difference between from() and of() in RXJS?
     *
     * from([]): prints out the array 1 by 1.
     * of([]): prints out the array in its entirety.
     *
     */

    // return from([1, 2, 3, 4]).pipe(
    //   takeWhile(() => this.takeValues),
    //   tap((value) => {
    //     console.log("Tap Log: " + value);
    //   }),
    //   map((value: number) => {
    //     return value * 2;
    //   })
    // );

    // return of([1, 2, 3, 4]).pipe(
    //   takeWhile(() => this.takeValues),
    //   tap((values) => {
    //     console.log("Tap Log: " + values);
    //   }),
    //   map((values: number[]) => {
    //     return values.concat([5, 6, 7, 8]);
    //   })
    // );
  }

  sendEvent(): void {
    this.mySubject.next(this.i);
    this.i++;
  }
}
