import { VStack } from '@/shared/ui/Stack';

import { SignInForm } from '../SignInForm/SignInForm';

import './SignInPage.css';

export const SignInPage = () => {
  return (
    <VStack className="signin-page__form__wrap">
      <SignInForm />
    </VStack>
  );
};
