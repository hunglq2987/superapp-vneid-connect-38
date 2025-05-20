
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VNeIDConfirmation from "./components/VNeIDConfirmation";
import RegistrationFlow from "./components/RegistrationFlow";
import BiometricAuth from "./components/BiometricAuth";
import NfcVerification from "./components/NfcVerification";
import DetailedRegistration from "./components/DetailedRegistration";
import TermsAndConditions from "./components/TermsAndConditions";
import RegistrationComplete from "./components/RegistrationComplete";
import ProfileManagement from "./components/ProfileManagement";
import OtpVerification from "./components/OtpVerification";
import PhoneSelection from "./components/PhoneSelection";
import NoPhoneFound from "./components/NoPhoneFound";
import Support from "./components/Support";
import UserGuide from "./components/UserGuide";
import Faq from "./components/Faq";
import RegistrationDetailsPage from "./components/profile/RegistrationDetailsPage";
import VerificationOptions from "./components/VerificationOptions";
import VerificationFailure from "./components/VerificationFailure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registration" element={<RegistrationFlow />} />
          <Route path="/vneid-confirmation" element={<VNeIDConfirmation />} />
          <Route path="/biometric-auth" element={<BiometricAuth />} />
          <Route path="/nfc-verification" element={<NfcVerification />} />
          <Route path="/detailed-registration" element={<DetailedRegistration />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/registration-complete" element={<RegistrationComplete />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/registration-details" element={<RegistrationDetailsPage />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/phone-selection" element={<PhoneSelection />} />
          <Route path="/no-phone-found" element={<NoPhoneFound />} />
          <Route path="/support" element={<Support />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/verification-options" element={<VerificationOptions />} />
          <Route path="/verification-failure" element={<VerificationFailure />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
