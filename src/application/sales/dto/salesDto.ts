interface SalesDto{
    id : any;
    customerId : string;
    date : any;
    totalPrice : number;
}

export interface SalesCreateDto extends SalesDto { }
export interface SalesListDto extends SalesDto { }