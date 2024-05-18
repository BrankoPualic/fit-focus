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
  gender: string;
  experienceLevel: string;
  fitnessGoals: string[];
  preferredWorkoutType: string;
  injured: boolean;
  registered: string;
}

export interface IUserBodyweightDto {
  date: string;
  bodyweight: number;
  bodyfat: number | null;
}

export interface ILiftRecordDto {
  date: string;
  weight: number;
}

export interface ILiftDataDto {
  benchPress: ILiftRecordDto[];
  squat: ILiftRecordDto[];
  deadlift: ILiftRecordDto[];
  ohp: ILiftRecordDto[];
}

export interface IWorkoutDto {
  name: string;
  date: string;
  exercises: IExerciseDto[];
}

export interface IExerciseDto {
  name: string;
  sets: ISetDto[];
}

export interface ISetDto {
  weight: number | null;
  repetitions: number;
  notes?: string;
}

export interface IEditSetDto {
  name: string;
  date: string;
  set: ISetDto;
  exerciseIndex: number;
  setIndex: number;
}
