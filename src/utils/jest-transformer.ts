import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
})

const transformer = {
    process(src: string) {
        return src;
    }
}

module.exports = transformer;