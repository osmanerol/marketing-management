interface SalesDto{
    id : any;
    date : any;
    totalPrice : number;
    saleItems : any;
}

export interface SalesCreateDto extends SalesDto { }
export interface SalesListDto extends SalesDto { }