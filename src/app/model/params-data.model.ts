export class ParamsData {
    public name: string;
    public key: string;

    constructor( name: string, key: string = ""){
        this.name = name;
       
        if ( key != "" && key != name ){
            this.key = key;
        }
        else
        {
            this.key = this.name;
        }
    }
}
