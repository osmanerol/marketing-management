interface SalesDto{
    id : any;
    customerId : string;
    date : any;
    totalPrice : any;
}

export interface SalesCreateDto extends SalesDto { }
export interface SalesListDto extends SalesDto { }