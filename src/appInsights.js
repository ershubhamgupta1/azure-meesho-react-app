import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: '537dc1a1-6414-442f-b42b-de39545b83c8'
  }
});

appInsights.loadAppInsights();
appInsights.trackPageView(); // To capture initial page view


