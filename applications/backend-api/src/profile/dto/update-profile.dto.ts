import {
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsEnum,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { ActivityLevel, Goal, DietaryPreference } from '@prisma/client';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(30)
  @Max(300)
  height?: number; // in cm

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(2)
  @Max(500)
  weight?: number; // in kg

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsEnum(ActivityLevel, { message: 'Invalid Activity Level' })
  activityLevel?: ActivityLevel;

  @IsOptional()
  @IsEnum(Goal, { message: 'Invalid Goal' })
  goal?: Goal;

  @IsOptional()
  @IsEnum(DietaryPreference, { message: 'Invalid Dietary Preference' })
  dietaryPreference?: DietaryPreference;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dislikes?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  budget?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  cookingTime?: number;
}
