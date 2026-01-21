interface SwaggerInterface{
    readonly title: string;
    readonly description: string;
    readonly version: string;
}

export const SwaggerConfig: SwaggerInterface = {
    title: "InotaVault",
    description: 'Platform for publishing songs',
    version: "v1"
}