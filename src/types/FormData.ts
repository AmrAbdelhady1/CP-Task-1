export interface FormData {
  data: {
    attributes: {
      coverImage: string;
      customisedQuestions: CustomisedQuestion[];
      personalInformation: PersonalInformation;
      profile: Profile;
    };
    id: string;
    type: string;
  };
}

export interface Profile {
  education: ProfileField;
  experience: ProfileField;
  profileQuestions: ProfileQuestion[];
  resume: ProfileField;
}

export interface ProfileField {
  mandatory: boolean;
  show: boolean;
}

export interface ProfileQuestion {
  type: string;
  question: string;
  other: boolean;
  disqualify: boolean;
  maxChoice: number;
  choices: string[];
  id?: string;
}

export interface PersonalInformation {
  currentResidence: InformationField;
  dateOfBirth: InformationField;
  emailId: InformationField;
  firstName: InformationField;
  gender: InformationField;
  idNumber: InformationField;
  lastName: InformationField;
  nationality: InformationField;
  personalQuestions: PersonalQuestion[];
  phoneNumber: InformationField;
}

export interface InformationField {
  internalUse: boolean;
  show: boolean;
}

export interface PersonalQuestion {
  type: string;
  question: string;
  other: boolean;
  disqualify: boolean;
  maxChoice: number;
  choices: string[];
  id?: string;
}

export interface CustomisedQuestion {
  type: string;
  question: string;
  disqualify: boolean;
  id?: string;
  other: boolean;
  choices: string[];
  maxChoice: number;
}
