import {Stream} from '../streams/stream';

export class Process<I,O> {
    arguments: any;

    constructor(
        { head = undefined, tail = undefined}: {head?: O, tail?: Process<I,O>} ={},
        {recv = undefined}: {recv?: any}= {}
    ){
        console.log(arguments)
        this.arguments = arguments[0];
    }

    /**
     * 
     * @param s 
     * 
     * A Process<I,O> driver for a stream
     */
    apply(s: Stream<I>): any {
        console.log(this.constructor.name)
        switch(this.constructor.name) {
            case 'Halt':
                console.log("from halt: ", s.h())
                return Stream.empty();
            case 'Emit':
                console.log("from emit: ", s.t())
                return Stream.cons(()=> this.arguments.head, () =>this.arguments.tail.apply(s));
            case 'Await':
                if(s) { 
                    console.log("stream head: ", s.h())
                    console.log("stream tail: ", s.t())
                    return (this.arguments.recv(s.h())).apply(s.t())
                }
                return undefined
        }
    } 

    static liftOne<I,O>(f: ((i: I) => O)): Process<I,O> {
        return new Await(
            {recv: ((a: I) => {
                if(a){
                    return new Emit(f(a))
                }
                return new Halt()
            })
        })
    }

}

export class Halt<I,O> extends Process<I,O> {
    constructor() {
        super(...arguments);
    }
}

export class Emit<I,O> extends Process<I,O> {
    constructor(
        head: O, // head: O
        {tail = new Halt()} = {} // tail: Process<I,O>
    ) {
        console.log(head);
        super({head: head, tail: tail})
    }
}

export class Await<I,O> extends Process<I,O> {
    constructor(
        {recv}: {recv: any } // recv: I => Process<I,O>
    ) {
        super({recv: recv})
    }
}