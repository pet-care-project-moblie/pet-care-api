import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { PetService } from '../pet.service';
import { IPet } from '../pet.interface';

@Injectable()
export class GetByAiIdPetUsecase {
  constructor(
    private readonly petService: PetService,
    readonly configService: ConfigService,
  ) {}

  public async execute(id: string): Promise<IPet> {
    try {
      const pet = await this.petService.getPetByAiId(id);

      if (!pet) {
        throw new HttpException('ไม่พบข้อมูล', 404);
      }

      return pet;
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
