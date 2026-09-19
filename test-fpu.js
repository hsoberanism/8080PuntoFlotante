const FloatingPointCoprocessor =
    require('./fpu.js');

const fpu =
    new FloatingPointCoprocessor();

fpu.load(0, 1.5);
fpu.load(1, 52.25);

console.log("FP0 =", fpu.getFP0());
console.log("FP1 =", fpu.getFP1());

fpu.subtract();

console.log("Resultado =", fpu.getFP0());
console.log(
    "FPSW =",
    fpu.getStatusByte().toString(16).toUpperCase()
);