export interface CustomerDto{
    id : any;
    firstname : string;
    lastname : string;
    phone : string;
    email : string;
    address : string;
    identity : string;
}

export interface CustomerCreateDto extends CustomerDto { }
export interface CustomerListDto extends CustomerDto { }