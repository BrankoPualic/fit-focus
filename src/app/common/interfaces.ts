import { EExperienceLevel, EGender, EWorkoutType } from './enums';

export interface IUserSigninDto {
  emailAddress: string;
  password: string;
}

export interface IUserDto {
  firstName: string;
  lastName: string;
  displayName: string;
  country: string;
  city: string;
  age: number;
  imageUrl: string;
  description: string;
  gender: EGender;
  experienceLevel: EExperienceLevel;
  fitnessGoals: string[];
  preferredWorkoutType: EWorkoutType;
  injured: boolean;
  registered: string;
}

export interface IUserBodyweightDto {
  date: string;
  bodyweight: number;
  bodyfat: number | null;
}
