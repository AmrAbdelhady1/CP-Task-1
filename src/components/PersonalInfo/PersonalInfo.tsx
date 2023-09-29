import { ChangeEvent, useState } from "react";
import { EditQuestion } from "../EditQuestion/EditQuestion";
import { PersonalInformation, PersonalQuestion } from "../../types/FormData";
import classes from "./style.module.css";
import { Checkbox } from "@mui/material";
import { CheckedSvg, UnCheckedSvg } from "../../assets/svg/checkedIcons";
import { CustomSwitch } from "../../utils/CustomSwitch";
import AddButtonSvg from "../../assets/svg/addButton";
import { AddQuestion } from "../AddQuestion/AddQuestion";

interface FormData {
  label: string;
  name: string;
  internalUse: boolean;
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, child: string) => void;
}

const CustomForm = ({ label, internalUse, show, name, onChange }: FormData) => {
  return (
    <div className="grid grid-cols-4 pb-[25px] mb-[23px] border-b border-b-[#C4C4C4]">
      <h1 className={`${classes.header} col-span-2 !text-xl`}>{label}</h1>
      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={internalUse}
            name={name}
            onChange={(e) => onChange(e, "internalUse")}
            icon={<UnCheckedSvg />}
            checkedIcon={<CheckedSvg />}
          />
          <p className={classes.internal}>Internal</p>
        </div>
        <div className="flex items-center gap-3">
          <CustomSwitch
            name={name}
            checked={show}
            onChange={(e) => onChange(e, "show")}
          />
          <p className={classes.hide}>Hide</p>
        </div>
      </div>
    </div>
  );
};

export const PersonalInfo = ({
  personalData,
  onChange,
}: {
  personalData: PersonalInformation;
  onChange: (personalData: PersonalInformation) => void;
}) => {
  const [openAddQues, setOpenAddQues] = useState<boolean>(false);
  const handleAddQuestion = (value: PersonalQuestion) => {
    const data = [...personalData.personalQuestions];
    data.push(value);

    onChange({ ...personalData, personalQuestions: data });
  };

  const handleOpenQuestion = () => {
    setOpenAddQues(!openAddQues);
  };

  const handleChnage = (e: ChangeEvent<HTMLInputElement>, child: string) => {
    const parent = e.target.name;
    const value = e.target.checked;

    const data = {
      ...personalData,
      [parent]: {
        ...personalData[parent as keyof typeof personalData],
        [child]: value,
      },
    };
    onChange(data);
  };

  const handleSave = (value: PersonalQuestion, idx: number) => {
    const data = personalData.personalQuestions.map((item, index) => {
      if (index === idx) {
        return value;
      }
      return item;
    });

    onChange({ ...personalData, personalQuestions: data });
  };

  const handleDelete = (idx: number) => {
    const data = personalData.personalQuestions.filter(
      (_, index) => idx !== index
    );

    onChange({ ...personalData, personalQuestions: data });
  };

  return (
    <div className={classes.layout}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>Personal Information</h1>
      </div>

      <div className="px-[30px] py-[38px]">
        <CustomForm
          label="First Name"
          name="firstName"
          internalUse={personalData?.firstName?.internalUse}
          show={personalData?.firstName?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Last Name"
          name="lastName"
          internalUse={personalData?.lastName?.internalUse}
          show={personalData?.lastName?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Email"
          name="emailId"
          internalUse={personalData?.emailId?.internalUse}
          show={personalData?.emailId?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Phone"
          name="phoneNumber"
          internalUse={personalData?.phoneNumber?.internalUse}
          show={personalData?.phoneNumber?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Nationality"
          name="nationality"
          internalUse={personalData?.nationality?.internalUse}
          show={personalData?.nationality?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Current Residence"
          name="currentResidence"
          internalUse={personalData?.currentResidence?.internalUse}
          show={personalData?.currentResidence?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="ID Number"
          name="idNumber"
          internalUse={personalData?.idNumber?.internalUse}
          show={personalData?.idNumber?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Date of Birth"
          name="dateOfBirth"
          internalUse={personalData?.dateOfBirth?.internalUse}
          show={personalData?.dateOfBirth?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Gender"
          name="gender"
          internalUse={personalData?.gender?.internalUse}
          show={personalData?.gender?.show}
          onChange={handleChnage}
        />
        {personalData?.personalQuestions?.map((item, index) => (
          <div key={index}>
            <EditQuestion
              question={item}
              onSave={(value) => handleSave(value, index)}
              onDelete={() => handleDelete(index)}
            />
          </div>
        ))}
        {openAddQues ? (
          <AddQuestion
            onClose={handleOpenQuestion}
            onSave={handleAddQuestion}
          />
        ) : (
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={handleOpenQuestion}
          >
            <AddButtonSvg />
            <p className={`${classes.header} !text-xl`}>Add a question</p>
          </div>
        )}
      </div>
    </div>
  );
};
