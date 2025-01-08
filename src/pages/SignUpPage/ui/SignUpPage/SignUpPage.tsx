import { VStack } from '@/shared/ui/Stack';

import { SignUpForm } from '../SignUpForm/SignUpForm';

import './SignUpPage.css';

export const SignUpPage = () => {
  return (
    <VStack className="signup-page__form__wrap">
      <SignUpForm />
    </VStack>
  );
};
