"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../streams/stream");
class Process {
    constructor({ head = undefined, tail = undefined } = {}, { recv = undefined } = {}) {
        console.log(arguments);
        this.arguments = arguments[0];
    }
    /**
     *
     * @param s
     *
     * A Process<I,O> driver for a stream
     */
    apply(s) {
        console.log(this.constructor.name);
        switch (this.constructor.name) {
            case 'Halt':
                console.log("from halt: ", s.h());
                return stream_1.Stream.empty();
            case 'Emit':
                console.log("from emit: ", s.t());
                return stream_1.Stream.cons(() => this.arguments.head, () => this.arguments.tail.apply(s));
            case 'Await':
                if (s) {
                    console.log("stream head: ", s.h());
                    console.log("stream tail: ", s.t());
                    return (this.arguments.recv(s.h())).apply(s.t());
                }
                return undefined;
        }
    }
    static liftOne(f) {
        return new Await({ recv: ((a) => {
                if (a) {
                    return new Emit(f(a));
                }
                return new Halt();
            })
        });
    }
}
exports.Process = Process;
class Halt extends Process {
    constructor() {
        super(...arguments);
    }
}
exports.Halt = Halt;
class Emit extends Process {
    constructor(head, // head: O
        { tail = new Halt() } = {} // tail: Process<I,O>
    ) {
        console.log(head);
        super({ head: head, tail: tail });
    }
}
exports.Emit = Emit;
class Await extends Process {
    constructor({ recv } // recv: I => Process<I,O>
    ) {
        super({ recv: recv });
    }
}
exports.Await = Await;
