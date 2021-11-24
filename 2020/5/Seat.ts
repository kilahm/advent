
export class Seat {
    private static readonly rows = 128;
    private static readonly columns = 8;
    private static readonly codePattern = /(?<rowcode>[FB]{7})(?<colcode>[RL]{3})/

    readonly row: number;
    readonly column: number;
    readonly id: number;
    constructor(readonly code: string) {
        const codeResult = Seat.codePattern.exec(code);
        if(codeResult === null) {
            throw new Error(`Invalid seat code: ${code}`);
        }
        const {rowcode, colcode} = codeResult.groups || {};
        if(typeof rowcode !== 'string' || typeof colcode !== 'string') {
            throw new Error(`Invalid seat code: ${code}`);
        }
        this.row = Seat.determineRow(rowcode);
        this.column = Seat.determineCol(colcode);
        this.id = (this.row * 8) + this.column;
    }

    static determineRow(rowCode: string): number {
        let max = Seat.rows - 1;
        let min = 0;
        rowCode.split('').forEach(c => {
            const diff = max - min;
            if(c === 'F') {
                max = min + Math.floor(diff / 2)
            } else {
                min = min + Math.ceil(diff / 2)
            }
        });
        if(min !== max) {
            throw new Error(`Unable to determine row from ${rowCode}`);
        }
        return max;
    }

    static determineCol(colCode: string): number {
        let max = Seat.columns - 1;
        let min = 0;
        colCode.split('').forEach(c => {
            const diff = max - min;
            if(c === 'L') {
                max = min + Math.floor(diff / 2)
            } else {
                min = min + Math.ceil(diff / 2)
            }
        });
        if(min !== max) {
            throw new Error(`Unable to determine columnfrom ${colCode}`);
        }
        return max;
    }


}