import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RepertoireService } from './repertoire.service';

/** Public controller — no auth guard.
 *  Exposes GET /repertoire/public/:id for shared links. */
@Controller('repertoire/public')
export class RepertoirePublicController {
    constructor(private readonly repertoireService: RepertoireService) { }

    @Public()
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const repertoire = await this.repertoireService.findOnePublic(id);
        if (!repertoire) {
            throw new NotFoundException('Repertoire not found');
        }
        return repertoire;
    }
}
