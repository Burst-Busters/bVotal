
declare namespace common {
    function hashId({id:string, dob:string}): string;
    function hashText(text:string): string;
}

declare module '@bvotal/common'
{
    export = common
}
