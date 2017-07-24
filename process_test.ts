import {Process, Await, Emit, Halt} from './process'
import {Stream} from '../streams/stream'

function testy(i) {
    console.log(i)
    return new Emit(i);
}
function test_await(){
    // let a = new Await({
    //     recv: testy
    // })
    // console.log(Stream.fromArray(1,2,3))
    // let emitter_stream = a.apply(Stream.fromArray(1,2,3))
    // console.log(emitter_stream)
    // console.log(emitter_stream.h())
    let p = Process.liftOne(((x:number) => {return x*2}))
    console.log(p)
    let xs = p.apply(Stream.fromArray(1,2,3))
    console.log(xs.h())
}

test_await()