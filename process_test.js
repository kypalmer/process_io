"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("./process");
const stream_1 = require("../streams/stream");
function testy(i) {
    console.log(i);
    return new process_1.Emit(i);
}
function test_await() {
    // let a = new Await({
    //     recv: testy
    // })
    // console.log(Stream.fromArray(1,2,3))
    // let emitter_stream = a.apply(Stream.fromArray(1,2,3))
    // console.log(emitter_stream)
    // console.log(emitter_stream.h())
    let p = process_1.Process.liftOne(((x) => { return x * 2; }));
    console.log(p);
    let xs = p.apply(stream_1.Stream.fromArray(1, 2, 3));
    console.log(xs.h());
}
test_await();
