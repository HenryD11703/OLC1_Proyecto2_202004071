export default class Errores {
    private tipoError: string;
    private descripcion: string;
    private linea: number;
    private columna: number;
    
    constructor(tipoError: string, descripcion: string, linea: number, columna: number){
        this.tipoError = tipoError;
        this.descripcion = descripcion;
        this.linea = linea;
        this.columna = columna;
    }
    public getTipoError(): string {
        return this.tipoError;
    }
    public setTipoError(tipoError: string): void {
        this.tipoError = tipoError;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    public getLinea(): number {
        return this.linea;
    }
    public setLinea(linea: number): void {
        this.linea = linea;
    }
    public getColumna(): number {
        return this.columna;
    }
    public setColumna(columna: number): void {
        this.columna = columna;
    }
}