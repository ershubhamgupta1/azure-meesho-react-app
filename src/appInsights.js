import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.REACT_APP_APPINSIGHTS_INSTRUMENTATIONKEY
  }
});

appInsights.loadAppInsights();
appInsights.trackPageView(); // To capture initial page view


