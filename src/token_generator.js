const twilio = require('twilio');

const AccessToken = twilio.jwt.AccessToken;
const IpMessagingGrant = AccessToken.IpMessagingGrant;

function TokenGenerator(identity, deviceId) {
  const appName = 'TwilioChat';
  const endpointId = appName + ':' + identity + ':' + deviceId;
  const ipmGrant = new IpMessagingGrant({
    serviceSid: process.env.TWILIO_IPM_SERVICE_SID,
    endpointId: endpointId,
  });
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
    process.env.TWILIO_API_SECRET
  );
  token.addGrant(ipmGrant);
  token.identity = identity;

  return token;
}

module.exports = { generate: TokenGenerator };
