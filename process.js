"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../streams/stream");
class Process {
    constructor() {
        this.arguments = arguments;
    }
    apply(s) {
        switch (this.constructor.name) {
            case 'Halt':
                return stream_1.Stream.empty();
            case 'Emit':
                console.log(this.arguments);
        }
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
    constructor({ head = undefined } = {}, { tail = new Halt() } = {}) {
        console.log(arguments);
        super(...arguments);
    }
}
exports.Emit = Emit;
