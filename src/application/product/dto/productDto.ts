interface ProductDto{
    id : any;
    name : string;
    category :  any;
    description : string;
    price : number;
}

export interface ProductCreateDto extends ProductDto { }
export interface ProductListDto extends ProductDto { }