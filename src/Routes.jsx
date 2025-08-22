import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WellnessDashboard from './pages/wellness-dashboard';
import ChatInterface from './pages/chat-interface';
import ResourceLibrary from './pages/resource-library';
import CommunityGarden from './pages/community-garden';
import ProfessionalConnect from './pages/professional-connect';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ChatInterface />} />
        <Route path="/wellness-dashboard" element={<WellnessDashboard />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/community-garden" element={<CommunityGarden />} />
        <Route path="/professional-connect" element={<ProfessionalConnect />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
