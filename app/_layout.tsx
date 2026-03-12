import React from "react";
import { AppProvider } from "../src/context/AppContext";
import { ErrorProvider } from "../src/context/ErrorContext";
import { LoadingProvider } from "../src/context/LoadingContext";

import ErrorBanner from "../src/components/ErrorBanner";
import LoadingOverlay from "../src/components/LoadingOverlay";

import RootNavigator from "../src/navigation/RootNavigator";


export default function Layout() {
  return (
    <ErrorProvider>
      <LoadingProvider>
        <AppProvider>
          <ErrorBanner />
          <LoadingOverlay />
          <RootNavigator />
        </AppProvider>
      </LoadingProvider>
    </ErrorProvider>
  );
}

