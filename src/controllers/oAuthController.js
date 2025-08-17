const axios = require("axios");

const googleAuth = async (req, res, next) => {
  try {
    const { code, redirectUri } = req.body;

    const tokenRes = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }
    );

    const userinfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenRes.data.access_token}`
      }
    });
    
    res.status(201).json({ message: tokenRes.data, user: userinfo.data });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { googleAuth };