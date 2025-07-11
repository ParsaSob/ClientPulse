# **App Name**: ClientPulse

## Core Features:

- Credential Configuration: Securely collect Trainerize credentials (API key, domain, email, password) via configuration panel and store encrypted credentials. All credential data is handled with security in mind, by way of Firebase Secret Manager.
- Data Retrieval: Retrieve client data from the Trainerize API or scrape using Puppeteer, based on provided credentials. Note that access to external trainerize domains require that any applicable CORS settings on trainerize are turned off, as it will not be under the applicant's control.
- Client Data Table: Display client data in a sortable and filterable table (Client ID, Age, Date of Birth, Height, Added On, Last Signed In, Workouts Completed, Cardio Activities, Nutrition Compliance, Exercise Compliance).
- Risk Prediction: Use Gemini AI tool to predict client dropout risk ('dropout' or 'committed') based on activity and compliance data.  Highlight Risk Status in red/green.
- Personalized Insights: Generate personalized motivational insights and analysis tool via Gemini AI, based on client data, in order to inform appropriate decisions.
- Risk and Insight Table: Display risk status and insights in a dedicated table, making it clear, so trends can be seen in the data, with columns for Client ID, Risk Status, and Insight.
- Data Refresh: Implement a 'Refresh Data' button to manually trigger data re-fetching and analysis. It will take 3-4 minutes each time refresh is hit.

## Style Guidelines:

- Primary color: Vibrant blue (#29ABE2) to represent trust, clarity, and forward movement.
- Background color: Light blue (#E0F7FA), a very light tint of the primary.
- Accent color: Green (#90EE90), which is analogous to blue and symbolizes progress, complementary to the dropout status of the primary color.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern look.
- Code font: 'Source Code Pro' for displaying configuration details or any code snippets.
- Use simple, clean icons from a library like Material Design Icons to represent data points and actions.
- Utilize a responsive, single-page layout with a clear division between the configuration panel and data tables. Tables are vertically stacked for mobile-friendliness.