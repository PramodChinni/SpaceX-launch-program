export class ButtonModel {
    public val:string;
    public isSelected: boolean;
    constructor(){}
}

export class FilterReqModel {
    public launch_year:string;
    public launch_success: boolean;
    public land_success: boolean;
    constructor(){}
}

export class CacheIndexModel{
    public yearIndex: number;
    public launchIndex: number;
    public landingIndex: number;
    constructor(){}
}