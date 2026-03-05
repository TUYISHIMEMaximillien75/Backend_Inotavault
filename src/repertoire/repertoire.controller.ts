import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { RepertoireService } from './repertoire.service';

@ApiSecurity('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('repertoire')
export class RepertoireController {
    constructor(private readonly repertoireService: RepertoireService) { }

    @Post()
    create(@CurrentUser() user: User, @Body() dto: CreateRepertoireDto) {
        return this.repertoireService.create(user, dto);
    }

    @Get()
    findAll(@CurrentUser() user: User) {
        return this.repertoireService.findAllByUser(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() user: User) {
        return this.repertoireService.findOne(id, user);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @CurrentUser() user: User,
        @Body() dto: CreateRepertoireDto,
    ) {
        return this.repertoireService.update(id, user, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: User) {
        return this.repertoireService.remove(id, user);
    }
}
