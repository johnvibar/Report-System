const config = {
    // Uses the PORT variable declared here, the path is defined in code
    port: 3000,
    redirectUri: 'http://localhost:3000/airtable-oauth',
    clientId: '6195b9e4-3576-4a34-8268-ce2ee4cf9222',
    // If you're not using a client secret, set to the empty string: ""
    clientSecret: 'fd45e0554b5a9b726085d685f6944c02a38839a864d68bf4941bc61ae7781ed4',
    airtableUrl: 'https://www.airtable.com',
    // space delimited list of Airtable scopes, update to the list of scopes you want for your integration
    scope: 'data.records:read data.records:write',
};
module.exports = config;