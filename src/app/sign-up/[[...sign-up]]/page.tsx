import { SignUp } from '@clerk/nextjs';
import '@/styles/auth.css';

export default function Page() {
  return (
    <div className="auth-container">
      <SignUp
        appearance={{
          variables: {
            borderRadius: '8px',
            fontFamily: 'var(--font-quicksand), sans-serif',
            colorBackground: '#1a1a1a',
            colorPrimary: '#5800ca',
            colorText: 'white',
            colorTextSecondary: '#cccccc',
            colorDanger: '#ff4444',
            colorInputBackground: '#333',
            colorInputText: 'white',
            colorSuccess: '#5800ca',
          },
          elements: {
            rootBox: 'cl-rootBox',
            card: 'cl-card',
            headerTitle: 'cl-headerTitle',
            headerSubtitle: 'cl-headerSubtitle',
            formButtonPrimary: 'cl-formButtonPrimary',
            formFieldInput: 'cl-formFieldInput',
            formFieldLabel: 'cl-formFieldLabel',
            footer: 'cl-footer',
            footerAction: 'cl-footerAction',
            socialButtonsBlockButton: 'cl-socialButton',
            socialButtonsBlockButtonText: 'cl-socialButtonText',
            dividerLine: 'cl-divider',
            dividerText: 'cl-dividerText',
            formFieldInputShowPasswordButton: 'cl-showPasswordButton',
            formFieldInputShowPasswordIcon: 'cl-showPasswordIcon',
          },
        }}
      />
    </div>
  );
}
