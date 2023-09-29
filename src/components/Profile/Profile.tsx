import { ChangeEvent, useState } from "react";
import { EditQuestion } from "../EditQuestion/EditQuestion";
import { ProfileQuestion, Profile as ProfileType } from "../../types/FormData";
import classes from "./style.module.css";
import { Checkbox } from "@mui/material";
import { CheckedSvg, UnCheckedSvg } from "../../assets/svg/checkedIcons";
import { CustomSwitch } from "../../utils/CustomSwitch";
import AddButtonSvg from "../../assets/svg/addButton";
import { AddQuestion } from "../AddQuestion/AddQuestion";

interface FormData {
  label: string;
  name: string;
  mandatory: boolean;
  show: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, child: string) => void;
}

const CustomForm = ({ label, mandatory, show, name, onChange }: FormData) => {
  return (
    <div className="grid grid-cols-4 pb-[25px] mb-[23px] border-b border-b-[#C4C4C4]">
      <h1 className={`${classes.header} col-span-2 !text-xl`}>{label}</h1>
      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={mandatory}
            name={name}
            onChange={(e) => onChange(e, "mandatory")}
            icon={<UnCheckedSvg />}
            checkedIcon={<CheckedSvg />}
          />
          <p className={classes.internal}>Mandatory</p>
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

export const Profile = ({
  profileData,
  onChange,
}: {
  profileData: ProfileType;
  onChange: (profile: ProfileType) => void;
}) => {
  const [openAddQues, setOpenAddQues] = useState<boolean>(false);

  const handleAddQuestion = (value: ProfileQuestion) => {
    const data = [...profileData.profileQuestions];
    data.push(value);

    onChange({ ...profileData, profileQuestions: data });
  };

  const handleOpenQuestion = () => {
    setOpenAddQues(!openAddQues);
  };

  const handleChnage = (e: ChangeEvent<HTMLInputElement>, child: string) => {
    const parent = e.target.name;
    const value = e.target.checked;

    const data = {
      ...profileData,
      [parent]: {
        ...profileData[parent as keyof typeof profileData],
        [child]: value,
      },
    };
    onChange(data);
  };

  const handleSave = (value: ProfileQuestion, idx: number) => {
    const data = profileData.profileQuestions.map((item, index) => {
      if (index === idx) {
        return value;
      }
      return item;
    });

    onChange({ ...profileData, profileQuestions: data });
  };

  const handleDelete = (idx: number) => {
    const data = profileData.profileQuestions.filter(
      (_, index) => index !== idx
    );

    onChange({ ...profileData, profileQuestions: data });
  };

  return (
    <div className={classes.layout}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>Profile</h1>
      </div>

      <div className="px-[30px] py-[38px]">
        <CustomForm
          label="Education"
          name="education"
          mandatory={profileData?.education?.mandatory}
          show={profileData?.education?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Experience"
          name="experience"
          mandatory={profileData?.experience?.mandatory}
          show={profileData?.experience?.show}
          onChange={handleChnage}
        />
        <CustomForm
          label="Resume"
          name="resume"
          mandatory={profileData?.resume?.mandatory}
          show={profileData?.resume?.show}
          onChange={handleChnage}
        />
        {profileData?.profileQuestions?.map((item, index) => (
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
          <div className="flex items-center gap-4 cursor-pointer"
            onClick={handleOpenQuestion}>
            <AddButtonSvg />
            <p className={`${classes.header} !text-xl`}>Add a question</p>
          </div>
        )}
      </div>
    </div>
  );
};
