class FloatingPointCoprocessor {

    constructor() {
        this.reset();
    }

    reset() {
        // Registros de punto flotante de 32 bits
        this.registers = new Float32Array(2);

        // FP0 = acumulador
        // FP1 = segundo operando

        // Floating Point Status Word
        this.status = {
            zero: false,
            sign: false,
            overflow: false,
            divideByZero: false
        };
    }

    clearStatus() {
        this.status.zero = false;
        this.status.sign = false;
        this.status.overflow = false;
        this.status.divideByZero = false;
    }

    updateStatus(value) {

        this.status.zero = (value === 0);

        this.status.sign = (value < 0);

        this.status.overflow =
            !Number.isFinite(value) &&
            !this.status.divideByZero;

    }

    load(register, value) {

        if (register !== 0 && register !== 1) {
            throw new Error("Invalid floating-point register");
        }

        this.registers[register] = value;

        this.clearStatus();
        this.updateStatus(this.registers[register]);
    }

    add() {

        this.clearStatus();

        const result =
            this.registers[0] +
            this.registers[1];

        this.registers[0] = result;

        this.updateStatus(this.registers[0]);

        return this.registers[0];
    }

    subtract() {

        this.clearStatus();

        const result =
            this.registers[0] -
            this.registers[1];

        this.registers[0] = result;

        this.updateStatus(this.registers[0]);

        return this.registers[0];
    }

    multiply() {

        this.clearStatus();

        const result =
            this.registers[0] *
            this.registers[1];

        this.registers[0] = result;

        this.updateStatus(this.registers[0]);

        return this.registers[0];
    }

    divide() {

        this.clearStatus();

        if (this.registers[1] === 0) {

            this.status.divideByZero = true;

            return this.registers[0];
        }

        const result =
            this.registers[0] /
            this.registers[1];

        this.registers[0] = result;

        this.updateStatus(this.registers[0]);

        return this.registers[0];
    }

    clear() {

        this.registers[0] = 0;
        this.registers[1] = 0;

        this.clearStatus();
    }

    getFP0() {
        return this.registers[0];
    }

    getFP1() {
        return this.registers[1];
    }

    getStatusByte() {

        let value = 0;

        if (this.status.zero) {
            value |= 0x01;
        }

        if (this.status.sign) {
            value |= 0x02;
        }

        if (this.status.overflow) {
            value |= 0x04;
        }

        if (this.status.divideByZero) {
            value |= 0x08;
        }

        return value;
    }
}


if (typeof module !== 'undefined') {
    module.exports = FloatingPointCoprocessor;
}