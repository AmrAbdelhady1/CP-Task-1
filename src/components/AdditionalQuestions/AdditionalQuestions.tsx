import { CustomisedQuestion } from "../../types/FormData";
import classes from "./style.module.css";
import AddButtonSvg from "../../assets/svg/addButton";
import { EditQuestion } from "../EditQuestion/EditQuestion";
import { useState } from "react";
import { AddQuestion } from "../AddQuestion/AddQuestion";

export const AdditionalQuestions = ({
  customisedQuestions,
  onChange,
}: {
  customisedQuestions: CustomisedQuestion[];
  onChange: (customisedQuestions: CustomisedQuestion[]) => void;
}) => {
  const [openAddQues, setOpenAddQues] = useState<boolean>(false);

  const handleSave = (value: CustomisedQuestion, idx: number) => {
    const data = customisedQuestions.map((item, index) => {
      if (idx === index) {
        return value;
      }
      return item;
    });

    onChange(data);
  };

  const handleDelete = (idx: number) => {
    const data = customisedQuestions.filter((_, index) => index !== idx);

    onChange(data);
  };

  const handleAddQuestion = (value: CustomisedQuestion) => {
    const data = [...customisedQuestions];
    data.push(value);

    onChange(data);
  };

  const handleOpenQuestion = () => {
    setOpenAddQues(!openAddQues);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>Additional questions</h1>
      </div>

      <div className="px-[30px] py-[38px]">
        {customisedQuestions?.map((item, index) => (
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
