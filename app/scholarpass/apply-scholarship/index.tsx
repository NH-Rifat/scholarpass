import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { FormHeader } from "./_components/FormHeader";
import { ProgressStepper } from "./_components/ProgressStepper";
import { ApplicationEssayStep } from "./_components/steps/ApplicationEssayStep";
import { CourseSelectionStep } from "./_components/steps/CourseSelectionStep";
import { FinancialInformationStep } from "./_components/steps/FinancialInformationStep";
import { GuardianInformationStep } from "./_components/steps/GuardianInformationStep";
import { StudentInformationStep } from "./_components/steps/StudentInformationStep";
import { stepTitles } from "./utils/data";
import { initialFormData } from "./utils/intiitalValues";
import { ApplicationFormData } from "./utils/types";
import {
  applicationEssaySchema,
  completeFormSchema,
  courseSelectionSchema,
  financialInformationSchema,
  guardianInformationSchema,
  studentInformationSchema,
} from "./utils/validation";

export default function ApplyScholarship() {
  const [currentStep, setCurrentStep] = useState(1);

  // Initialize React Hook Form with Zod validation
  const methods = useForm<ApplicationFormData>({
    resolver: zodResolver(completeFormSchema),
    defaultValues: initialFormData,
    mode: "onChange", // Validate on change for better UX
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = methods;

  // Get current form data to pass to progress stepper
  const formData = watch();

  const nextStep = async () => {
    // Get the current step schema for validation
    const stepSchemas = {
      1: studentInformationSchema,
      2: guardianInformationSchema,
      3: financialInformationSchema,
      4: courseSelectionSchema,
      5: applicationEssaySchema,
    };

    const currentSchema = stepSchemas[currentStep as keyof typeof stepSchemas];

    if (currentSchema) {
      // Validate current step
      const stepFields = Object.keys(currentSchema.shape);
      const isValid = await trigger(stepFields as any);

      if (isValid && currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle final form submission here
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StudentInformationStep nextStep={nextStep} prevStep={prevStep} />
        );
      case 2:
        return (
          <GuardianInformationStep nextStep={nextStep} prevStep={prevStep} />
        );
      case 3:
        return (
          <FinancialInformationStep nextStep={nextStep} prevStep={prevStep} />
        );
      case 4:
        return <CourseSelectionStep nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return (
          <ApplicationEssayStep
            nextStep={nextStep}
            prevStep={prevStep}
            isLastStep={true}
            onSubmit={handleSubmit(onSubmit)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {currentStep === 1 && <FormHeader />}

        <ProgressStepper
          currentStep={currentStep}
          totalSteps={5}
          stepTitles={stepTitles}
        />

        <View style={styles.content}>{renderCurrentStep()}</View>
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flex: 1,
  },
});
