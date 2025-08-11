// Authentication GraphQL Schemas

export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        displayName
        email
        roles
        verified
      }
    }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      user {
        id
        displayName
        email
        roles
        verified
      }
    }
  }
`;

export const GET_PROFILE_QUERY = `
  query GetProfile {
    me {
      id
      displayName
      email
      roles
      verified
    }
  }
`;

export const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

export const CHANGE_PASSWORD_MUTATION = `
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

export const CHANGE_PASSWORD_WITH_TOKEN_MUTATION = `
  mutation ChangePasswordWithToken($token: String!, $newPassword: String!) {
    changePasswordWithToken(token: $token, newPassword: $newPassword)
  }
`;

export const VERIFY_EMAIL_MUTATION = `
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;
