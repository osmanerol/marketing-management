interface ServiceDto {
    id : any;
    name : string;
    category :  any;
    description : string;
    price : number;
}

export interface ServiceCreateDto extends ServiceDto { }
export interface ServiceListDto extends ServiceDto { }