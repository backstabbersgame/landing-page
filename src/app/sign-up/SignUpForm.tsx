import React from 'react';
import StepOne from 'src/components/StepOneForm/StepOneForm';
import StepTwo from 'src/components/StepTwoForm/StepTwoForm';

interface SignUpFormProps {
  handleNext: () => void;
  handleData: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  className: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleNext, handleData, step, className }) => {
	return (
    <div className={className}>
      {step === 1 && <StepOne handleNext={handleNext} />}
      {step === 2 && <StepTwo handleData={handleData}/>}
    </div>
  );
};

export default SignUpForm;
