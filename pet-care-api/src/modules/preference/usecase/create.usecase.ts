import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PreferenceService } from '../preference.service';
import { PreferenceCreateDto } from '../dto/preference-create.dto';
import { Types } from 'mongoose';
import { HttpRespons } from 'src/interface/respones';

@Injectable()
export class PreferenceCreateUsecase {
  constructor(
    private readonly preferenceService: PreferenceService,
    readonly configService: ConfigService,
  ) {}

  public async execute(
    data: PreferenceCreateDto & { id: Types.ObjectId },
  ): Promise<HttpRespons> {
    try {
      const preference = await this.preferenceService.createPreference({
        _profileId: data.id,
        species: data.species,
        size: data.size,
        isSpayedOrNeutered: data.isSpayedOrNeutered,
        breed: data.breed,
        generalHealth: data.generalHealth,
        tags: data.tags,
        gender: data.gender,
        vaccinationHistory: data.vaccinationHistory,
        minBirthdayAt: data.minBirthdayAt,
        maxBirthdayAt: data.maxBirthdayAt,
      });

      if (!preference) {
        throw new HttpException('ไม่สามารถสร้างความสนใจได้', 500);
      }

      return {
        message: 'สร้างสัตว์ความสนใจสำเร็จ',
      };
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
