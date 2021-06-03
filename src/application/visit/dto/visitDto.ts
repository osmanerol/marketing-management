interface VisitDto {
    customer : string,
    name : string
    date : any,
}

export interface VisitCreateDto extends VisitDto { }
export interface VisitListDto extends VisitDto { }