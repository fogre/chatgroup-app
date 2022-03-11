# Chatgroup app
A group chat web app built with Next.js and AWS Amplify CLI.

[**Production Demo**](https://main.d2ky15by9x4y7q.amplifyapp.com/)


## The challenge
Based on the devChallenge's chat group challenge. You can read the user stories and see the Figma design [here.](https://devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0)

**Additional user stories:**
- Some channels are public and some members only
- Unauthenticated users can only read public channels
- Authenticated users can send messages and create new members only chat groups

## Install?
As this project is based on private Amplify environment, the project cannot be installed just by cloning the repository. You'd have to create and AWS account, install Amplify-CLI and set up your own Amplify project.

This project uses:
- Cognito User Pool for authenticated API access.
- I_AM for unautenticated API access
- GraphQL API Gateway for DynamoDB
- S3 storage

## Links
- [Demo](https://main.d2ky15by9x4y7q.amplifyapp.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Next.js](https://nextjs.org/)
- [devChallenges](https://devchallenges.io/)

## License

[MIT](https://joinup.ec.europa.eu/licence/mit-license)