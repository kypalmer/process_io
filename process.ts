import {Stream} from '../streams/stream';

export class Process<I,O> {
    arguments: any;

    constructor(){
        this.arguments = arguments;
    }
    apply(s: Stream<I>): any {
        switch(this.constructor.name) {
            case 'Halt':
                return Stream.empty();
            case 'Emit':
                console.log(this.arguments)
        }
    } 

}

export class Halt<I,O> extends Process<I,O> {
    constructor() {
        super(...arguments);
    }
}

export class Emit<I,O> extends Process<I,O> {
    constructor(
        {head = undefined} = {}, 
        {tail = new Halt()} = {} 
    ) {
        console.log(arguments)
        super(...arguments)
    }
}