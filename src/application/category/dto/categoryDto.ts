interface CategoryDto {
    id : any;
    name : string;
}

export interface CategoryCreateDto extends CategoryDto { }
export interface CategoryListDto extends CategoryDto { }