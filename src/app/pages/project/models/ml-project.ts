export class MlProject {
}

export class mlProjectMaster {     
        ProjectName?: string 
        Address?: string 
        Description?: string
        Locations?: string
        ThumImage?: string
        Link?: string
        BrochureLink?: string
        Sqft?: number
        TotalPlots?: number
        PropertyTypeSysID?: number
        PublishBy?: string
        publishdate?: string
        StateSysID?: number
        DistrictSysID?: number
        NewProperty?: boolean      
        ContactEmailID?: string
        ContactImage?: string
        ContactMobile?: string
        ContactName?:string     
        lstAmenityMaster:mlAmenityMaster[] = [];
        lstSlideImageMaster:mlSlideImageMaster[] = [];
        lstNearByPlaceMaster:mlNearByPlace[] = [];
        lstVideoLink: Array<mlVideoLink> = []
        IsDeleted?: boolean
}

export class mlStateMaster {   
        StateSysID?:number
        StateName?: string 
}

export class mlDistrictMaster {
        DistrictSysID?: number
        DistrictName?: string
}

export class mlPropertyMaster {
        PropertyTypeSysID?: number 
        propertytype?: string
}

export class mlSlideImageMaster {
        ProjectSysID?: number 
        SlideImage?: string
        IsDeleted?: boolean  
}

export class  mlAmenityMaster{
        Amenity?: string
}

export class  mlNearByPlace{
        NearByPlace?: string
}

export class  mlVideoLink{
        VideoLink?: string
}