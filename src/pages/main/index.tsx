import { useEffect, useState } from "react";
import axios from "axios";
import {
  PersonalInfo,
  UploadImage,
  Profile,
  AdditionalQuestions,
} from "../../components";
import {
  FormData,
  PersonalInformation,
  Profile as ProfileData,
  CustomisedQuestion,
} from "../../types/FormData";
import { Snackbar, Alert } from "@mui/material";

const Main = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [openFailure, setOpenFailure] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          // add the get request here
          "http://127.0.0.1:4010/api/162.46011937794728/programs/sunt/application-form"
        );
        if (response) {
          setOpenSuccess(true);
        }
      } catch (error) {
        setOpenFailure("please read the README file to run the project");
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        // add the put request here
        "http://127.0.0.1:4010/api/592.253203157558/programs/et/application-form",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setOpenSuccess(true);
      }
    } catch (error) {
      setOpenFailure("Please Add An Image");
    }
  };

  const handleChangePerson = (value: PersonalInformation) => {
    if (formData) {
      const updatedData = { ...formData };
      updatedData.data.attributes.personalInformation = value;
      setFormData(updatedData);
    }
  };

  const handleChangeProfile = (value: ProfileData) => {
    if (formData) {
      const updatedData = { ...formData };
      updatedData.data.attributes.profile = value;
      setFormData(updatedData);
    }
  };

  const handleChangeCusQues = (value: CustomisedQuestion[]) => {
    if (formData) {
      const updatedData = { ...formData };
      updatedData.data.attributes.customisedQuestions = value;
      setFormData(updatedData);
    }
  };

  const handleChangeImage = (value: string) => {
    if (formData) {
      const updatedData = { ...formData };
      updatedData.data.attributes.coverImage = value;
      setFormData(updatedData);
    }
  };

  return (
    <div className="px-10 py-[100px] flex flex-col gap-[65px] w-full">
      {formData && (
        <div className="flex items-start w-full justify-between">
          <UploadImage
            imageUrl={formData?.data.attributes.coverImage}
            onChange={handleChangeImage}
          />
          <button
            className="bg-[#087B2F] rounded-xl text-[#F4FBF7] font-semibold text-lg px-10 py-5"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      )}
      {formData && (
        <PersonalInfo
          personalData={formData?.data?.attributes?.personalInformation}
          onChange={handleChangePerson}
        />
      )}
      {formData && (
        <Profile
          profileData={formData?.data?.attributes?.profile}
          onChange={handleChangeProfile}
        />
      )}
      {formData && (
        <AdditionalQuestions
          customisedQuestions={formData?.data?.attributes?.customisedQuestions}
          onChange={handleChangeCusQues}
        />
      )}

      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFailure !== ""}
        autoHideDuration={2000}
        onClose={() => setOpenFailure("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenFailure("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {openFailure}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Main;
